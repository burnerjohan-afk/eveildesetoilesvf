"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { diagnosticSections } from "@/content/diagnostic";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = diagnosticSections.reduce((acc, section) => acc + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  const currentSectionData = diagnosticSections[currentSection];
  const isLastSection = currentSection === diagnosticSections.length - 1;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSection < diagnosticSections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isCurrentSectionComplete = () => {
    return currentSectionData.questions.every((q) => answers[q.id]);
  };

  const handleSubmit = async () => {
    if (!isCurrentSectionComplete()) {
      alert("Veuillez répondre à toutes les questions de cette section avant de continuer.");
      return;
    }

    // Vérifier que toutes les questions sont répondues
    const allQuestions = diagnosticSections.flatMap((section) => section.questions);
    const unansweredQuestions = allQuestions.filter((q) => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      alert(`Veuillez répondre à toutes les questions avant de soumettre. Il reste ${unansweredQuestions.length} question(s) sans réponse.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/diagnostic/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur lors de la soumission");
      }

      const data = await response.json();
      router.push(`/diagnostic/resultat/${data.id}`);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert(error.message || "Une erreur est survenue. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Diagnostic EAJE</h1>
          <p className="text-lg text-text-light">
            Répondez à quelques questions pour obtenir un diagnostic personnalisé et des recommandations adaptées à votre structure.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text">
              Section {currentSection + 1} sur {diagnosticSections.length}
            </span>
            <span className="text-sm text-text-light">
              {answeredQuestions} / {totalQuestions} questions
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section Card */}
        <Card className="mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text mb-2">{currentSectionData.title}</h2>
            {currentSectionData.description && (
              <p className="text-text-light">{currentSectionData.description}</p>
            )}
          </div>

          <div className="space-y-6">
            {currentSectionData.questions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-semibold text-text mb-3">
                  {question.text}
                </label>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[question.id] === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => handleAnswer(question.id, option.value)}
                        className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-text">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
          >
            ← Précédent
          </Button>

          {isLastSection ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isCurrentSectionComplete() || isSubmitting}
              className="shadow-colored-primary"
            >
              {isSubmitting ? "Traitement..." : "Voir mon diagnostic"}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isCurrentSectionComplete()}
              className="shadow-colored-primary"
            >
              Suivant →
            </Button>
          )}
        </div>

        {/* Info */}
        <p className="text-center text-sm text-text-light mt-6">
          ⏱️ Temps estimé : 8-10 minutes
        </p>
      </div>
    </div>
  );
}
