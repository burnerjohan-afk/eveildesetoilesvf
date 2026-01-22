import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

export default async function ContentPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Gestion du contenu</h1>

      <Card>
        <p className="text-text-light mb-4">
          La gestion du contenu éditable sera implémentée ici. Pour l'instant, le contenu est défini
          dans les fichiers <code className="bg-background px-2 py-1 rounded">/content/*.ts</code>.
        </p>
        <p className="text-text-light">
          Une future version permettra de modifier le contenu directement depuis cette interface
          sans intervention développeur.
        </p>
      </Card>
    </div>
  );
}
