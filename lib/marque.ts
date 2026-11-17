// Source unique de l'identité de marque et des données de référence.
export const MARQUE = {
  nom: "CAP RÉUSSITE",
  slogan: "Apprendre. Comprendre. S'entraîner. Réussir.",
  couleurs: { marine: "#102D50", turquoise: "#12A6A0", soleil: "#F5B83D", blanc: "#FFFFFF", nuage: "#F2F5F9" },
} as const;

export const NIVEAUX = [
  { slug: "6e", nom: "6e", libelle: "Espace 6e" },
  { slug: "5e", nom: "5e", libelle: "Espace 5e" },
  { slug: "4e", nom: "4e", libelle: "Espace 4e" },
  { slug: "3e", nom: "3e", libelle: "Espace 3e" },
  { slug: "seconde", nom: "Seconde", libelle: "Espace Seconde" },
] as const;

export const TYPES_RESSOURCE = [
  "cours", "fiche_revision", "resume", "definitions", "exemples",
  "exercices_application", "exercices_approfondissement", "corrige",
  "evaluation", "sujet_entrainement", "quiz",
] as const;

// Tarifs PAR DÉFAUT uniquement : la vérité est en base (table "offres"), modifiable par l'admin.
export const OFFRES_PAR_DEFAUT = [
  { code: "decouverte", nom: "Découverte", prixFcfa: 1000 },
  { code: "essentiel", nom: "Essentiel", prixFcfa: 3000 },
  { code: "premium", nom: "Premium", prixFcfa: 5000 },
  { code: "integrale", nom: "Intégrale", prixFcfa: 12000 },
] as const;
