import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function StructuresPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const structures = await prisma.structure.findMany({
    include: {
      _count: {
        select: { users: true, documents: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text">Structures</h1>
        <Link href="/admin/structures/new">
          <Button>Créer une structure</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {structures.map((structure) => (
          <Card key={structure.id}>
            <h2 className="text-xl font-bold mb-2">{structure.name}</h2>
            {structure.address && (
              <p className="text-sm text-text-light mb-4">{structure.address}</p>
            )}
            <div className="text-sm text-text-light mb-4">
              <div>{structure._count.users} utilisateur(s)</div>
              <div>{structure._count.documents} document(s)</div>
            </div>
            <Link href={`/admin/structures/${structure.id}`}>
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {structures.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-text-light mb-4">Aucune structure pour le moment.</p>
          <Link href="/admin/structures/new">
            <Button>Créer la première structure</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
