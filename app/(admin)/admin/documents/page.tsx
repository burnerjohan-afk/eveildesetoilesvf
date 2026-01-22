import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function DocumentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const documents = await prisma.document.findMany({
    include: {
      structure: true,
      uploadedBy: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Documents</h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3">Titre</th>
                <th className="text-left p-3">Structure</th>
                <th className="text-left p-3">Dossier</th>
                <th className="text-left p-3">Catégorie</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-border">
                  <td className="p-3">{doc.title}</td>
                  <td className="p-3">{doc.structure.name}</td>
                  <td className="p-3 text-sm text-text-light">{doc.folder}</td>
                  <td className="p-3 text-sm text-text-light">{doc.category}</td>
                  <td className="p-3 text-sm text-text-light">
                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/api/files/${doc.fileKey}`}
                      target="_blank"
                      className="text-primary hover:underline text-sm"
                    >
                      Télécharger
                    </Link>
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
