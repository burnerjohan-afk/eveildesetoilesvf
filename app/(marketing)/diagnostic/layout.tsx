import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Diagnostic EAJE",
  "Répondez à notre questionnaire pour obtenir un diagnostic personnalisé et des recommandations adaptées à votre structure d'accueil."
);

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
