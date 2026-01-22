"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Gestion des cookies</h3>
              <p className="text-sm text-text-light">
                Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement du site.
                Aucun cookie de tracking ou de publicité n'est utilisé. En continuant à naviguer, vous acceptez
                l'utilisation de ces cookies techniques.
              </p>
              <p className="text-xs text-text-light mt-2">
                <a href="/politique-confidentialite" className="text-primary hover:underline">
                  En savoir plus sur notre politique de confidentialité
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={handleDecline}>
                Refuser
              </Button>
              <Button size="sm" onClick={handleAccept}>
                Accepter
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
