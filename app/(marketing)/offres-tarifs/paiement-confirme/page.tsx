import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PaiementConfirmePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl font-bold text-text mb-4">
            Paiement confirmé !
          </h1>
          <p className="text-lg text-text-light mb-8">
            Merci pour votre inscription. Votre paiement a été traité avec succès.
          </p>
          <p className="text-text-light mb-8">
            Vous allez recevoir un email de confirmation avec tous les détails de votre accompagnement.
            Nous vous contacterons dans les plus brefs délais pour planifier le cadrage initial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Retour à l'accueil</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Nous contacter</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
