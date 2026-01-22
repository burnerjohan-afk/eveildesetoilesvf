import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// Route pour servir les fichiers uploadés en local (DEV uniquement)
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = join(process.cwd(), "uploads", ...params.path);
    const file = await readFile(filePath);
    
    // Déterminer le type MIME
    const ext = params.path[params.path.length - 1].split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
    };
    
    const contentType = mimeTypes[ext || ""] || "application/octet-stream";
    
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.path[params.path.length - 1]}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Fichier non trouvé" }, { status: 404 });
  }
}
