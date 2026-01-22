import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function SuiviPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const [meetingReports, actionItems] = await Promise.all([
    prisma.meetingReport.findMany({
      where: { structureId: user.structureId },
      orderBy: { meetingDate: "desc" },
    }),
    prisma.actionItem.findMany({
      where: { structureId: user.structureId },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }],
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Suivi & Accompagnement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comptes rendus */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Comptes rendus de rendez-vous</h2>
          {meetingReports.length > 0 ? (
            <div className="space-y-4">
              {meetingReports.map((report) => (
                <div key={report.id} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      {new Date(report.meetingDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-text-light text-sm whitespace-pre-wrap">{report.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-light">Aucun compte rendu disponible.</p>
          )}
        </Card>

        {/* Actions */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Actions en cours</h2>
          {actionItems.length > 0 ? (
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
                  {action.description && (
                    <p className="text-sm text-text-light mb-2">{action.description}</p>
                  )}
                  {action.dueDate && (
                    <p className="text-xs text-text-light">
                      Échéance: {new Date(action.dueDate).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-light">Aucune action en cours.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
