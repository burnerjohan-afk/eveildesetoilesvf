import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { diagnosticLeadSchema } from "@/lib/validators";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = diagnosticLeadSchema.parse(body);

    // Vérifier que la submission existe
    const submission = await prisma.diagnosticSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json({ error: "Diagnostic non trouvé" }, { status: 404 });
    }

    // Créer ou mettre à jour le lead
    const lead = await prisma.lead.upsert({
      where: { email: validated.email },
      update: {
        structureName: validated.structureName,
        contactName: validated.contactName || null,
        phone: validated.phone || null,
        source: "diagnostic",
        updatedAt: new Date(),
      },
      create: {
        structureName: validated.structureName,
        contactName: validated.contactName || null,
        email: validated.email,
        phone: validated.phone || null,
        source: "diagnostic",
        status: "NEW",
      },
    });

    // Lier le lead à la submission si pas déjà lié
    if (!submission.leadId) {
      await prisma.diagnosticSubmission.update({
        where: { id },
        data: { leadId: lead.id },
      });
    }

    // En DEV : log pour vérification
    if (process.env.NODE_ENV === "development") {
      console.log("Lead associé au diagnostic:", {
        submissionId: id,
        leadId: lead.id,
        email: validated.email,
      });
    }

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: "Vos informations ont été enregistrées avec succès",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'association du lead:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'enregistrement" },
      { status: 400 }
    );
  }
}
