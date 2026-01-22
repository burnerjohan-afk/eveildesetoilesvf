import { getSession } from "./auth";
import { prisma } from "./db";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Non authentifié");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw new Error("Accès refusé : droits administrateur requis");
  }
  return session;
}

export async function requireClient() {
  const session = await requireAuth();
  if (session.role !== "CLIENT") {
    throw new Error("Accès refusé : espace client uniquement");
  }
  if (!session.structureId) {
    throw new Error("Aucune structure associée");
  }
  return session;
}

export async function requireStructureAccess(structureId: string) {
  const session = await requireAuth();
  
  // Admin peut accéder à toutes les structures
  if (session.role === "ADMIN") {
    return session;
  }
  
  // Client ne peut accéder qu'à sa propre structure
  if (session.role === "CLIENT" && session.structureId === structureId) {
    return session;
  }
  
  throw new Error("Accès refusé : structure non autorisée");
}

export async function hasModuleAccess(structureId: string, moduleKey: string) {
  const access = await prisma.moduleAccess.findUnique({
    where: {
      structureId_moduleKey: {
        structureId,
        moduleKey: moduleKey as any,
      },
    },
  });
  
  return access?.isEnabled ?? false;
}
