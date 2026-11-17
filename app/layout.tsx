import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MARQUE } from "@/lib/marque";

export const metadata: Metadata = {
  title: { default: `${MARQUE.nom} — Bibliothèque scolaire numérique`, template: `%s | ${MARQUE.nom}` },
  description: "Cours, fiches, exercices, corrigés et évaluations pour les élèves du Sénégal, de la 6e à la Seconde.",
};
export const viewport: Viewport = { themeColor: "#102D50", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body>{children}</body></html>);
}
