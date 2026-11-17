import Link from "next/link";
import { MARQUE } from "@/lib/marque";

export default function PiedDePage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <>
      <footer className="border-t border-marine/10 bg-nuage text-marine/80">
        <div className="conteneur grid gap-8 py-12 sm:grid-cols-3">
          <div><p className="text-lg font-extrabold text-marine">CAP <span className="text-turquoise">RÉUSSITE</span></p>
            <p className="mt-2 text-sm">{MARQUE.slogan}</p></div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/presentation">Présentation</Link><Link href="/ressources">Ressources</Link>
            <Link href="/tarifs">Tarifs</Link><Link href="/faq">FAQ</Link></div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/cgu">Conditions d'utilisation</Link><Link href="/confidentialite">Confidentialité</Link>
            <Link href="/contact">Contact</Link></div>
        </div>
        <p className="border-t border-marine/10 py-4 text-center text-xs">© {new Date().getFullYear()} CAP RÉUSSITE. Tous droits réservés.</p>
      </footer>
      {wa && !wa.includes("X") && (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
           className="fixed bottom-4 right-4 z-50 rounded-full bg-turquoise px-5 py-3 text-sm font-semibold text-white shadow-carte hover:bg-turquoise-700">
          WhatsApp
        </a>
      )}
    </>
  );
}
