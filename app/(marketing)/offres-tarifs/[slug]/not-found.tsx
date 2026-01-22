import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-text mb-4">Offre non trouvée</h1>
        <p className="text-lg text-text-light mb-8">
          L'offre que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/offres-tarifs">
          <Button size="lg">Voir toutes les offres</Button>
        </Link>
      </Card>
    </div>
  );
}
