import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

const UPLOADS_DIR = join(process.cwd(), "uploads");

export async function uploadFile(file: File, folder: string = "general") {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = file.name.split(".").pop() || "";
  const fileKey = `${folder}/${randomBytes(16).toString("hex")}.${fileExtension}`;
  const filePath = join(UPLOADS_DIR, fileKey);

  // Créer le dossier si nécessaire
  await mkdir(join(UPLOADS_DIR, folder), { recursive: true });

  // Écrire le fichier
  await writeFile(filePath, buffer);

  return {
    fileKey,
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: buffer.length,
  };
}

export async function getFileUrl(fileKey: string): Promise<string> {
  return `/api/files/${fileKey}`;
}

export async function deleteFile(fileKey: string): Promise<void> {
  const filePath = join(UPLOADS_DIR, fileKey);
  try {
    await unlink(filePath);
  } catch (error) {
    // Fichier peut ne pas exister
    console.error("Erreur suppression fichier:", error);
  }
}
