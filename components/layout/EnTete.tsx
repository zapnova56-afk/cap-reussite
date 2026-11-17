import Link from "next/link";
import { MARQUE } from "@/lib/marque";

const LIENS = [
  { href: "/classes", t: "Nos classes" }, { href: "/matieres", t: "Matières" },
  { href: "/tarifs", t: "Tarifs" }, { href: "/faq", t: "FAQ" }, { href: "/contact", t: "Contact" },
];

export default function EnTete() {
  return (
    <header className="sticky top-0 z-40 border-b border-marine/10 bg-white/95 backdrop-blur">
      <div className="tricolore h-1" aria-hidden="true" />
      <div className="conteneur flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-extrabold text-marine">
          CAP <span className="text-turquoise">RÉUSSITE</span><span className="sr-only"> — {MARQUE.slogan}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex" aria-label="Navigation principale">
          {LIENS.map((l) => <Link key={l.href} href={l.href} className="hover:text-turquoise">{l.t}</Link>)}
          <Link href="/connexion" className="hover:text-turquoise">Connexion</Link>
          <Link href="/inscription" className="btn btn-primaire !py-2">S'inscrire</Link>
        </nav>
        {/* Menu mobile sans JavaScript : léger et fiable sur connexion lente */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg bg-nuage px-3 py-2 text-sm font-semibold">Menu</summary>
          <div className="carte absolute right-0 mt-2 flex w-56 flex-col gap-1 p-3 text-sm font-medium">
            {LIENS.map((l) => <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 hover:bg-nuage">{l.t}</Link>)}
            <Link href="/connexion" className="rounded-lg px-3 py-2 hover:bg-nuage">Connexion</Link>
            <Link href="/inscription" className="btn btn-primaire mt-1">S'inscrire</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
