import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function UsersPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    include: {
      structure: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Utilisateurs</h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Rôle</th>
                <th className="text-left p-3">Structure</th>
                <th className="text-left p-3">Dernière connexion</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <Badge variant={u.role === "ADMIN" ? "primary" : "secondary"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3">{u.structure?.name || "-"}</td>
                  <td className="p-3 text-sm text-text-light">
                    {u.lastLoginAt
                      ? new Date(u.lastLoginAt).toLocaleDateString("fr-FR")
                      : "Jamais"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
