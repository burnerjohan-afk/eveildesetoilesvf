import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { diagnosticSubmitSchema } from "@/lib/validators";
import {
  calculateScores,
  determineAxes,
  axisToOffer,
  diagnosticSections,
} from "@/content/diagnostic";

// Fonction pour générer le plan d'action
function generateActionPlan(
  primary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE",
  secondary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE",
  tertiary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE"
) {
  const offers = {
    SECURISATION: {
      title: "Pack Contrôle EAJE",
      objective: "Sécuriser votre structure avec une conformité réglementaire complète et des dossiers à jour.",
      benefits: [
        "Conformité réglementaire garantie",
        "Dossiers réglementaires à jour et organisés",
        "Sérénité lors des contrôles PMI",
      ],
    },
    STRUCTURATION: {
      title: "Structuration",
      objective: "Structurer vos pratiques et optimiser l'organisation de votre établissement.",
      benefits: [
        "Organisation optimale des espaces et routines",
        "Projet pédagogique cohérent et vivant",
        "Transmissions structurées entre équipes",
      ],
    },
    PILOTAGE_QUALITE: {
      title: "Échelle Qualité EAJE",
      objective: "Piloter la qualité de votre accueil avec des outils d'évaluation et d'amélioration continue.",
      benefits: [
        "Évaluation de la qualité avec l'échelle EAJE",
        "Plan d'actions personnalisé et mesurable",
        "Suivi régulier des améliorations",
      ],
    },
  };

  return [
    {
      step: 1,
      axis: primary,
      offer: axisToOffer[primary],
      ...offers[primary],
    },
    {
      step: 2,
      axis: secondary,
      offer: axisToOffer[secondary],
      ...offers[secondary],
    },
    {
      step: 3,
      axis: tertiary,
      offer: axisToOffer[tertiary],
      ...offers[tertiary],
    },
  ];
}

// Fonction pour générer la synthèse
function generateSummary(
  scores: { securisation: number; structuration: number; pilotage: number },
  primary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE",
  urgence?: string,
  objectif?: string
): string {
  const totalScore = scores.securisation + scores.structuration + scores.pilotage;
  const maxPossibleScore = 46; // Approximatif basé sur le nombre de questions
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  let summary = "";

  if (percentage >= 60) {
    summary = "Votre structure présente des points d'attention importants qui nécessitent un accompagnement ciblé. ";
  } else if (percentage >= 40) {
    summary = "Votre structure a des bases solides mais certains axes méritent d'être renforcés. ";
  } else {
    summary = "Votre structure est globalement bien structurée, avec des opportunités d'amélioration ciblées. ";
  }

  if (urgence && urgence !== "autre") {
    const urgenceMap: Record<string, string> = {
      controle: "Votre priorité sur les contrôles",
      securite: "Votre besoin de sécurisation",
      organisation: "Votre besoin d'organisation",
      pratiques: "Votre besoin de structuration des pratiques",
      qualite: "Votre objectif de qualité",
      equipe: "Votre besoin de cohésion d'équipe",
    };
    summary += urgenceMap[urgence] || "";
  }

  summary += `Notre recommandation prioritaire est de commencer par ${axisToOffer[primary].title.toLowerCase()}, qui répondra à vos besoins les plus pressants. `;
  summary += "Un accompagnement personnalisé vous permettra d'atteindre vos objectifs de manière structurée et mesurable.";

  return summary;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Nettoyer les réponses (s'assurer que toutes sont des strings)
    const cleanedAnswers: Record<string, string> = {};
    if (body.answers && typeof body.answers === "object") {
      Object.entries(body.answers).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          cleanedAnswers[key] = String(value);
        }
      });
    }
    
    // Nettoyer les champs optionnels (email vide = undefined)
    const cleanedBody: any = {
      answers: cleanedAnswers,
    };
    if (body.structureName && body.structureName.trim()) {
      cleanedBody.structureName = body.structureName.trim();
    }
    if (body.contactName && body.contactName.trim()) {
      cleanedBody.contactName = body.contactName.trim();
    }
    if (body.email && body.email.trim()) {
      cleanedBody.email = body.email.trim();
    }
    if (body.phone && body.phone.trim()) {
      cleanedBody.phone = body.phone.trim();
    }
    
    // Log en DEV pour debug
    if (process.env.NODE_ENV === "development") {
      console.log("Données reçues:", {
        answersCount: Object.keys(cleanedAnswers).length,
        hasEmail: !!cleanedBody.email,
        hasStructureName: !!cleanedBody.structureName,
      });
    }
    
    const validated = diagnosticSubmitSchema.parse(cleanedBody);

    // Calculer les scores
    const scores = calculateScores(validated.answers);
    const axes = determineAxes(scores);

    // Générer le plan d'action
    const actionPlan = generateActionPlan(axes.primary, axes.secondary, axes.tertiary);

    // Générer la synthèse
    const meta = validated.answers;
    const summary = generateSummary(
      scores,
      axes.primary,
      validated.answers.urgence,
      validated.answers.objectif_3_mois
    );

    // Créer ou mettre à jour le lead si email fourni
    let leadId: string | null = null;
    if (validated.email && validated.structureName) {
      const lead = await prisma.lead.upsert({
        where: { email: validated.email },
        update: {
          structureName: validated.structureName,
          contactName: validated.contactName || null,
          phone: validated.phone || null,
          source: "diagnostic",
          updatedAt: new Date(),
        },
        create: {
          structureName: validated.structureName,
          contactName: validated.contactName || null,
          email: validated.email,
          phone: validated.phone || null,
          source: "diagnostic",
          status: "NEW",
        },
      });
      leadId = lead.id;
    }

    // Créer la submission (stringifier les objets JSON pour SQLite)
    const submission = await prisma.diagnosticSubmission.create({
      data: {
        leadId: leadId,
        answers: JSON.stringify(validated.answers),
        scores: JSON.stringify(scores),
        primaryAxis: axes.primary as any,
        secondaryAxis: axes.secondary as any,
        tertiaryAxis: axes.tertiary as any,
        recommendation: JSON.stringify({
          offer: axisToOffer[axes.primary],
          summary: summary,
          actionPlan: actionPlan,
        }),
        meta: JSON.stringify({
          type_structure: validated.answers.type_structure,
          capacite: validated.answers.capacite,
          anciennete: validated.answers.anciennete,
          contexte: validated.answers.contexte,
          urgence: validated.answers.urgence,
          objectif_3_mois: validated.answers.objectif_3_mois,
        }),
      },
    });

    // En DEV : log pour vérification
    if (process.env.NODE_ENV === "development") {
      console.log("Diagnostic soumis:", {
        id: submission.id,
        scores,
        axes,
        leadId,
      });
    }

    // Parser la recommendation depuis la string JSON
    const recommendation = JSON.parse(submission.recommendation);
    
    return NextResponse.json(
      {
        id: submission.id,
        scores,
        axes,
        recommendation: recommendation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la soumission du diagnostic:", error);
    
    // Si c'est une erreur Zod, retourner les détails
    if (error.name === "ZodError") {
      return NextResponse.json(
        { 
          error: "Erreur de validation",
          details: error.errors,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Erreur lors de la soumission" },
      { status: 400 }
    );
  }
}
