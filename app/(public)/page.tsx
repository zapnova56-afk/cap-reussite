import Link from "next/link";
import "./accueil.css";
import Animations from "@/components/home/Animations";

export default function Accueil() {
  return (
    <div className="acc">
      <Animations />
<svg width="0" height="0" style={{"position":"absolute"} as React.CSSProperties} aria-hidden="true"><defs>
<symbol id="fille" viewBox="0 0 120 170">
<path d="M14 170c0-36 20-56 46-56s46 20 46 56z" fill="var(--sh)"/><rect x="51" y="88" width="18" height="30" rx="9" fill="var(--sk)"/>
<path d="M33 70c-9 10-11 28-6 44M87 70c9 10 11 28 6 44" stroke="var(--hr)" strokeWidth="10" fill="none" strokeLinecap="round"/>
<circle cx="27" cy="118" r="5" fill="#F4C430"/><circle cx="93" cy="118" r="5" fill="#E0343A"/>
<circle cx="60" cy="64" r="27" fill="var(--sk)"/><path d="M32 62c-3-28 19-41 38-35 17 5 25 19 22 35-9-13-21-19-35-18-11 1-19 8-25 18z" fill="var(--hr)"/>
<circle cx="50" cy="66" r="2.8" fill="#102D50"/><circle cx="70" cy="66" r="2.8" fill="#102D50"/><path d="M51 77q9 8 18 0" stroke="#102D50" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
<rect x="30" y="120" width="60" height="38" rx="6" fill="#0B8A4B"/><path d="M60 120v38" stroke="#fff" strokeWidth="2" opacity=".5"/>
</symbol>
<symbol id="garcon" viewBox="0 0 120 170">
<path d="M14 170c0-36 20-56 46-56s46 20 46 56z" fill="var(--sh)"/><rect x="51" y="88" width="18" height="30" rx="9" fill="var(--sk)"/>
<circle cx="60" cy="64" r="27" fill="var(--sk)"/><path d="M33 58c2-22 20-30 36-27 14 3 22 14 21 27-8-8-18-11-29-10-11 0-20 4-28 10z" fill="var(--hr)"/>
<circle cx="50" cy="67" r="2.8" fill="#102D50"/><circle cx="70" cy="67" r="2.8" fill="#102D50"/><path d="M51 78q9 8 18 0" stroke="#102D50" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
</symbol></defs></svg>
<div className="hero"><div className="bl b1"></div><div className="bl b2"></div><div className="bl b3"></div>
<div className="c"><div>
<span className="tag"><i></i>Bibliothèque scolaire numérique</span>
<h1><span className="w">Apprendre.</span> <span className="w">Comprendre.</span> <span className="w">S’entraîner.</span> <span className="w">Réussir.</span></h1>
<p className="l">Cours, fiches, exercices et corrigés pour les élèves du Sénégal, de la 6e à la Seconde. Partout, sur téléphone.</p>
<div className="mot" id="mot"></div>
<div className="cta"><Link href="/inscription" className="btn bg">Créer mon compte</Link><Link href="/ressources" className="btn bo">Voir les ressources</Link></div></div>

<div className="scene">
<svg viewBox="0 0 480 400" role="img" aria-label="Illustration : deux élèves devant une école">
<circle cx="240" cy="200" r="190" fill="var(--soft)"/>
<g className="sun"><circle cx="410" cy="70" r="26" fill="#F4C430"/><g stroke="#F4C430" strokeWidth="4" strokeLinecap="round"><path d="M410 22v10M410 108v10M362 70h10M448 70h10M376 36l7 7M437 97l7 7M444 36l-7 7M383 97l-7 7"/></g></g>
<g className="cl"><g fill="#fff" stroke="var(--ln)"><ellipse cx="90" cy="60" rx="38" ry="14"/><ellipse cx="116" cy="50" rx="24" ry="14"/></g></g>
<g className="cl cl2"><g fill="#fff" stroke="var(--ln)"><ellipse cx="60" cy="110" rx="30" ry="11"/><ellipse cx="80" cy="102" rx="18" ry="11"/></g></g>
<path d="M20 28Q240 70 460 28" stroke="var(--ln)" strokeWidth="2" fill="none"/>
<g><path className="flag" d="M60 40l14 4-9 14z" fill="#0B8A4B"/><path className="flag" d="M120 52l14 3-9 14z" fill="#F4C430"/><path className="flag" d="M180 58l14 2-9 14z" fill="#E0343A"/><path className="flag" d="M250 58l14 0-8 14z" fill="#0B8A4B"/><path className="flag" d="M320 54l14-2-8 14z" fill="#F4C430"/><path className="flag" d="M385 46l14-3-7 14z" fill="#E0343A"/></g>
<ellipse cx="240" cy="372" rx="220" ry="22" fill="#0B8A4B" opacity=".18"/>

<g><rect x="150" y="170" width="190" height="150" rx="6" fill="#fff" stroke="var(--ln)" strokeWidth="2"/>
<path d="M138 172L245 118 352 172z" fill="#E0343A" opacity=".9"/><rect x="150" y="176" width="190" height="9" fill="#F4C430"/><rect x="150" y="185" width="190" height="6" fill="#0B8A4B"/>
<rect x="224" y="250" width="42" height="70" rx="6" fill="#102D50" opacity=".85"/><circle cx="258" cy="288" r="2.5" fill="#F4C430"/>
<g fill="#cfe9f5" stroke="var(--ln)"><rect x="166" y="208" width="42" height="34" rx="4"/><rect x="282" y="208" width="42" height="34" rx="4"/><rect x="166" y="262" width="42" height="34" rx="4"/><rect x="282" y="262" width="42" height="34" rx="4"/></g>
<text x="245" y="160" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="system-ui">ÉCOLE</text></g>

<g className="can"><path d="M52 372c8-30 2-60 6-96h28c4 36-2 66 6 96z" fill="#8a5a3b"/><g fill="#0B8A4B"><circle cx="40" cy="262" r="26"/><circle cx="72" cy="244" r="32"/><circle cx="106" cy="264" r="26"/></g><circle cx="72" cy="250" r="8" fill="#F4C430" opacity=".9"/></g>

<g className="sway" style={{"--sk":"#8d5a3b","--hr":"#16161a","--sh":"#0B8A4B"} as React.CSSProperties}><use href="#fille" x="118" y="190" width="150" height="212"/></g>
<g className="sway s2" style={{"--sk":"#6b3f26","--hr":"#0d0d10","--sh":"#F4C430"} as React.CSSProperties}><use href="#garcon" x="262" y="206" width="140" height="198"/>
<g transform="rotate(-8 322 330)"><rect x="296" y="296" width="52" height="68" rx="7" fill="#102D50"/><rect className="scr" x="301" y="302" width="42" height="56" rx="4" fill="#bfe8f2"/><rect x="306" y="338" width="6" height="14" fill="#0B8A4B"/><rect x="316" y="330" width="6" height="22" fill="#F4C430"/><rect x="326" y="322" width="6" height="30" fill="#E0343A"/></g></g>
<g className="plane"><path d="M0 0l30 -10-8 22-8-6-6 8z" fill="#fff" stroke="var(--g)" strokeWidth="2" strokeLinejoin="round"/></g>
</svg>
<div className="fl f1"><i>✓</i>Quiz réussi · 18/20</div><div className="fl f2"><i>★</i>Corrigé détaillé</div><div className="fl f3"><i>↓</i>PDF prêt à lire</div></div>
</div></div>

<div className="stats"><div className="c"><div className="rv">
<div className="st"><b data-n="5">0</b><span>classes, de la 6e à la Seconde</span></div><div className="st"><b data-n="11">0</b><span>types de ressources</span></div>
<div className="st"><b data-n="6">0</b><span>matières principales</span></div><div className="st"><b>100 %</b><span>en français, sur mobile</span></div></div></div></div>

<div className="mq"><div><span>Mathématiques</span><span>Français</span><span>Anglais</span><span>Histoire-Géographie</span><span>SVT</span><span>Sciences physiques</span><span>Mathématiques</span><span>Français</span><span>Anglais</span><span>Histoire-Géographie</span><span>SVT</span><span>Sciences physiques</span></div></div>

<section><div className="c"><div className="tri"><i></i><i></i><i></i></div><h2 className="rv">Choisissez votre classe</h2><p className="sub rv">Un espace dédié par niveau, avec les matières de votre classe.</p>
<div className="g g5 rv"><div className="card niv tilt" style={{"--c":"#0B8A4B"} as React.CSSProperties}><b>6e</b><span>Espace 6e</span></div><div className="card niv tilt" style={{"--c":"#c99a00"} as React.CSSProperties}><b>5e</b><span>Espace 5e</span></div><div className="card niv tilt" style={{"--c":"#E0343A"} as React.CSSProperties}><b>4e</b><span>Espace 4e</span></div><div className="card niv tilt" style={{"--c":"#0B8A4B"} as React.CSSProperties}><b>3e</b><span>Espace 3e</span></div><div className="card niv tilt" style={{"--c":"#c99a00"} as React.CSSProperties}><b>Seconde</b><span>Espace Seconde</span></div></div></div></section>

<section className="alt"><div className="c"><div className="tri"><i></i><i></i><i></i></div><h2 className="rv">Essayez, c’est interactif</h2><p className="sub rv">Un document avec sa progression, et un quiz corrigé instantanément. Répondez-y !</p>
<div className="demo rv" id="demo">
<div className="card tilt"><span className="pill">COURS · 6e</span><h3 style={{"margin":"10px 0 0"} as React.CSSProperties}>Addition et soustraction des nombres décimaux</h3><p>Chapitre 2 · Mathématiques</p>
<div className="bar"><i style={{"--p":"72%"} as React.CSSProperties}></i></div><p style={{"fontSize":".8rem"} as React.CSSProperties}>Progression : 72 %</p><a className="btn bg" style={{"marginTop":"14px","padding":"10px 20px"} as React.CSSProperties}>Ouvrir le PDF</a></div>
<div className="card tilt"><span className="pill">QUIZ</span><h3 style={{"margin":"10px 0 0"} as React.CSSProperties}>Combien font 3,5 + 2,25 ?</h3>
<button className="opt" data-ok="0">5,70</button><button className="opt" data-ok="1">5,75</button><button className="opt" data-ok="0">6,25</button><div id="fb"></div></div></div></div></section>

<section><div className="c"><div className="tri"><i></i><i></i><i></i></div><h2 className="rv">Pourquoi CAP RÉUSSITE ?</h2><p className="sub rv">Tout ce qu’il faut pour réviser sereinement.</p>
<div className="g g2">
<div className="card tilt rv"><div className="ic">📚</div><h3>Tout au même endroit</h3><p>Cours, fiches, exercices, corrigés et évaluations classés par classe, matière et chapitre.</p></div>
<div className="card tilt rv"><div className="ic">📱</div><h3>Pensé pour le téléphone</h3><p>Pages légères, lecture simple, téléchargement facile même avec une connexion lente.</p></div>
<div className="card tilt rv"><div className="ic">✅</div><h3>Corrigés détaillés</h3><p>Chaque exercice est accompagné d’un corrigé expliqué pas à pas.</p></div>
<div className="card tilt rv"><div className="ic">📈</div><h3>Un suivi clair</h3><p>Favoris, historique et progression pour savoir où l’élève en est.</p></div></div></div></section>

<section className="alt"><div className="c"><div className="tri"><i></i><i></i><i></i></div><h2 className="rv">Nos offres</h2><p className="sub rv">Paiement sécurisé par Wave. L’accès s’active dès la confirmation.</p>
<div className="g g4"><div className="card rv"><h3>Découverte</h3><p className="prix">1 000 <small>FCFA</small></p></div><div className="card rv"><h3>Essentiel</h3><p className="prix">3 000 <small>FCFA</small></p></div>
<div className="card pop rv"><h3>Premium</h3><p className="prix">5 000 <small>FCFA</small></p></div><div className="card rv"><h3>Intégrale</h3><p className="prix">12 000 <small>FCFA</small></p></div></div></div></section>

<section><div className="c"><div className="card tm rv"><h3>Témoignages</h3><p>Les avis authentiques d’élèves et de parents apparaîtront ici dès qu’ils seront disponibles.</p></div></div></section>

    </div>
  );
}
