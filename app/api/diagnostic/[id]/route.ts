import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const submission = await prisma.diagnosticSubmission.findUnique({
      where: { id },
      include: {
        lead: true,
      },
    });

    if (!submission) {
      return NextResponse.json({ error: "Diagnostic non trouvé" }, { status: 404 });
    }

    // Parser les champs JSON depuis les strings
    const scores = JSON.parse(submission.scores) as { securisation: number; structuration: number; pilotage: number };
    const recommendation = JSON.parse(submission.recommendation);
    const meta = JSON.parse(submission.meta);
    
    return NextResponse.json({
      id: submission.id,
      scores: scores,
      axes: {
        primary: submission.primaryAxis,
        secondary: submission.secondaryAxis,
        tertiary: submission.tertiaryAxis,
      },
      recommendation: recommendation,
      meta: meta,
      createdAt: submission.createdAt,
      lead: submission.lead
        ? {
            structureName: submission.lead.structureName,
            contactName: submission.lead.contactName,
            email: submission.lead.email,
            phone: submission.lead.phone,
          }
        : null,
    });
  } catch (error: any) {
    console.error("Erreur lors de la récupération du diagnostic:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
