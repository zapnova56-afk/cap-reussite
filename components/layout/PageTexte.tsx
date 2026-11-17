export default function PageTexte({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (<section className="conteneur max-w-3xl py-14"><h1 className="text-3xl sm:text-4xl">{titre}</h1>
    <div className="mt-6 space-y-4 leading-relaxed text-marine/85">{children}</div></section>);
}
