import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Contact",
  "Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé."
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
