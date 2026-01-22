import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata, generateJsonLd } from "@/lib/seo";
import { config } from "@/lib/config";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
