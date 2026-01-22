import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export default async function ParametresPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const structure = await prisma.structure.findUnique({
    where: { id: user.structureId },
    include: {
      users: true,
    },
  });

  if (!structure) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Paramètres</h1>

      <div className="space-y-6">
        {/* Coordonnées structure */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Coordonnées de la structure</h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Nom:</span> {structure.name}
            </div>
            {structure.address && (
              <div>
                <span className="font-semibold">Adresse:</span> {structure.address}
              </div>
            )}
          </div>
        </Card>

        {/* Utilisateurs */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Utilisateurs</h2>
          <div className="space-y-2">
            {structure.users.map((u) => (
              <div key={u.id} className="p-3 border border-border rounded">
                <div className="font-medium">{u.email}</div>
                <div className="text-sm text-text-light">
                  Dernière connexion:{" "}
                  {u.lastLoginAt
                    ? new Date(u.lastLoginAt).toLocaleDateString("fr-FR")
                    : "Jamais"}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-light mt-4">
            Pour ajouter un utilisateur, contactez l'administration.
          </p>
        </Card>
      </div>
    </div>
  );
}
