import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasModuleAccess } from "@/lib/access";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function PackControlePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const hasAccess = await hasModuleAccess(user.structureId, "PACK_CONTROLE");
  if (!hasAccess) {
    redirect("/portail");
  }

  const documents = await prisma.document.findMany({
    where: {
      structureId: user.structureId,
      moduleKey: "PACK_CONTROLE",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Pack Contrôle EAJE</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Mode d'emploi</h2>
          <p className="text-text-light mb-4">
            Le Pack Contrôle EAJE vous permet de sécuriser votre structure sur le plan réglementaire.
            Il comprend tous les dossiers nécessaires, des check-lists et des outils pratiques.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Sommaire officiel</h2>
          <ul className="list-disc list-inside space-y-2 text-text-light">
            <li>Dossiers réglementaires</li>
            <li>Check-lists de conformité</li>
            <li>Modèles de documents</li>
            <li>Guide d'utilisation</li>
          </ul>
        </Card>

        {documents.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Documents disponibles</h2>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border border-border rounded"
                >
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-text-light">
                      {doc.category} • {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <Link href={`/api/files/${doc.fileKey}`} target="_blank">
                    <span className="text-primary hover:underline text-sm">Télécharger</span>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
