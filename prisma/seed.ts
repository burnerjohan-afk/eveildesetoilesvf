import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@eveildesetoiles.fr" },
    update: {},
    create: {
      email: "admin@eveildesetoiles.fr",
      passwordHash: await hashPassword("admin123"),
      role: "ADMIN",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // Créer une structure de test
  const structure = await prisma.structure.upsert({
    where: { id: "test-structure-1" },
    update: {},
    create: {
      id: "test-structure-1",
      name: "Crèche Les Petits Loups",
      address: "123 Rue de la Paix, 75001 Paris",
    },
  });
  console.log("✅ Structure créée:", structure.name);

  // Créer un utilisateur client
  const client = await prisma.user.upsert({
    where: { email: "client@test.fr" },
    update: {},
    create: {
      email: "client@test.fr",
      passwordHash: await hashPassword("client123"),
      role: "CLIENT",
      structureId: structure.id,
    },
  });
  console.log("✅ Client créé:", client.email);

  // Activer des modules pour la structure
  const modules = [
    "PACK_CONTROLE",
    "PARCOURS_ENTREE",
    "ECHELLE_QUALITE",
    "CHRONO_MANAGER",
    "SUIVI",
    "DOCUMENTS",
    "MESSAGERIE",
    "PARAMETRES",
  ] as const;

  for (const moduleKey of modules) {
    await prisma.moduleAccess.upsert({
      where: {
        structureId_moduleKey: {
          structureId: structure.id,
          moduleKey,
        },
      },
      update: {},
      create: {
        structureId: structure.id,
        moduleKey,
        isEnabled: true,
      },
    });
  }
  console.log("✅ Modules activés");

  // Créer une offre achetée
  await prisma.offerPurchased.create({
    data: {
      structureId: structure.id,
      offerKey: "PILOTAGE_QUALITE",
      status: "ACTIVE",
      startDate: new Date(),
    },
  });
  console.log("✅ Offre créée");

  // Créer quelques documents de test (fake)
  const fakeDocuments = [
    {
      title: "Document réglementaire - Contrôle EAJE",
      folder: "GENERAL" as const,
      category: "PROVIDED_BY_ADMIN" as const,
      moduleKey: "PACK_CONTROLE" as const,
      fileName: "document-test.pdf",
      mimeType: "application/pdf",
      sizeBytes: 102400,
    },
    {
      title: "Check-list sécurité",
      folder: "DIRECTION" as const,
      category: "PROVIDED_BY_ADMIN" as const,
      moduleKey: "PACK_CONTROLE" as const,
      fileName: "checklist-securite.pdf",
      mimeType: "application/pdf",
      sizeBytes: 51200,
    },
  ];

  for (const doc of fakeDocuments) {
    await prisma.document.create({
      data: {
        structureId: structure.id,
        ...doc,
        fileKey: `fake/${doc.fileName}`,
        uploadedByUserId: admin.id,
      },
    });
  }
  console.log("✅ Documents de test créés");

  // Créer quelques actions
  await prisma.actionItem.create({
    data: {
      structureId: structure.id,
      title: "Mettre à jour les dossiers réglementaires",
      description: "Vérifier et mettre à jour tous les dossiers réglementaires",
      status: "TODO",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Dans 30 jours
    },
  });
  console.log("✅ Actions créées");

  // Créer un compte rendu de RDV
  await prisma.meetingReport.create({
    data: {
      structureId: structure.id,
      meetingDate: new Date(),
      summary:
        "Premier rendez-vous de cadrage. Identification des besoins principaux : sécurisation réglementaire et amélioration de l'organisation interne. Plan d'action défini pour les 3 prochains mois.",
    },
  });
  console.log("✅ Compte rendu créé");

  console.log("🎉 Seed terminé avec succès !");
  console.log("\n📝 Identifiants de test :");
  console.log("Admin: admin@eveildesetoiles.fr / admin123");
  console.log("Client: client@test.fr / client123");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
