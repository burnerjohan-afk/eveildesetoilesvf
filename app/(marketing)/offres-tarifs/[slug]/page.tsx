"use client";

import { useParams, useRouter } from "next/navigation";
import { offersDetails } from "@/content/offresDetails";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendlyEmbed } from "@/components/marketing/CalendlyEmbed";

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const offer = Object.values(offersDetails).find((o) => o.slug === slug);

  useEffect(() => {
    if (!offer) {
      router.push("/offres-tarifs");
    }
  }, [offer, router]);

  if (!offer) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-text-light">Chargement...</p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"inscription" | "devis" | "paiement">("inscription");
  const [formData, setFormData] = useState({
    structureName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = activeTab === "inscription" ? "/api/contact" : "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: activeTab === "inscription" 
            ? `Inscription - ${offer.title}`
            : `Demande de devis - ${offer.title}`,
          offerKey: offer.key,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variantMap: Record<string, "primary" | "secondary" | "accent"> = {
    SECURISATION: "primary",
    STRUCTURATION: "secondary",
    PILOTAGE_QUALITE: "accent",
  };
  const variant = variantMap[offer.key] || "primary";

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant={variant} className="mb-4">
            {offer.subtitle}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            {offer.title}
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Un accompagnement complet pour {offer.key === "SECURISATION" ? "sécuriser" : offer.key === "STRUCTURATION" ? "structurer" : "piloter la qualité de"} votre structure d'accueil petite enfance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Processus */}
            <Card variant={variant}>
              <h2 className="text-2xl font-bold mb-6">Processus d'accompagnement</h2>
              <ol className="space-y-4">
                {offer.process.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-accent"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-light leading-relaxed">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Objectifs */}
            <Card variant={variant}>
              <h2 className="text-2xl font-bold mb-6">Objectifs de l'offre</h2>
              <ul className="space-y-3">
                {offer.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`text-xl ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                      ✓
                    </span>
                    <span className="text-text-light leading-relaxed">{objective}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Méthode */}
            <Card variant={variant}>
              <h2 className="text-2xl font-bold mb-6">Méthode d'accompagnement</h2>
              <ul className="space-y-3">
                {offer.method.map((method, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`text-xl ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                      →
                    </span>
                    <span className="text-text-light leading-relaxed">{method}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Utilité */}
            <Card variant={variant}>
              <h2 className="text-2xl font-bold mb-6">Utilité de cette offre</h2>
              <ul className="space-y-3">
                {offer.utility.map((utility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`text-xl ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                      ★
                    </span>
                    <span className="text-text-light leading-relaxed">{utility}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Points réglementaires */}
            <Card variant={variant}>
              <h2 className="text-2xl font-bold mb-6">Points réglementaires couverts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offer.regulatoryPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className={`text-sm ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : "text-accent"}`}>
                      •
                    </span>
                    <span className="text-sm text-text-light">{point}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            <Card variant={variant} className="sticky top-8">
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold mb-2 ${
                  variant === "primary" 
                    ? "gradient-primary bg-clip-text text-transparent"
                    : variant === "secondary"
                    ? "gradient-secondary bg-clip-text text-transparent"
                    : "gradient-accent bg-clip-text text-transparent"
                }`}>
                  {offer.price.toLocaleString("fr-FR")} €
                </div>
                <p className="text-sm text-text-light">Tarif indicatif</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border mb-6">
                <button
                  onClick={() => setActiveTab("inscription")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === "inscription"
                      ? variant === "primary"
                        ? "text-primary border-b-2 border-primary"
                        : variant === "secondary"
                        ? "text-secondary border-b-2 border-secondary"
                        : "text-accent border-b-2 border-accent"
                      : "text-text-light hover:text-text"
                  }`}
                >
                  Inscription
                </button>
                <button
                  onClick={() => setActiveTab("devis")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === "devis"
                      ? variant === "primary"
                        ? "text-primary border-b-2 border-primary"
                        : variant === "secondary"
                        ? "text-secondary border-b-2 border-secondary"
                        : "text-accent border-b-2 border-accent"
                      : "text-text-light hover:text-text"
                  }`}
                >
                  Devis
                </button>
                <button
                  onClick={() => setActiveTab("paiement")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === "paiement"
                      ? variant === "primary"
                        ? "text-primary border-b-2 border-primary"
                        : variant === "secondary"
                        ? "text-secondary border-b-2 border-secondary"
                        : "text-accent border-b-2 border-accent"
                      : "text-text-light hover:text-text"
                  }`}
                >
                  Paiement
                </button>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-text-light mb-4">Votre demande a été envoyée avec succès !</p>
                  <Button
                    variant={variant}
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        structureName: "",
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        message: "",
                      });
                    }}
                  >
                    Nouvelle demande
                  </Button>
                </div>
              ) : activeTab === "paiement" ? (
                <div className="space-y-4">
                  <p className="text-sm text-text-light text-center mb-4">
                    Validez votre inscription en payant directement en ligne
                  </p>
                  <form action="/api/checkout" method="POST">
                    <input type="hidden" name="offerKey" value={offer.key} />
                    <input type="hidden" name="amount" value={offer.price * 100} />
                    <Button
                      type="submit"
                      variant={variant}
                      className="w-full"
                      size="lg"
                    >
                      Payer {offer.price.toLocaleString("fr-FR")} €
                    </Button>
                  </form>
                  <p className="text-xs text-text-light text-center">
                    Paiement sécurisé par Stripe
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Structure / Crèche"
                    value={formData.structureName}
                    onChange={(e) => setFormData({ ...formData, structureName: e.target.value })}
                    required
                  />
                  <Input
                    label="Nom / Prénom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="Adresse"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <Textarea
                    label="Message (optionnel)"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button
                    type="submit"
                    variant={variant}
                    className="w-full"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting
                      ? "Envoi..."
                      : activeTab === "inscription"
                      ? "S'inscrire"
                      : "Demander un devis"}
                  </Button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-text-light text-center mb-4">
                  Ou prenez rendez-vous directement
                </p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Prendre rendez-vous (Calendly)
                  </Button>
                </a>
              </div>
            </Card>

            {/* Calendly Embed Optionnel */}
            {calendlyUrl && calendlyUrl !== "#" && (
              <Card variant={variant} className="mt-6">
                <h3 className="text-xl font-bold mb-4">Planifier un rendez-vous</h3>
                <CalendlyEmbed url={calendlyUrl} />
              </Card>
            )}
          </div>
        </div>

        {/* Retour */}
        <div className="mt-12 text-center">
          <Link href="/offres-tarifs">
            <Button variant="ghost">← Retour aux offres</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
