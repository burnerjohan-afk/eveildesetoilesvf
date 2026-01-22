"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { axisToOffer } from "@/content/diagnostic";

interface DiagnosticResult {
  id: string;
  scores: {
    securisation: number;
    structuration: number;
    pilotage: number;
  };
  axes: {
    primary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
    secondary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
    tertiary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
  };
  recommendation: {
    offer: any;
    summary: string;
    actionPlan: Array<{
      step: number;
      axis: string;
      offer: any;
      title: string;
      objective: string;
      benefits: string[];
    }>;
  };
  meta: any;
  lead: {
    structureName: string;
    email: string;
  } | null;
}

export default function DiagnosticResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    structureName: "",
    contactName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/diagnostic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          router.push("/diagnostic");
          return;
        }
        setResult(data);
        setShowLeadForm(!data.lead);
        if (data.lead) {
          setLeadFormData({
            structureName: data.lead.structureName || "",
            contactName: data.lead.contactName || "",
            email: data.lead.email || "",
            phone: data.lead.phone || "",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        router.push("/diagnostic");
      });
  }, [id, router]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const response = await fetch(`/api/diagnostic/${id}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadFormData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      setShowLeadForm(false);
      alert("Vos informations ont été enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-text-light">Chargement de votre diagnostic...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const maxScore = Math.max(result.scores.securisation, result.scores.structuration, result.scores.pilotage);
  const getScorePercentage = (score: number) => Math.round((score / maxScore) * 100);

  const variantMap: Record<string, "primary" | "secondary" | "accent"> = {
    SECURISATION: "primary",
    STRUCTURATION: "secondary",
    PILOTAGE_QUALITE: "accent",
  };

  const primaryVariant = variantMap[result.axes.primary];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text mb-4">Ton diagnostic</h1>
          <p className="text-lg text-text-light">
            Voici votre diagnostic personnalisé et nos recommandations pour votre structure.
          </p>
        </div>

        {/* Synthèse */}
        <Card variant={primaryVariant} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Synthèse</h2>
          <p className="text-text-light leading-relaxed">{result.recommendation.summary}</p>
        </Card>

        {/* Scores */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Vos scores par axe</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-primary">Sécurisation</span>
                <span className="text-sm text-text-light">{result.scores.securisation} points</span>
              </div>
              <div className="w-full bg-border rounded-full h-4 overflow-hidden">
                <div
                  className="h-full gradient-primary transition-all duration-500"
                  style={{ width: `${getScorePercentage(result.scores.securisation)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-secondary-dark">Structuration</span>
                <span className="text-sm text-text-light">{result.scores.structuration} points</span>
              </div>
              <div className="w-full bg-border rounded-full h-4 overflow-hidden">
                <div
                  className="h-full gradient-secondary transition-all duration-500"
                  style={{ width: `${getScorePercentage(result.scores.structuration)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-accent-dark">Pilotage Qualité</span>
                <span className="text-sm text-text-light">{result.scores.pilotage} points</span>
              </div>
              <div className="w-full bg-border rounded-full h-4 overflow-hidden">
                <div
                  className="h-full gradient-accent transition-all duration-500"
                  style={{ width: `${getScorePercentage(result.scores.pilotage)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Recommandation principale */}
        <Card variant={primaryVariant} className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white mb-4">
              Recommandation prioritaire
            </span>
            <h2 className="text-2xl font-bold mb-2">{result.recommendation.offer.title}</h2>
            <p className="text-text-light">{result.recommendation.offer.description}</p>
          </div>
          <Link href={`/offres-tarifs/${result.recommendation.offer.slug}`}>
            <Button variant={primaryVariant} className="w-full shadow-colored-primary">
              En savoir plus sur cette offre
            </Button>
          </Link>
        </Card>

        {/* Plan d'action */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Plan d'action en 3 étapes</h2>
          <div className="space-y-4">
            {result.recommendation.actionPlan.map((step, index) => {
              const stepVariant = variantMap[step.axis];
              return (
                <Card key={index} variant={stepVariant}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        stepVariant === "primary"
                          ? "bg-primary"
                          : stepVariant === "secondary"
                          ? "bg-secondary"
                          : "bg-accent"
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-text-light mb-4">{step.objective}</p>
                      <div>
                        <p className="text-sm font-semibold mb-2">Ce que tu obtiens :</p>
                        <ul className="space-y-1">
                          {step.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-text-light">
                              <span className="mr-2">✓</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/contact?objet=Diagnostic">
            <Button variant="primary" className="w-full shadow-colored-primary">
              Demander un devis
            </Button>
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="w-full shadow-colored-secondary">
              Réserver un échange
            </Button>
          </a>
          <Link href="/grille-comparative">
            <Button variant="outline" className="w-full">
              Voir la grille comparative
            </Button>
          </Link>
        </div>

        {/* Capture Lead */}
        {showLeadForm && (
          <Card className="border-2 border-primary/30">
            <h3 className="text-xl font-bold mb-4">Recevoir mon plan par email</h3>
            <p className="text-sm text-text-light mb-6">
              Laissez vos coordonnées pour recevoir votre diagnostic complet par email et être recontacté par notre équipe.
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <Input
                label="Nom de la structure"
                value={leadFormData.structureName}
                onChange={(e) => setLeadFormData({ ...leadFormData, structureName: e.target.value })}
                required
              />
              <Input
                label="Votre nom (optionnel)"
                value={leadFormData.contactName}
                onChange={(e) => setLeadFormData({ ...leadFormData, contactName: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={leadFormData.email}
                onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                required
              />
              <Input
                label="Téléphone (optionnel)"
                type="tel"
                value={leadFormData.phone}
                onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full shadow-colored-primary"
                disabled={isSubmittingLead}
              >
                {isSubmittingLead ? "Envoi..." : "Envoyer"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
