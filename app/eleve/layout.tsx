import Link from "next/link";
import { deconnecter } from "../(auth)/actions";
export default function EleveLayout({ children }: { children: React.ReactNode }) {
  return (<div className="min-h-screen bg-nuage">
    <header className="bg-marine text-white"><div className="conteneur flex h-14 items-center justify-between">
      <Link href="/eleve" className="font-extrabold">CAP <span className="text-turquoise">RÉUSSITE</span></Link>
      <form action={deconnecter}><button className="text-sm underline">Déconnexion</button></form></div></header>
    <main className="conteneur py-8">{children}</main></div>);
}
