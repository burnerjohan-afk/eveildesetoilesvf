export type QuestionType = "select" | "radio";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  section: string;
  scoringMapping: {
    [key: string]: {
      securisation?: number;
      structuration?: number;
      pilotage?: number;
    };
  };
}

export interface DiagnosticSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export const diagnosticSections: DiagnosticSection[] = [
  {
    id: "structure",
    title: "Structure & contexte",
    questions: [
      {
        id: "type_structure",
        text: "Quel type de structure d'accueil ?",
        type: "radio",
        section: "structure",
        options: [
          { value: "micro-creche", label: "Micro-crèche" },
          { value: "multi-accueil", label: "Multi-accueil" },
          { value: "autre", label: "Autre" },
        ],
        scoringMapping: {},
      },
      {
        id: "capacite",
        text: "Quelle est la capacité d'accueil ?",
        type: "radio",
        section: "structure",
        options: [
          { value: "10-12", label: "10-12 places" },
          { value: "13-20", label: "13-20 places" },
          { value: "20+", label: "20+ places" },
        ],
        scoringMapping: {},
      },
      {
        id: "anciennete",
        text: "Depuis combien de temps la structure existe-t-elle ?",
        type: "radio",
        section: "structure",
        options: [
          { value: "<1", label: "Moins de 1 an" },
          { value: "1-3", label: "1 à 3 ans" },
          { value: "3+", label: "Plus de 3 ans" },
        ],
        scoringMapping: {},
      },
      {
        id: "contexte",
        text: "Comment décririez-vous le contexte actuel de votre structure ?",
        type: "radio",
        section: "structure",
        options: [
          { value: "stable", label: "Stable" },
          { value: "tension", label: "En tension" },
          { value: "crise", label: "En crise" },
        ],
        scoringMapping: {
          stable: { securisation: 0, structuration: 0, pilotage: 0 },
          tension: { securisation: 1, structuration: 1, pilotage: 1 },
          crise: { securisation: 2, structuration: 2, pilotage: 2 },
        },
      },
    ],
  },
  {
    id: "reglementaire",
    title: "Réglementaire & sécurité",
    description: "Axe SECURISATION",
    questions: [
      {
        id: "dossiers_reglo",
        text: "Vos dossiers réglementaires sont-ils à jour ?",
        type: "radio",
        section: "reglementaire",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
          { value: "ne-sais-pas", label: "Je ne sais pas" },
        ],
        scoringMapping: {
          oui: { securisation: 0 },
          partiellement: { securisation: 1 },
          non: { securisation: 2 },
          "ne-sais-pas": { securisation: 2 },
        },
      },
      {
        id: "sommaire_officiel",
        text: "Avez-vous le sommaire officiel EAJE ?",
        type: "radio",
        section: "reglementaire",
        options: [
          { value: "oui", label: "Oui" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { securisation: 0 },
          non: { securisation: 2 },
        },
      },
      {
        id: "controle_pmi_sereine",
        text: "Les contrôles PMI se déroulent-ils de manière sereine ?",
        type: "radio",
        section: "reglementaire",
        options: [
          { value: "oui", label: "Oui" },
          { value: "moyennement", label: "Moyennement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { securisation: 0 },
          moyennement: { securisation: 1 },
          non: { securisation: 2 },
        },
      },
    ],
  },
  {
    id: "organisation",
    title: "Organisation & routines",
    description: "Axe STRUCTURATION",
    questions: [
      {
        id: "espaces_optimises",
        text: "Vos espaces sont-ils optimisés pour l'accueil des enfants ?",
        type: "radio",
        section: "organisation",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { structuration: 0 },
          partiellement: { structuration: 1 },
          non: { structuration: 2 },
        },
      },
      {
        id: "routines_fluides",
        text: "Les routines quotidiennes sont-elles fluides et bien organisées ?",
        type: "radio",
        section: "organisation",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { structuration: 0 },
          partiellement: { structuration: 1 },
          non: { structuration: 2 },
        },
      },
      {
        id: "reperes_communs",
        text: "L'équipe partage-t-elle des repères communs sur les pratiques ?",
        type: "radio",
        section: "organisation",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { structuration: 0 },
          partiellement: { structuration: 1 },
          non: { structuration: 2 },
        },
      },
    ],
  },
  {
    id: "pedagogique",
    title: "Projet pédagogique & pratiques",
    description: "Axe STRUCTURATION",
    questions: [
      {
        id: "projet_peda",
        text: "Avez-vous un projet pédagogique ?",
        type: "radio",
        section: "pedagogique",
        options: [
          { value: "oui-utilise", label: "Oui et utilisé" },
          { value: "existe-peu", label: "Existe mais peu utilisé" },
          { value: "a-refaire", label: "À refaire" },
          { value: "n-existe-pas", label: "N'existe pas" },
        ],
        scoringMapping: {
          "oui-utilise": { structuration: 0 },
          "existe-peu": { structuration: 1 },
          "a-refaire": { structuration: 2 },
          "n-existe-pas": { structuration: 2 },
        },
      },
      {
        id: "pratiques_coherentes",
        text: "Les pratiques de l'équipe sont-elles cohérentes avec le projet pédagogique ?",
        type: "radio",
        section: "pedagogique",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { structuration: 0 },
          partiellement: { structuration: 1 },
          non: { structuration: 2 },
        },
      },
      {
        id: "transmissions_cadrees",
        text: "Les transmissions entre équipes sont-elles cadrées et structurées ?",
        type: "radio",
        section: "pedagogique",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { structuration: 0 },
          partiellement: { structuration: 1 },
          non: { structuration: 2 },
        },
      },
    ],
  },
  {
    id: "qualite",
    title: "Qualité & pilotage",
    description: "Axe PILOTAGE_QUALITE",
    questions: [
      {
        id: "methode_eval_qualite",
        text: "Avez-vous une méthode d'évaluation de la qualité ?",
        type: "radio",
        section: "qualite",
        options: [
          { value: "oui", label: "Oui" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { pilotage: 0 },
          non: { pilotage: 2 },
        },
      },
      {
        id: "plan_action_formalise",
        text: "Avez-vous un plan d'actions formalisé pour améliorer la qualité ?",
        type: "radio",
        section: "qualite",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { pilotage: 0 },
          partiellement: { pilotage: 1 },
          non: { pilotage: 2 },
        },
      },
      {
        id: "suivi_ameliorations",
        text: "Faites-vous un suivi régulier des améliorations mises en place ?",
        type: "radio",
        section: "qualite",
        options: [
          { value: "oui", label: "Oui" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { pilotage: 0 },
          non: { pilotage: 2 },
        },
      },
    ],
  },
  {
    id: "rh",
    title: "RH & cohésion",
    description: "Axe STRUCTURATION + PILOTAGE_QUALITE",
    questions: [
      {
        id: "cohesion",
        text: "Comment évalueriez-vous la cohésion de votre équipe ?",
        type: "radio",
        section: "rh",
        options: [
          { value: "bon", label: "Bonne" },
          { value: "moyen", label: "Moyenne" },
          { value: "faible", label: "Faible" },
        ],
        scoringMapping: {
          bon: { structuration: 0, pilotage: 0 },
          moyen: { structuration: 1, pilotage: 1 },
          faible: { structuration: 2, pilotage: 2 },
        },
      },
      {
        id: "turnover",
        text: "Quel est le taux de turnover dans votre équipe ?",
        type: "radio",
        section: "rh",
        options: [
          { value: "faible", label: "Faible" },
          { value: "moyen", label: "Moyen" },
          { value: "eleve", label: "Élevé" },
        ],
        scoringMapping: {
          faible: { structuration: 0, pilotage: 0 },
          moyen: { structuration: 1, pilotage: 1 },
          eleve: { structuration: 2, pilotage: 2 },
        },
      },
      {
        id: "tensions",
        text: "Y a-t-il des tensions au sein de l'équipe ?",
        type: "radio",
        section: "rh",
        options: [
          { value: "non", label: "Non" },
          { value: "parfois", label: "Parfois" },
          { value: "souvent", label: "Souvent" },
        ],
        scoringMapping: {
          non: { structuration: 0, pilotage: 0 },
          parfois: { structuration: 1, pilotage: 1 },
          souvent: { structuration: 2, pilotage: 2 },
        },
      },
    ],
  },
  {
    id: "documents",
    title: "Documents & traçabilité",
    description: "Axe SECURISATION + PILOTAGE_QUALITE",
    questions: [
      {
        id: "docs_centralises",
        text: "Vos documents sont-ils centralisés et organisés ?",
        type: "radio",
        section: "documents",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { securisation: 0, pilotage: 0 },
          partiellement: { securisation: 1, pilotage: 1 },
          non: { securisation: 2, pilotage: 2 },
        },
      },
      {
        id: "comptes_rendus_traces",
        text: "Les comptes-rendus et suivis sont-ils tracés et accessibles ?",
        type: "radio",
        section: "documents",
        options: [
          { value: "oui", label: "Oui" },
          { value: "partiellement", label: "Partiellement" },
          { value: "non", label: "Non" },
        ],
        scoringMapping: {
          oui: { securisation: 0, pilotage: 0 },
          partiellement: { securisation: 1, pilotage: 1 },
          non: { securisation: 2, pilotage: 2 },
        },
      },
    ],
  },
  {
    id: "priorite",
    title: "Priorité ressentie",
    description: "Informe le texte résultat",
    questions: [
      {
        id: "urgence",
        text: "Quelle est votre priorité principale actuellement ?",
        type: "radio",
        section: "priorite",
        options: [
          { value: "controle", label: "Contrôle" },
          { value: "securite", label: "Sécurité" },
          { value: "organisation", label: "Organisation" },
          { value: "pratiques", label: "Pratiques" },
          { value: "qualite", label: "Qualité" },
          { value: "equipe", label: "Équipe" },
          { value: "autre", label: "Autre" },
        ],
        scoringMapping: {},
      },
      {
        id: "objectif_3_mois",
        text: "Quel est votre objectif principal pour les 3 prochains mois ?",
        type: "radio",
        section: "priorite",
        options: [
          { value: "serenite", label: "Sérénité" },
          { value: "conformite", label: "Conformité" },
          { value: "cohesion", label: "Cohésion" },
          { value: "projet-peda", label: "Projet pédagogique" },
          { value: "qualite", label: "Qualité" },
          { value: "autre", label: "Autre" },
        ],
        scoringMapping: {},
      },
    ],
  },
];

