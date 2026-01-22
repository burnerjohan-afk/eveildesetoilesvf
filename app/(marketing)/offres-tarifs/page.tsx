import { generatePageMetadata } from "@/lib/seo";
import { offersContent } from "@/content/offres";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldIcon, OrganizationIcon, QualityIcon } from "@/components/ui/icons";
import Link from "next/link";

export const metadata = generatePageMetadata(
  "Offres & Tarifs",
  "Découvrez nos trois formules d'accompagnement adaptées à vos besoins."
);

export default function OffresTarifsPage() {
  const offers = [
    offersContent.securisation,
    offersContent.structuration,
    offersContent.pilotageQualite,
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text mb-4">Offres & Tarifs</h1>
        <p className="text-lg text-text-light max-w-2xl mx-auto">
          {offersContent.securisation.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {offers.map((offer, index) => {
          const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];
          const variant = variants[index];
          const colors = {
            primary: { text: "text-primary", bg: "bg-primary/5", border: "border-primary/20" },
            secondary: { text: "text-secondary-dark", bg: "bg-secondary/5", border: "border-secondary/20" },
            accent: { text: "text-accent-dark", bg: "bg-accent/5", border: "border-accent/20" },
          };
          const color = colors[variant];
          
          return (
            <Card 
              key={offer.key} 
              variant={variant}
              className="flex flex-col h-full hover relative overflow-hidden group"
              hover
            >
              <div className={`absolute top-0 right-0 w-40 h-40 ${color.bg} rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500`}></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className={`${
                  variant === "primary" 
                    ? "w-14 h-14 gradient-primary rounded-xl mb-6 flex items-center justify-center shadow-colored-primary"
                    : variant === "secondary"
                    ? "w-14 h-14 gradient-secondary rounded-xl mb-6 flex items-center justify-center shadow-colored-secondary"
                    : "w-14 h-14 gradient-accent rounded-xl mb-6 flex items-center justify-center shadow-colored-accent"
                } transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150`}>
                  {index === 0 ? (
                    <ShieldIcon className="w-7 h-7 text-white transition-all duration-300" />
                  ) : index === 1 ? (
                    <OrganizationIcon className="w-7 h-7 text-white transition-all duration-300" />
                  ) : (
                    <QualityIcon className="w-7 h-7 text-white transition-all duration-300" />
                  )}
                </div>
                <h2 className={`text-2xl font-bold ${color.text} mb-4`}>{offer.title}</h2>
                <p className="text-text-light mb-6 leading-relaxed">{offer.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-accent"}`}></span>
                    <span className="font-semibold">Durée :</span> <span className="ml-2 text-text-light">{offer.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-accent"}`}></span>
                    <span className="font-semibold">Cadrage initial :</span> <span className="ml-2 text-text-light">{offer.initialTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-accent"}`}></span>
                    <span className="font-semibold">Espace client :</span> <span className="ml-2 text-text-light">{offer.clientSpace}</span>
                  </div>
                </div>
                <div className="mb-6 flex-1">
                  <h3 className="font-semibold mb-3">Inclusions :</h3>
                  <ul className="space-y-2">
                    {offer.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="flex items-start text-sm text-text-light">
                        <span className={`mr-2 ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>✓</span>
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={
                  variant === "primary"
                    ? "text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-6"
                    : variant === "secondary"
                    ? "text-3xl font-bold gradient-secondary bg-clip-text text-transparent mb-6"
                    : "text-3xl font-bold gradient-accent bg-clip-text text-transparent mb-6"
                }>
                  {offer.indicativePrice}
                </div>
                <Link href={`/offres-tarifs/${index === 0 ? "controle-eaje" : index === 1 ? "organisation-pratiques" : "accompagnement-premium"}`} className="mt-auto">
                  <Button variant={variant} className="w-full">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-lg text-text-light mb-6">
          Les tarifs sont indicatifs et peuvent être adaptés à votre situation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/grille-comparative">
            <Button size="lg" className="shadow-colored-primary">
              Voir la grille comparative
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="shadow-colored-secondary">
              Demander un devis personnalisé
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
