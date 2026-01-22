"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { resetPasswordRequestSchema } from "@/lib/validators";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const validated = resetPasswordRequestSchema.parse({ email });

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la demande");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-text mb-4">Email envoyé</h1>
          <p className="text-text-light mb-6">
            Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.
          </p>
          <a href="/login">
            <Button>Retour à la connexion</Button>
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-text mb-2 text-center">
          Mot de passe oublié
        </h1>
        <p className="text-text-light mb-6 text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Envoi..." : "Envoyer le lien"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-primary hover:underline">
            Retour à la connexion
          </a>
        </div>
      </Card>
    </div>
  );
}
