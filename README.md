# Éveil des Étoiles - Portail B2B

Site vitrine + espace client par structure + administration pour "Éveil des Étoiles" (Laetitia CHIN - Formatrice petite enfance / EJE / Consultante EAJE).

## 🚀 Technologies

- **Next.js 14+** (App Router)
- **TypeScript** (strict)
- **TailwindCSS** (avec charte graphique personnalisée)
- **PostgreSQL** (via Prisma)
- **Prisma** (ORM)
- **bcryptjs** (hashage mots de passe)
- **Zod** (validation)

## 📋 Prérequis

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔧 Installation

1. **Cloner le projet** (ou télécharger les fichiers)

2. **Installer les dépendances** :
```bash
npm install
```

3. **Configurer la base de données** :
   - Créer une base PostgreSQL
   - Copier `.env.example` vers `.env` (ou créer `.env`)
   - Remplir `DATABASE_URL` :
```
DATABASE_URL="postgresql://user:password@localhost:5432/eveil_etoiles?schema=public"
```

4. **Configurer les variables d'environnement** :
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/eveil_etoiles?schema=public"

# Auth
SESSION_SECRET="change-me-in-production-min-32-chars-random-string"

# Email (Production - Resend)
RESEND_API_KEY=""
FROM_EMAIL="contact@eveildesetoiles.fr"

# Storage (Production - S3)
S3_ENDPOINT=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_BUCKET_NAME=""
S3_REGION="us-east-1"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Social Media (optionnel)
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/in/votre-profil"
NEXT_PUBLIC_INSTAGRAM_URL="https://www.instagram.com/votre-compte"
NEXT_PUBLIC_FACEBOOK_URL="https://www.facebook.com/votre-page"

# Calendly (optionnel - pour prise de rendez-vous)
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/votre-compte/rendez-vous"

# Stripe (Production - pour paiements)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

5. **Initialiser la base de données** :
```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# (Ou utiliser les migrations)
npm run db:migrate

# Remplir avec des données de test
npm run db:seed
```

6. **Lancer le serveur de développement** :
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 👤 Identifiants de test (après seed)

- **Admin** : `admin@eveildesetoiles.fr` / `admin123`
- **Client** : `client@test.fr` / `client123`

## 📁 Structure du projet

```
/app
  /(marketing)          # Pages publiques (accueil, offres, FAQ, contact)
  /(auth)               # Pages d'authentification (login, reset password)
  /(admin)              # Administration
  /(portal)              # Espace client
/components
  /ui                   # Composants UI réutilisables
  /marketing            # Composants marketing
  /portal               # Composants portail
  /admin                # Composants admin
/content                # Contenus éditables (marketing, offres, FAQ)
/lib
  auth.ts               # Authentification (sessions, hash)
  access.ts             # Contrôle d'accès
  storage/              # Stockage fichiers (local + S3)
  seo.ts                # SEO helpers
  validators.ts         # Validation Zod
/prisma
  schema.prisma         # Schéma de base de données
  seed.ts               # Données de test
```

## 🎨 Charte graphique

- **Vert principal** : `#98CF9F`
- **Orange secondaire** : `#F3B36A`
- **Jaune accent** : `#F6D24A`
- **Fond** : `#FAFAF8`
- **Texte** : `#333333`
- **Bordures** : `#E5E5E5`

## 🔐 Authentification

- Email + mot de passe (hash bcrypt)
- Sessions via cookies httpOnly
- Reset password (DEV: console.log, PROD: Resend)

## 📦 Stockage fichiers

- **DEV** : Stockage local dans `/uploads`
- **PROD** : S3-compatible (si variables `S3_*` configurées)

⚠️ **Important** : Sur Vercel, le stockage local est éphémère. Il est **fortement recommandé** d'utiliser S3 en production.

## 🛠️ Commandes disponibles

```bash
# Développement
npm run dev

# Build production
npm run build
npm start

# Base de données
npm run db:generate    # Générer le client Prisma
npm run db:push        # Pousser le schéma vers la DB
npm run db:migrate     # Créer une migration
npm run db:seed        # Remplir avec des données de test
npm run db:studio      # Ouvrir Prisma Studio
```

## 📝 Fonctionnalités principales

