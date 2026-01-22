import { NextRequest, NextResponse } from "next/server";
import { requireClient } from "@/lib/access";
import { prisma } from "@/lib/db";
import { qualityAssessmentSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const session = await requireClient();
    const body = await request.json();
    const { answers } = qualityAssessmentSchema.parse({
      structureId: session.structureId!,
      answers: body.answers,
    });

    // Calculer le score moyen
    const values = Object.values(answers).filter((v) => typeof v === "number") as number[];
    const scoreLevel = values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 1;

    // Générer des résultats simplifiés
    const results = {
      score: scoreLevel,
      totalQuestions: values.length,
      average: scoreLevel,
    };

    // Créer l'évaluation (stringifier les objets JSON pour SQLite)
    await prisma.qualityAssessment.create({
      data: {
        structureId: session.structureId!,
        scoreLevel,
        answers: JSON.stringify(answers),
        results: JSON.stringify(results),
        actionPlan: null,
      },
    });

    return NextResponse.json({ success: true, scoreLevel });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'enregistrement" },
      { status: 500 }
    );
  }
}
