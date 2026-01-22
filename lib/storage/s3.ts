import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";
import { randomBytes } from "crypto";

const s3Client = new S3Client({
  endpoint: config.storage.s3.endpoint,
  region: config.storage.s3.region,
  credentials: {
    accessKeyId: config.storage.s3.accessKeyId!,
    secretAccessKey: config.storage.s3.secretAccessKey!,
  },
});

export async function uploadFile(file: File, folder: string = "general") {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = file.name.split(".").pop() || "";
  const fileKey = `${folder}/${randomBytes(16).toString("hex")}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: config.storage.s3.bucketName!,
    Key: fileKey,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);

  return {
    fileKey,
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: buffer.length,
  };
}

export async function getFileUrl(fileKey: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.storage.s3.bucketName!,
    Key: fileKey,
  });

  // URL signée valide 1 heure
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function deleteFile(fileKey: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: config.storage.s3.bucketName!,
    Key: fileKey,
  });

  await s3Client.send(command);
}
