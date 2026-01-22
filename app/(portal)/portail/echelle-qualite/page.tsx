"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Questions simplifiées pour l'exemple
const questions = [
  { id: "q1", text: "La structure dispose-t-elle d'un projet d'établissement formalisé ?" },
  { id: "q2", text: "Les pratiques professionnelles sont-elles documentées ?" },
  { id: "q3", text: "Un système d'évaluation est-il en place ?" },
  { id: "q4", text: "La formation continue est-elle planifiée ?" },
  { id: "q5", text: "Les familles sont-elles impliquées dans la vie de la structure ?" },
];

export default function EchelleQualitePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    // Charger les diagnostics précédents
    fetch("/api/portail/quality-assessments")
      .then((res) => res.json())
      .then((data) => setAssessments(data.assessments || []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/portail/quality-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-8">Échelle Qualité EAJE</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Auto-diagnostic</h2>
          <p className="text-text-light mb-6">
            Répondez aux questions ci-dessous pour évaluer votre structure sur une échelle de 1 à 5.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="border-b border-border pb-4">
                <label className="block font-medium mb-3">{q.text}</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={level}
                        checked={answers[q.id] === level}
                        onChange={(e) =>
                          setAnswers({ ...answers, [q.id]: parseInt(e.target.value) })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="font-semibold">Score moyen: </span>
                <Badge variant="primary">{calculateScore()}/5</Badge>
              </div>
              <Button type="submit" disabled={isSubmitting || Object.keys(answers).length === 0}>
                {isSubmitting ? "Envoi..." : "Valider le diagnostic"}
              </Button>
            </div>
          </form>
        </Card>

        {assessments.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Historique des diagnostics</h2>
            <div className="space-y-3">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="p-3 border border-border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {new Date(assessment.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                    <Badge variant="primary">Niveau {assessment.scoreLevel}/5</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
