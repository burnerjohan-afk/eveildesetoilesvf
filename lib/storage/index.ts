import { config } from "../config";
import * as localStorage from "./local";
import * as s3Storage from "./s3";

export interface UploadResult {
  fileKey: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export async function uploadFile(
  file: File,
  folder: string = "general"
): Promise<UploadResult> {
  // Vérifier la taille
  if (file.size > config.storage.maxFileSize) {
    throw new Error(`Fichier trop volumineux (max ${config.storage.maxFileSize / 1024 / 1024}MB)`);
  }

  // Vérifier le type MIME
  if (!config.storage.allowedMimeTypes.includes(file.type)) {
    throw new Error(`Type de fichier non autorisé: ${file.type}`);
  }

  // Utiliser S3 si configuré, sinon stockage local
  if (config.storage.s3.endpoint && config.storage.s3.accessKeyId) {
    return s3Storage.uploadFile(file, folder);
  } else {
    return localStorage.uploadFile(file, folder);
  }
}

export async function getFileUrl(fileKey: string): Promise<string> {
  if (config.storage.s3.endpoint && config.storage.s3.accessKeyId) {
    return s3Storage.getFileUrl(fileKey);
  } else {
    return localStorage.getFileUrl(fileKey);
  }
}

export async function deleteFile(fileKey: string): Promise<void> {
  if (config.storage.s3.endpoint && config.storage.s3.accessKeyId) {
    return s3Storage.deleteFile(fileKey);
  } else {
    return localStorage.deleteFile(fileKey);
  }
}
