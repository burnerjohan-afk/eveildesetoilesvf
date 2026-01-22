import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT" || !user.structureId) {
    redirect("/login");
  }

  const navItems = [
    { href: "/portail", label: "Tableau de bord" },
    { href: "/portail/documents", label: "Documents" },
    { href: "/portail/suivi", label: "Suivi" },
    { href: "/portail/messagerie", label: "Messagerie" },
    { href: "/portail/parametres", label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/portail" className="text-xl font-bold text-primary">
            Éveil des Étoiles - Espace Client
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-light">
              {user.structure?.name}
            </span>
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="ghost" size="sm">
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
        <nav className="container mx-auto px-4 border-t border-border">
          <div className="flex gap-6 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm text-text hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
