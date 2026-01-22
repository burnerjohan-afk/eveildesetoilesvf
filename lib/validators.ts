import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token requis"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const contactSchema = z.object({
  structureName: z.string().min(1, "Le nom de la structure est requis"),
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(1, "L'objet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  offerKey: z.enum(["SECURISATION", "STRUCTURATION", "PILOTAGE_QUALITE"]).optional(),
});

export const createStructureSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  address: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  structureId: z.string().optional(),
  role: z.enum(["ADMIN", "CLIENT"]),
});

export const uploadDocumentSchema = z.object({
  structureId: z.string(),
  moduleKey: z.enum([
    "PACK_CONTROLE",
    "PARCOURS_ENTREE",
    "ECHELLE_QUALITE",
    "CHRONO_MANAGER",
    "SUIVI",
    "DOCUMENTS",
    "MESSAGERIE",
    "PARAMETRES",
  ]).optional(),
  folder: z.enum(["FAMILLES", "EQUIPE", "DIRECTION", "ARCHIVES", "GENERAL"]),
  title: z.string().min(1, "Le titre est requis"),
  category: z.enum([
    "PROVIDED_BY_CLIENT",
    "PROVIDED_BY_ADMIN",
    "ATTESTATION",
    "OPCO",
    "COMPTE_RENDU",
    "OTHER",
  ]),
});

export const createActionItemSchema = z.object({
  structureId: z.string(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
});

export const createMeetingReportSchema = z.object({
  structureId: z.string(),
  meetingDate: z.string(),
  summary: z.string().min(1, "Le résumé est requis"),
});

export const qualityAssessmentSchema = z.object({
  structureId: z.string(),
  answers: z.record(z.any()),
});

export const diagnosticSubmitSchema = z.object({
  answers: z.record(z.string()).refine(
    (answers) => Object.keys(answers).length > 0,
    { message: "Au moins une réponse est requise" }
  ),
  structureName: z.string().optional(),
  contactName: z.string().optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  phone: z.string().optional(),
});

export const diagnosticLeadSchema = z.object({
  structureName: z.string().min(1, "Le nom de la structure est requis"),
  contactName: z.string().optional(),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
});
