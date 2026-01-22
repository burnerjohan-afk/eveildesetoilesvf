import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function MessageriePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const threads = await prisma.messageThread.findMany({
    where: { structureId: user.structureId },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Messagerie</h1>

      <Card>
        {threads.length > 0 ? (
          <div className="space-y-4">
            {threads.map((thread) => {
              const lastMessage = thread.messages[0];
              return (
                <Link
                  key={thread.id}
                  href={`/portail/messagerie/${thread.id}`}
                  className="block p-4 border border-border rounded hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{thread.subject}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={thread.status === "OPEN" ? "primary" : "success"}>
                        {thread.status}
                      </Badge>
                      <span className="text-sm text-text-light">
                        {thread._count.messages} message{thread._count.messages > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-text-light line-clamp-2">
                      {lastMessage.body}
                    </p>
                  )}
                  <p className="text-xs text-text-light mt-2">
                    {new Date(thread.updatedAt).toLocaleDateString("fr-FR")}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light">Aucune conversation pour le moment.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
