import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "Catalogue des matières" };
const M = ["Mathématiques", "Français", "Anglais", "Histoire-Géographie", "Sciences de la Vie et de la Terre", "Sciences physiques"];
export default function Page() {
  return (<PageTexte titre="Catalogue des matières">
    <ul className="grid gap-2 sm:grid-cols-2">{M.map((m) => <li key={m} className="carte px-4 py-3 font-medium">{m}</li>)}</ul>
    <p className="text-sm">La liste exacte des matières et chapitres de chaque classe est alignée sur les programmes officiels du Sénégal et validée avant publication.</p>
  </PageTexte>);
}
