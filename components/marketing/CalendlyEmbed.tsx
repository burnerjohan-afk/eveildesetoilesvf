"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url?: string;
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  if (!calendlyUrl) {
    return (
      <div className="p-8 text-center border border-border rounded-lg">
        <p className="text-text-light">
          Calendly n'est pas configuré. Veuillez configurer NEXT_PUBLIC_CALENDLY_URL.
        </p>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget"
      data-url={calendlyUrl}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
