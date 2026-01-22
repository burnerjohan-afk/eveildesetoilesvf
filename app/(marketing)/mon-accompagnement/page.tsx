import { generatePageMetadata } from "@/lib/seo";
import { marketingContent } from "@/content/marketing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldIcon, OrganizationIcon, QualityIcon } from "@/components/ui/icons";

export const metadata = generatePageMetadata(
  "Mon accompagnement",
  "Découvrez comment je vous accompagne dans la sécurisation, la structuration et le pilotage qualité de votre établissement."
);

export default function MonAccompagnementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">
          {marketingContent.about.title}
        </h1>
        <p className="text-lg text-text-light mb-12">
          {marketingContent.about.intro}
        </p>

        <div className="space-y-8">
          {marketingContent.about.sections.map((section, index) => {
            const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];
            const variant = variants[index % 3];
            
            const IconComponent = index === 0 ? ShieldIcon : index === 1 ? OrganizationIcon : QualityIcon;
            
            return (
              <Card 
                key={index}
                variant={variant}
                className="hover relative overflow-hidden group"
                hover
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-accent"}/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className={`${
                    variant === "primary"
                      ? "w-16 h-16 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-colored-primary"
                      : variant === "secondary"
                      ? "w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-colored-secondary"
                      : "w-16 h-16 gradient-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-colored-accent"
                  } transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150`}>
                    <IconComponent className="w-8 h-8 text-white transition-all duration-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className={
                      variant === "primary"
                        ? "text-2xl font-bold text-primary mb-4"
                        : variant === "secondary"
                        ? "text-2xl font-bold text-secondary-dark mb-4"
                        : "text-2xl font-bold text-accent-dark mb-4"
                    }>
                      {section.title}
                    </h2>
                    <p className="text-text-light leading-relaxed mb-4">{section.description}</p>
                    {section.valueAdded && (
                      <div className={`mt-4 p-4 rounded-lg border-l-4 ${
                        variant === "primary"
                          ? "bg-primary/5 border-primary"
                          : variant === "secondary"
                          ? "bg-secondary/5 border-secondary"
                          : "bg-accent/5 border-accent"
                      }`}>
                        <p className={`text-sm font-semibold mb-2 ${
                          variant === "primary"
                            ? "text-primary"
                            : variant === "secondary"
                            ? "text-secondary-dark"
                            : "text-accent-dark"
                        }`}>
                          ✨ Valeur ajoutée
                        </p>
                        <p className="text-sm text-text-light leading-relaxed">{section.valueAdded}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="gradient-mixed rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/90"></div>
            <div className="relative z-10">
              <p className="text-xl text-text-light mb-6">
                Chaque accompagnement est personnalisé selon vos besoins et votre contexte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <Button size="lg" variant="primary" className="shadow-colored-primary">
                    Contactez-moi pour en discuter
                  </Button>
                </a>
                <a href="/offres-tarifs">
                  <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white">
                    Voir les offres
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
