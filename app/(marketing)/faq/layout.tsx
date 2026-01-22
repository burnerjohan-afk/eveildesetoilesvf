import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "FAQ",
  "Réponses aux questions fréquentes sur l'accompagnement et les services proposés."
);

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