### Site vitrine
- ✅ Accueil
- ✅ Mon accompagnement
- ✅ Offres & Tarifs
- ✅ Grille comparative
- ✅ FAQ (12 questions/réponses)
- ✅ Contact / Demande de devis
- ✅ Mentions légales
- ✅ Politique de confidentialité

### Espace client (par structure)
- ✅ Tableau de bord
- ✅ Pack Contrôle EAJE
- ✅ Parcours Entrée Enfant & Famille
- ✅ Échelle Qualité EAJE
- ✅ Chrono-Manager EAJE
- ✅ Suivi & Accompagnement
- ✅ Documents & Archives
- ✅ Messagerie
- ✅ Paramètres

### Administration
- ✅ Dashboard
- ✅ Gestion des structures
- ✅ Gestion des utilisateurs
- ✅ Gestion des offres et modules
- ✅ Gestion des documents
- ✅ Suivi global
- ✅ Gestion du contenu (à venir)

## 🔒 Sécurité

- Contrôle strict : un client ne peut accéder qu'à sa propre structure
- Middleware protège `/admin/*` et `/portail/*`
- Validation Zod sur toutes les APIs
- Upload limité (15MB) + types autorisés (PDF, DOCX, PNG, JPG)
- RGPD : pages légales + minimisation des données

## 📧 Emails

- **DEV** : Les emails sont loggés dans la console
- **PROD** : Utilise Resend (si `RESEND_API_KEY` configuré)

## 🚀 Déploiement

### Vercel (recommandé)

1. Connecter le repo GitHub
2. Configurer les variables d'environnement
3. Configurer PostgreSQL (Vercel Postgres ou externe)
4. Configurer S3 pour le stockage fichiers (obligatoire sur Vercel)
5. Déployer

### Variables d'environnement requises en production

- `DATABASE_URL`
- `SESSION_SECRET` (générer une chaîne aléatoire de 32+ caractères)
- `RESEND_API_KEY` (pour les emails)
- `S3_*` (pour le stockage fichiers)
- `NEXT_PUBLIC_APP_URL` (URL du site en production)

## 📚 Documentation supplémentaire

### Créer une structure + accès

1. Se connecter en admin
2. Aller dans "Structures" → "Créer une structure"
3. Remplir les informations
4. Créer un utilisateur client associé à la structure
5. Activer les modules souhaités dans "Offres"

### Déposer des documents

1. Se connecter en admin
2. Aller dans "Documents"
3. Utiliser l'interface de dépôt (à implémenter) ou directement via Prisma/DB

### Tester le reset password

1. Aller sur `/forgot-password`
2. Entrer un email existant
3. En DEV, vérifier la console pour le lien de reset

### Tester le diagnostic EAJE

1. Aller sur `/diagnostic`
2. Répondre aux questions (8 sections, ~23 questions)
3. À la fin, vous serez redirigé vers `/diagnostic/resultat/[id]`
4. Vérifier l'affichage :
   - Synthèse personnalisée
   - Scores par axe (barres)
   - Recommandation principale
   - Plan d'action en 3 étapes
5. Optionnel : remplir le formulaire "Recevoir mon plan par email"
6. En DEV, vérifier la console pour les logs de soumission
7. Vérifier en base : table `DiagnosticSubmission` et `Lead` (si email fourni)

**Note** : Avant de tester, exécuter la migration Prisma :
```bash
npm run db:migrate
```
4. Cliquer sur le lien et définir un nouveau mot de passe

## 🐛 Dépannage

### Erreur de connexion à la DB
- Vérifier que PostgreSQL est démarré
- Vérifier `DATABASE_URL` dans `.env`

### Erreur "Module not found"
- Exécuter `npm install`
- Vérifier que tous les packages sont installés

### Erreur Prisma
- Exécuter `npm run db:generate`
- Vérifier que le schéma est à jour

## 📄 Licence

Propriétaire - Éveil des Étoiles (Laetitia CHIN)

## 👥 Support

Pour toute question technique, contactez le développeur.

---

**Note** : Ce projet est conçu pour être simple, fiable et évolutif, sans "usine à gaz". Les fonctionnalités sont implémentées de manière pragmatique avec des fallbacks pour le développement.
