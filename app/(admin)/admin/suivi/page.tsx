import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function SuiviPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const [actionItems, meetingReports] = await Promise.all([
    prisma.actionItem.findMany({
      include: { structure: true },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }],
      take: 20,
    }),
    prisma.meetingReport.findMany({
      include: { structure: true },
      orderBy: { meetingDate: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Suivi global</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Actions en cours</h2>
          <div className="space-y-3">
            {actionItems.map((action) => (
              <div key={action.id} className="p-3 border border-border rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{action.title}</span>
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
                </div>
                <div className="text-sm text-text-light">
                  Structure: {action.structure.name}
                </div>
                {action.dueDate && (
                  <div className="text-xs text-text-light mt-1">
                    Échéance: {new Date(action.dueDate).toLocaleDateString("fr-FR")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Comptes rendus récents</h2>
          <div className="space-y-4">
            {meetingReports.map((report) => (
              <div key={report.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{report.structure.name}</span>
                  <span className="text-sm text-text-light">
                    {new Date(report.meetingDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-text-light text-sm line-clamp-3">{report.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
