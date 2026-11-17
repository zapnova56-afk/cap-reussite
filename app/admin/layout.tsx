import Link from "next/link";
import { exigerAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await exigerAdmin();
  return (<div className="min-h-screen bg-nuage">
    <header className="bg-marine text-white"><div className="conteneur flex h-14 items-center gap-6 text-sm">
      <span className="font-extrabold">ADMIN <span className="text-soleil">CAP RÉUSSITE</span></span>
      <Link href="/admin">Tableau de bord</Link><Link href="/admin/documents">Documents</Link><Link href="/admin/offres">Offres</Link><Link href="/admin/eleves">Élèves</Link><Link href="/eleve" className="ml-auto">Vue élève</Link></div></header>
    <main className="conteneur py-8">{children}</main></div>);
}
