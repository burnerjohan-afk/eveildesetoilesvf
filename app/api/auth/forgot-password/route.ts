import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resetPasswordRequestSchema } from "@/lib/validators";
import { randomBytes } from "crypto";
import { config } from "@/lib/config";

// En DEV: on log en console. En PROD: on enverrait un email via Resend
async function sendResetEmail(email: string, resetToken: string) {
  const resetUrl = `${config.app.url}/reset-password?token=${resetToken}`;
  
  if (process.env.NODE_ENV === "development") {
    console.log("=== EMAIL RESET PASSWORD (DEV) ===");
    console.log(`To: ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("================================");
    return;
  }

  // PROD: Utiliser Resend
  if (config.email.resendApiKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(config.email.resendApiKey);
    
    await resend.emails.send({
      from: config.email.from,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p><a href="${resetUrl}">Cliquez ici pour réinitialiser votre mot de passe</a></p>
        <p>Ce lien est valide pendant 1 heure.</p>
        <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
      `,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = resetPasswordRequestSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Ne pas révéler si l'email existe ou non (sécurité)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Générer un token de réinitialisation
    const resetToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    // Stocker le token (on pourrait utiliser une table ResetToken, mais pour simplifier on utilise un champ temporaire)
    // Pour l'instant, on log juste en DEV
    await sendResetEmail(email, resetToken);

    // TODO: Stocker resetToken et expiresAt en DB (table ResetToken ou champ User)
    // Pour MVP, on utilise juste le token dans l'URL et on vérifie côté serveur

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.issues) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Erreur lors de la demande" },
      { status: 500 }
    );
  }
}
