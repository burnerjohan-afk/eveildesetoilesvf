import { generatePageMetadata } from "@/lib/seo";
import { marketingContent } from "@/content/marketing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  ShieldIcon, 
  OrganizationIcon, 
  QualityIcon,
  ExpertiseIcon,
  ProximityIcon,
  TransparencyIcon,
  KindnessIcon
} from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

export const metadata = generatePageMetadata(
  "Accueil",
  marketingContent.hero.subtitle
);

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-20 relative overflow-hidden min-h-[500px] md:min-h-[600px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/image/creche.jpg"
            alt="Structure d'accueil petite enfance"
            fill
            className="object-cover brightness-110 saturate-125"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 py-16 md:py-24 px-4 container mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {marketingContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {marketingContent.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/offres-tarifs">
              <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-primary border-2 border-primary/30 shadow-xl hover:bg-white/95 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {marketingContent.hero.cta}
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-secondary-dark border-2 border-secondary/30 shadow-xl hover:bg-white/95 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Contactez-moi
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">

      {/* About Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            {marketingContent.about.title}
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
            {marketingContent.about.intro}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketingContent.about.sections.map((section, index) => {
            const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];
            const variant = variants[index % 3];
            
            const iconClasses = {
              primary: "w-16 h-16 gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-colored-primary",
              secondary: "w-16 h-16 gradient-secondary rounded-full mx-auto mb-6 flex items-center justify-center shadow-colored-secondary",
              accent: "w-16 h-16 gradient-accent rounded-full mx-auto mb-6 flex items-center justify-center shadow-colored-accent",
            };
            
            const titleClasses = {
              primary: "text-2xl font-bold text-primary",
              secondary: "text-2xl font-bold text-secondary-dark",
              accent: "text-2xl font-bold text-accent-dark",
            };
            
            const IconComponent = index === 0 ? ShieldIcon : index === 1 ? OrganizationIcon : QualityIcon;
            
            return (
              <Card 
                key={index} 
                variant={variant}
                className="text-center hover relative overflow-hidden group"
                hover
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {variant === "primary" && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>}
                  {variant === "secondary" && <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent"></div>}
                  {variant === "accent" && <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>}
                </div>
                <div className="relative z-10">
                  <div className={`${iconClasses[variant]} transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150`}>
                    <IconComponent className="w-8 h-8 text-white transition-all duration-300" />
                  </div>
                  <h3 className={titleClasses[variant]}>
                    {section.title}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Offers Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Nos offres d'accompagnement
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto">
            Trois formules adaptées à vos besoins, de la sécurisation réglementaire à l'accompagnement premium.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card 
            variant="primary" 
            className="flex flex-col hover relative overflow-hidden group"
            hover
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 gradient-primary rounded-lg mb-4 flex items-center justify-center transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150">
                <ShieldIcon className="w-6 h-6 text-white transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Contrôle EAJE</h3>
              <p className="text-text-light mb-6 flex-1 leading-relaxed">
                Pack Contrôle EAJE : conformité réglementaire, dossiers à jour, check-lists et outils pratiques.
              </p>
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-text-light">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Durée : 3 à 6 mois
                </div>
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  À partir de 1 500 €
                </div>
              </div>
              <Link href="/offres-tarifs/controle-eaje" className="mt-auto block">
                <Button variant="primary" className="w-full">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card 
            variant="secondary" 
            className="flex flex-col hover relative overflow-hidden group"
            hover
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 gradient-secondary rounded-lg mb-4 flex items-center justify-center transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150">
                <OrganizationIcon className="w-6 h-6 text-white transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-dark mb-4">Organisation & Pratiques</h3>
              <p className="text-text-light mb-6 flex-1 leading-relaxed">
                Organisation et pratiques : parcours d'entrée enfant & famille, chrono-manager direction, outils de gestion.
              </p>
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-text-light">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Durée : 6 à 12 mois
                </div>
                <div className="text-2xl font-bold gradient-secondary bg-clip-text text-transparent">
                  À partir de 3 000 €
                </div>
              </div>
              <Link href="/offres-tarifs/organisation-pratiques" className="mt-auto block">
                <Button variant="secondary" className="w-full">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card 
            variant="accent" 
            className="flex flex-col hover relative overflow-hidden group"
            hover
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 gradient-accent rounded-lg mb-4 flex items-center justify-center transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150">
                <QualityIcon className="w-6 h-6 text-white transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-accent-dark mb-4">Accompagnement Premium</h3>
              <p className="text-text-light mb-6 flex-1 leading-relaxed">
                Accompagnement premium : échelle qualité EAJE, plan d'actions personnalisé, suivi régulier et traçabilité.
              </p>
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-text-light">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Durée : 12 à 24 mois
                </div>
                <div className="text-2xl font-bold gradient-accent bg-clip-text text-transparent">
                  À partir de 6 000 €
                </div>
              </div>
              <Link href="/offres-tarifs/accompagnement-premium" className="mt-auto block">
                <Button variant="accent" className="w-full">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <div className="text-center">
          <Link href="/offres-tarifs">
            <Button size="lg" className="shadow-colored-primary">
              Voir toutes les offres
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            {marketingContent.trust.title}
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto">
            {marketingContent.trust.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketingContent.trust.testimonials.map((testimonial, index) => {
            const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];
            const variant = variants[index % 3];
            
            return (
              <Card 
                key={index} 
                variant={variant}
                className="hover relative overflow-hidden group"
                hover
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  {variant === "primary" && <div className="w-full h-full gradient-primary rounded-full -mr-12 -mt-12"></div>}
                  {variant === "secondary" && <div className="w-full h-full gradient-secondary rounded-full -mr-12 -mt-12"></div>}
                  {variant === "accent" && <div className="w-full h-full gradient-accent rounded-full -mr-12 -mt-12"></div>}
                </div>
                <div className="relative z-10">
                  <div className={`mb-4 transition-all duration-300 group-hover:brightness-125 group-hover:saturate-150 ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                    <svg 
                      className="w-8 h-8"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l1.017 2.193c-4.224.859-7.392 3.548-7.392 8.003V21h-3.608zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l1 2.193c-4.184.859-7.392 3.548-7.392 8.003V21H0z"/>
                    </svg>
                  </div>
                  <p className="text-text-light mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className={`font-semibold ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-text-light">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            {marketingContent.values.title}
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto">
            {marketingContent.values.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketingContent.values.items.map((value, index) => {
            const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent", "primary"];
            const variant = variants[index % 4];
            
            return (
              <Card 
                key={index} 
                variant={variant}
                className="text-center hover relative overflow-hidden group"
                hover
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {variant === "primary" && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>}
                  {variant === "secondary" && <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent"></div>}
                  {variant === "accent" && <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>}
                </div>
                <div className="relative z-10">
                  <div className={`mb-4 flex items-center justify-center transition-all duration-300 group-hover:brightness-125 group-hover:saturate-150 ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                    {value.title === "Expertise" && <ExpertiseIcon className="w-12 h-12 transition-all duration-300" />}
                    {value.title === "Proximité" && <ProximityIcon className="w-12 h-12 transition-all duration-300" />}
                    {value.title === "Transparence" && <TransparencyIcon className="w-12 h-12 transition-all duration-300" />}
                    {value.title === "Bienveillance" && <KindnessIcon className="w-12 h-12 transition-all duration-300" />}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary-dark" : "text-accent-dark"}`}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl p-12 md:p-16 text-center gradient-mixed">
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            {marketingContent.cta.title}
          </h2>
          <p className="text-lg md:text-xl text-text-light mb-10 max-w-2xl mx-auto">
            {marketingContent.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="primary" className="shadow-colored-primary">
                {marketingContent.cta.button}
              </Button>
            </Link>
            <Link href="/offres-tarifs">
              <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white">
                Découvrir les offres
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
