import { generatePageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/Card";

export const metadata = generatePageMetadata(
  "Politique de confidentialité",
  "Politique de confidentialité et protection des données personnelles"
);

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-8">Politique de confidentialité</h1>

        <div className="space-y-6 text-text-light">
          <section>
            <h2 className="text-xl font-bold text-text mb-3">1. Collecte des données</h2>
            <p>
              Nous collectons les données personnelles que vous nous fournissez volontairement lors
              de l'utilisation du formulaire de contact, de la création d'un compte ou de
              l'utilisation de l'espace client.
            </p>
            <p className="mt-2">
              Les données collectées peuvent inclure : nom, prénom, email, téléphone, nom de la
              structure, adresse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">2. Utilisation des données</h2>
            <p>
              Les données personnelles collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Répondre à vos demandes de contact</li>
              <li>Gérer votre compte et votre espace client</li>
              <li>Vous fournir les services demandés</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">3. Conservation des données</h2>
            <p>
              Les données sont conservées pendant la durée nécessaire aux finalités pour lesquelles
              elles ont été collectées, conformément à la réglementation en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">4. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits, contactez-nous via le formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement du
              site. Aucun cookie de tracking ou de publicité n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">6. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données personnelles contre tout accès non autorisé, perte ou destruction.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
