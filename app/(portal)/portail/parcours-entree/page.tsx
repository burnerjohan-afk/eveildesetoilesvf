import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasModuleAccess } from "@/lib/access";
import { Card } from "@/components/ui/Card";

export default async function ParcoursEntreePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const hasAccess = await hasModuleAccess(user.structureId, "PARCOURS_ENTREE");
  if (!hasAccess) {
    redirect("/portail");
  }

  const documents = await prisma.document.findMany({
    where: {
      structureId: user.structureId,
      moduleKey: "PARCOURS_ENTREE",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Parcours Entrée Enfant & Famille</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Vue globale</h2>
          <p className="text-text-light">
            Le parcours d'entrée permet d'accompagner les familles et les enfants dans leur intégration
            au sein de votre structure, de manière structurée et bienveillante.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-bold mb-3">Avant l'entrée</h3>
            <p className="text-text-light text-sm">
              Préparation, rendez-vous de familiarisation, documents nécessaires.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mb-3">Pendant l'entrée</h3>
            <p className="text-text-light text-sm">
              Accueil progressif, adaptation, suivi quotidien.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mb-3">Après l'entrée</h3>
            <p className="text-text-light text-sm">
              Évaluation, ajustements, communication avec les familles.
            </p>
          </Card>
        </div>

        {documents.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Documents associés</h2>
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