// Mapping des axes vers les offres
export const axisToOffer: Record<string, { title: string; slug: string; description: string }> = {
  SECURISATION: {
    title: "Pack Contrôle EAJE",
    slug: "controle-eaje",
    description: "Conformité réglementaire, dossiers à jour, check-lists et outils pratiques",
  },
  STRUCTURATION: {
    title: "Structuration",
    slug: "organisation-pratiques",
    description: "Parcours Entrée Enfant & Famille + Structuration des pratiques",
  },
  PILOTAGE_QUALITE: {
    title: "Échelle Qualité EAJE",
    slug: "accompagnement-premium",
    description: "Échelle Qualité EAJE (1→5) + Suivi & accompagnement",
  },
};

// Fonction pour calculer les scores
export function calculateScores(answers: Record<string, string>): {
  securisation: number;
  structuration: number;
  pilotage: number;
} {
  let securisation = 0;
  let structuration = 0;
  let pilotage = 0;

  diagnosticSections.forEach((section) => {
    section.questions.forEach((question) => {
      const answer = answers[question.id];
      if (!answer) return;

      const mapping = question.scoringMapping[answer];
      if (!mapping) return;

      // Questions RH (Q17-19) : 70% STRUCTURATION, 30% PILOTAGE_QUALITE
      if (question.section === "rh") {
        if (mapping.structuration !== undefined) {
          structuration += Math.round(mapping.structuration * 0.7);
          pilotage += Math.round(mapping.pilotage !== undefined ? mapping.pilotage * 0.3 : mapping.structuration * 0.3);
        }
      }
      // Q20 (docs_centralises) : 70% SECURISATION, 30% PILOTAGE_QUALITE
      else if (question.id === "docs_centralises") {
        if (mapping.securisation !== undefined) {
          securisation += Math.round(mapping.securisation * 0.7);
          pilotage += Math.round(mapping.pilotage !== undefined ? mapping.pilotage * 0.3 : mapping.securisation * 0.3);
        }
      }
      // Q21 (comptes_rendus_traces) : 30% SECURISATION, 70% PILOTAGE_QUALITE
      else if (question.id === "comptes_rendus_traces") {
        if (mapping.securisation !== undefined) {
          securisation += Math.round(mapping.securisation * 0.3);
          pilotage += Math.round(mapping.pilotage !== undefined ? mapping.pilotage * 0.7 : mapping.securisation * 0.7);
        }
      }
      // Questions normales
      else {
        if (mapping.securisation !== undefined) securisation += mapping.securisation;
        if (mapping.structuration !== undefined) structuration += mapping.structuration;
        if (mapping.pilotage !== undefined) pilotage += mapping.pilotage;
      }
    });
  });

  return { securisation, structuration, pilotage };
}

// Fonction pour déterminer les axes prioritaires
export function determineAxes(scores: { securisation: number; structuration: number; pilotage: number }): {
  primary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
  secondary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
  tertiary: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE";
} {
  const scoreMap: Array<{ axis: "SECURISATION" | "STRUCTURATION" | "PILOTAGE_QUALITE"; score: number }> = [
    { axis: "SECURISATION", score: scores.securisation },
    { axis: "STRUCTURATION", score: scores.structuration },
    { axis: "PILOTAGE_QUALITE", score: scores.pilotage },
  ];
  
  const sorted = scoreMap.sort((a, b) => b.score - a.score);
  
  return {
    primary: sorted[0].axis,
    secondary: sorted[1].axis,
    tertiary: sorted[2].axis,
  };
}
