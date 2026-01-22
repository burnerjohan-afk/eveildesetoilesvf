import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasModuleAccess } from "@/lib/access";
import { Card } from "@/components/ui/Card";

export default async function ChronoManagerPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const hasAccess = await hasModuleAccess(user.structureId, "CHRONO_MANAGER");
  if (!hasAccess) {
    redirect("/portail");
  }

  const documents = await prisma.document.findMany({
    where: {
      structureId: user.structureId,
      moduleKey: "CHRONO_MANAGER",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Chrono-Manager EAJE</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Planner direction</h2>
          <p className="text-text-light">
            Outils de planification et de gestion pour la direction de votre structure.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Tableaux des obligations</h2>
          <p className="text-text-light">
            Référentiels et tableaux récapitulatifs des obligations réglementaires et administratives.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Routines</h2>
          <p className="text-text-light">
            Guides et procédures pour les routines quotidiennes et hebdomadaires.
          </p>
        </Card>

        {documents.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Téléchargements</h2>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border border-border rounded"
                >
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-text-light">
                      {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <a
                    href={`/api/files/${doc.fileKey}`}
                    target="_blank"
                    className="text-primary hover:underline text-sm"
                  >
                    Télécharger
                  </a>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
