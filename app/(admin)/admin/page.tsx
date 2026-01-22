import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const [structuresCount, usersCount, documentsCount, leadsCount] = await Promise.all([
    prisma.structure.count(),
    prisma.user.count(),
    prisma.document.count(),
    prisma.lead.count({ where: { processed: false } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    where: { processed: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-2xl font-bold text-primary mb-1">{structuresCount}</div>
          <div className="text-sm text-text-light">Structures</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-primary mb-1">{usersCount}</div>
          <div className="text-sm text-text-light">Utilisateurs</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-primary mb-1">{documentsCount}</div>
          <div className="text-sm text-text-light">Documents</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-primary mb-1">{leadsCount}</div>
          <div className="text-sm text-text-light">Nouveaux contacts</div>
        </Card>
      </div>

      {recentLeads.length > 0 && (
        <Card>
          <h2 className="text-xl font-bold mb-4">Nouveaux contacts</h2>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-3 border border-border rounded">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{lead.name}</span>
                    <span className="text-sm text-text-light ml-2">({lead.email})</span>
                  </div>
                  <span className="text-xs text-text-light">
                    {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="text-sm text-text-light">
                  <div>Structure: {lead.structureName}</div>
                  <div>Objet: {lead.subject}</div>
                  {lead.offerKey && <div>Offre: {lead.offerKey}</div>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
