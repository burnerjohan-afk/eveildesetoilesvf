import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { structure: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Mettre Ã  jour lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await createSession(user.id, user.role as "ADMIN" | "CLIENT", user.structureId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.issues) {
      return NextResponse.json(
        { error: "DonnÃ©es invalides", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Erreur de connexion" },
      { status: 500 }
    );
  }
}
