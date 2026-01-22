import { generatePageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/Card";

export const metadata = generatePageMetadata(
  "Mentions légales",
  "Mentions légales du site Éveil des Étoiles"
);

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-8">Mentions légales</h1>

        <div className="space-y-6 text-text-light">
          <section>
            <h2 className="text-xl font-bold text-text mb-3">1. Éditeur du site</h2>
            <p className="mb-2">
              Le site <strong>eveildesetoiles.fr</strong> est édité par :
            </p>
            <p className="mb-2">
              <strong>Laetitia CHIN</strong><br />
              Formatrice petite enfance, EJE et Consultante EAJE
            </p>
            <p>
              Pour toute question concernant le site, vous pouvez nous contacter via le{" "}
              <a href="/contact" className="text-primary hover:underline">formulaire de contact</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">2. Directeur de publication</h2>
            <p>
              Laetitia CHIN, en qualité de responsable de la publication et du contenu du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">3. Hébergement</h2>
            <p className="mb-2">
              Le site est hébergé par :
            </p>
            <p>
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, USA<br />
              Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">4. Protection des données personnelles</h2>
            <p className="mb-2">
              Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au
              Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
              d'accès, de rectification, de suppression et d'opposition aux données personnelles
              vous concernant.
            </p>
            <p className="mb-2">
              Pour exercer ces droits, vous pouvez nous contacter via le{" "}
              <a href="/contact" className="text-primary hover:underline">formulaire de contact</a>.
            </p>
            <p>
              Pour plus d'informations, consultez notre{" "}
              <a href="/politique-confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">5. Propriété intellectuelle</h2>
            <p className="mb-2">
              L'ensemble du contenu de ce site (textes, images, logos, graphismes, icônes) est la
              propriété exclusive d'Éveil des Étoiles, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou
              partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">6. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement du site.
              Aucun cookie de tracking ou de publicité n'est utilisé. Pour plus d'informations, consultez
              notre{" "}
              <a href="/politique-confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">7. Limitation de responsabilité</h2>
            <p className="mb-2">
              Les informations contenues sur ce site sont aussi précises que possible et le site est
              périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des
              omissions ou des lacunes.
            </p>
            <p>
              Éveil des Étoiles ne pourra être tenu responsable des dommages directs et indirects
              causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de
              l'utilisation d'un matériel ne répondant pas aux spécifications, soit de l'apparition
              d'un bug ou d'une incompatibilité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-3">8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige et
              à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément
              aux règles de compétence en vigueur.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
