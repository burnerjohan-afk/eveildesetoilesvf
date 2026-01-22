import { NextResponse } from "next/server";
import { requireClient } from "@/lib/access";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await requireClient();
    const assessments = await prisma.qualityAssessment.findMany({
      where: { structureId: session.structureId! },
      orderBy: { createdAt: "desc" },
    });

    // Parser les champs JSON depuis les strings
    const parsedAssessments = assessments.map((assessment) => ({
      ...assessment,
      answers: JSON.parse(assessment.answers),
      results: JSON.parse(assessment.results),
      actionPlan: assessment.actionPlan ? JSON.parse(assessment.actionPlan) : null,
    }));

    return NextResponse.json({ assessments: parsedAssessments });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
