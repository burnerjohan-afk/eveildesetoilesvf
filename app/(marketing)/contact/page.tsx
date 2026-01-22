"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { contactSchema } from "@/lib/validators";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    structureName: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    offerKey: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse({
        ...formData,
        offerKey: formData.offerKey || undefined,
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      setIsSuccess(true);
      setFormData({
        structureName: "",
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        offerKey: "",
      });
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: error.message || "Une erreur est survenue" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Message envoyé !</h2>
          <p className="text-text-light mb-6">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
          <Button onClick={() => setIsSuccess(false)}>Envoyer un autre message</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-text mb-8 text-center">Contact</h1>
      <p className="text-lg text-text-light mb-12 text-center max-w-2xl mx-auto">
        Remplissez le formulaire ci-dessous pour me contacter ou demander un devis personnalisé.
      </p>

      <Card variant="primary" className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Formulaire de contact</h2>
          <p className="text-text-light">Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Structure / Crèche"
            value={formData.structureName}
            onChange={(e) => setFormData({ ...formData, structureName: e.target.value })}
            error={errors.structureName}
            required
          />
          <Input
            label="Nom / Prénom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />
          <Input
            label="Téléphone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
          />
          <Input
            label="Objet"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            error={errors.subject}
            required
          />
          <Select
            label="Offre pressentie (optionnel)"
            value={formData.offerKey}
            onChange={(e) => setFormData({ ...formData, offerKey: e.target.value })}
            error={errors.offerKey}
          >
            <option value="">Sélectionner une offre</option>
            <option value="SECURISATION">Sécurisation - Pack Contrôle EAJE</option>
            <option value="STRUCTURATION">Structuration - Organisation & Pratiques</option>
            <option value="PILOTAGE_QUALITE">Pilotage Qualité - Accompagnement Premium</option>
          </Select>
          <Textarea
            label="Message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            error={errors.message}
            required
          />
          {errors.submit && (
            <p className="text-red-600 text-sm">{errors.submit}</p>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            variant="primary"
            className="w-full shadow-colored-primary"
            size="lg"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
