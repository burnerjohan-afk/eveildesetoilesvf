import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function OffresPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const structures = await prisma.structure.findMany({
    include: {
      offerPurchased: {
        where: { status: "ACTIVE" },
      },
      moduleAccesses: {
        where: { isEnabled: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Gestion des offres</h1>

      <div className="space-y-6">
        {structures.map((structure) => (
          <Card key={structure.id}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{structure.name}</h2>
              <Link href={`/admin/structures/${structure.id}`}>
                <span className="text-sm text-primary hover:underline">Gérer</span>
              </Link>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Offres achetées:</h3>
              <div className="flex flex-wrap gap-2">
                {structure.offerPurchased.length > 0 ? (
                  structure.offerPurchased.map((offer) => (
                    <Badge key={offer.id} variant="primary">
                      {offer.offerKey}
                    </Badge>
                  ))
                ) : (
                  <span className="text-text-light text-sm">Aucune offre</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Modules activés:</h3>
              <div className="flex flex-wrap gap-2">
                {structure.moduleAccesses.length > 0 ? (
                  structure.moduleAccesses.map((access) => (
                    <Badge key={access.id} variant="secondary">
                      {access.moduleKey}
                    </Badge>
                  ))
                ) : (
                  <span className="text-text-light text-sm">Aucun module</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
