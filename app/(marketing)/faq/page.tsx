"use client";

import { faqContent } from "@/content/faq";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-text mb-8 text-center">
        Questions fréquentes
      </h1>
      <p className="text-lg text-text-light mb-12 text-center max-w-2xl mx-auto">
        Retrouvez les réponses aux questions les plus courantes sur l'accompagnement et les services proposés.
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqContent.map((item, index) => (
          <Card key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left flex items-center justify-between"
            >
              <h2 className="text-lg font-semibold text-text pr-4">{item.question}</h2>
              <span className="text-2xl text-primary flex-shrink-0">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="mt-4 pt-4 border-t border-border text-text-light">
                {item.answer}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-text-light mb-4">
          Vous avez d'autres questions ?
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Contactez-moi
        </a>
      </div>
    </div>
  );
}
