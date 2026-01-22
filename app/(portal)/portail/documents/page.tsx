import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function DocumentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const documents = await prisma.document.findMany({
    where: { structureId: user.structureId },
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: true },
  });

  const folders = ["FAMILLES", "EQUIPE", "DIRECTION", "ARCHIVES", "GENERAL"] as const;
  const documentsByFolder = folders.reduce((acc, folder) => {
    acc[folder] = documents.filter((doc) => doc.folder === folder);
    return acc;
  }, {} as Record<string, typeof documents>);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Documents & Archives</h1>

      <div className="space-y-8">
        {folders.map((folder) => {
          const folderDocs = documentsByFolder[folder];
          if (folderDocs.length === 0) return null;

          return (
            <Card key={folder}>
              <h2 className="text-xl font-bold mb-4">{folder}</h2>
              <div className="space-y-2">
                {folderDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border border-border rounded"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-text-light">
                        {doc.category} • {new Date(doc.createdAt).toLocaleDateString("fr-FR")} •{" "}
                        {(doc.sizeBytes / 1024).toFixed(1)} KB
                      </div>
                    </div>
                    <Link href={`/api/files/${doc.fileKey}`} target="_blank">
                      <Button variant="outline" size="sm">
                        Télécharger
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {documents.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-text-light">Aucun document disponible pour le moment.</p>
        </Card>
      )}
    </div>
  );
}
