export const config = {
  app: {
    name: "Éveil des Étoiles",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  email: {
    from: process.env.FROM_EMAIL || "contact@eveildesetoiles.fr",
    resendApiKey: process.env.RESEND_API_KEY,
  },
  storage: {
    maxFileSize: 15 * 1024 * 1024, // 15MB
    allowedMimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ],
    s3: {
      endpoint: process.env.S3_ENDPOINT,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucketName: process.env.S3_BUCKET_NAME,
      region: process.env.S3_REGION || "us-east-1",
    },
  },
  session: {
    secret: process.env.SESSION_SECRET || "change-me-in-production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
  },
} as const;
