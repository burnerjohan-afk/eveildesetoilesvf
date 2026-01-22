import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { portalModules } from "@/content/portalModules";

export default async function PortalDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const structure = await prisma.structure.findUnique({
    where: { id: user.structureId },
    include: {
      offerPurchased: {
        where: { status: "ACTIVE" },
      },
      actionItems: {
        where: { status: { in: ["TODO", "IN_PROGRESS"] } },
        orderBy: { dueDate: "asc" },
        take: 5,
      },
      documents: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!structure) {
    redirect("/login");
  }

  const enabledModules = await prisma.moduleAccess.findMany({
    where: {
      structureId: structure.id,
      isEnabled: true,
    },
  });

  const moduleKeys = enabledModules.map((m) => m.moduleKey);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-2">
        Bienvenue, {structure.name}
      </h1>
      <p className="text-text-light mb-8">
        Voici un aperçu de votre espace client
      </p>

      {/* Offres actives */}
      {structure.offerPurchased.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">Offres actives</h2>
          <div className="flex flex-wrap gap-2">
            {structure.offerPurchased.map((offer) => (
              <Badge key={offer.id} variant="primary">
                {offer.offerKey}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Modules disponibles */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4">Modules disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleKeys.map((key) => {
            const module = portalModules[key as keyof typeof portalModules];
            if (!module) return null;
            return (
              <Link
                key={key}
                href={`/portail/${key.toLowerCase().replace(/_/g, "-")}`}
                className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="text-2xl mb-2">{module.icon}</div>
                <h3 className="font-semibold mb-1">{module.title}</h3>
                <p className="text-sm text-text-light">{module.description}</p>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Actions à faire */}
      {structure.actionItems.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">Actions à faire</h2>
          <ul className="space-y-2">
            {structure.actionItems.map((action) => (
              <li key={action.id} className="flex items-center justify-between p-2 border border-border rounded">
                <div>
                  <span className="font-medium">{action.title}</span>
                  {action.dueDate && (
                    <span className="text-sm text-text-light ml-2">
                      (Échéance: {new Date(action.dueDate).toLocaleDateString("fr-FR")})
                    </span>
                  )}
                </div>
                <Badge
                  variant={
                    action.status === "DONE"
                      ? "success"
                      : action.status === "IN_PROGRESS"
                      ? "warning"
                      : "primary"
                  }
                >
                  {action.status}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/portail/suivi">
              <Button variant="outline">Voir toutes les actions</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Documents récents */}
      {structure.documents.length > 0 && (
        <Card>
          <h2 className="text-xl font-bold mb-4">Documents récents</h2>
          <ul className="space-y-2">
            {structure.documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between p-2 border border-border rounded">
                <div>
                  <span className="font-medium">{doc.title}</span>
                  <span className="text-sm text-text-light ml-2">
                    ({new Date(doc.createdAt).toLocaleDateString("fr-FR")})
                  </span>
                </div>
                <Link href={`/api/files/${doc.fileKey}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    Télécharger
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/portail/documents">
              <Button variant="outline">Voir tous les documents</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
