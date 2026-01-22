import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validators";
import { config } from "@/lib/config";

// En DEV: on log en console. En PROD: on enverrait un email via Resend
async function sendContactEmail(data: any) {
  if (process.env.NODE_ENV === "development") {
    console.log("=== EMAIL CONTACT (DEV) ===");
    console.log("Structure:", data.structureName);
    console.log("Nom:", data.name);
    console.log("Email:", data.email);
    console.log("Téléphone:", data.phone);
    console.log("Objet:", data.subject);
    console.log("Message:", data.message);
    console.log("Offre:", data.offerKey);
    console.log("==========================");
    return;
  }

  // PROD: Utiliser Resend
  if (config.email.resendApiKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(config.email.resendApiKey);
    
    await resend.emails.send({
      from: config.email.from,
      to: config.email.from,
      replyTo: data.email,
      subject: `Contact: ${data.subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Structure:</strong> ${data.structureName}</p>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Objet:</strong> ${data.subject}</p>
        ${data.offerKey ? `<p><strong>Offre pressentie:</strong> ${data.offerKey}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Enregistrer en DB
    await prisma.lead.create({
      data: {
        structureName: validated.structureName,
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        subject: validated.subject,
        message: validated.message,
        offerKey: validated.offerKey || null,
      },
    });

    // Envoyer email (DEV: console, PROD: Resend)
    await sendContactEmail(validated);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.issues) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
