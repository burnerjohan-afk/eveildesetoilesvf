import { generatePageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/Card";

export const metadata = generatePageMetadata(
  "À propos",
  "Découvrez qui je suis, mon parcours et mon approche de l'accompagnement des structures d'accueil petite enfance."
);

export default function AProposPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">À propos</h1>

        <div className="space-y-8">
          <Card>
            <h2 className="text-2xl font-bold text-primary mb-4">Qui suis-je ?</h2>
            <p className="text-text-light leading-relaxed mb-4">
              Je suis <strong>Laetitia CHIN</strong>, formatrice petite enfance, EJE (Éducatrice de Jeunes Enfants)
              et consultante EAJE (Établissement d'Accueil du Jeune Enfant).
            </p>
            <p className="text-text-light leading-relaxed">
              Passionnée par l'accompagnement des structures d'accueil petite enfance, je mets mon expertise
              au service des équipes et des directions pour sécuriser, structurer et piloter la qualité de
              leurs établissements.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-primary mb-4">Mon parcours</h2>
            <p className="text-text-light leading-relaxed mb-4">
              Forte de mon expérience en tant qu'EJE et de ma formation continue, j'accompagne les structures
              d'accueil dans leur développement et leur conformité réglementaire.
            </p>
            <p className="text-text-light leading-relaxed">
              Mon approche allie expertise technique, bienveillance et pragmatisme pour offrir des solutions
              adaptées à chaque contexte et à chaque besoin.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-primary mb-4">Mon approche</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text mb-2">Accompagnement personnalisé</h3>
                <p className="text-text-light">
                  Chaque structure est unique. Je prends le temps de comprendre votre contexte, vos enjeux
                  et vos objectifs pour vous proposer un accompagnement sur-mesure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2">Expertise réglementaire</h3>
                <p className="text-text-light">
                  Je vous aide à sécuriser votre structure sur le plan réglementaire avec des outils
                  pratiques et des check-lists à jour.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2">Structuration et organisation</h3>
                <p className="text-text-light">
                  J'accompagne vos équipes dans l'amélioration de leurs pratiques et l'optimisation
                  de leur organisation quotidienne.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2">Pilotage qualité</h3>
                <p className="text-text-light">
                  Je vous propose des outils d'évaluation et de suivi pour piloter la qualité de votre
                  structure de manière continue et autonome.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-primary mb-4">Pourquoi me faire confiance ?</h2>
            <ul className="space-y-3 text-text-light">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Expertise reconnue en petite enfance et EAJE</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Approche bienveillante et respectueuse des équipes</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Outils pratiques et opérationnels</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Suivi régulier et accompagnement dans la durée</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Espace client sécurisé pour centraliser vos documents et échanges</span>
              </li>
            </ul>
          </Card>

          <div className="text-center pt-8">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Contactez-moi pour en discuter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
