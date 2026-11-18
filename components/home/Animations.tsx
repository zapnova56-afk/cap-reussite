"use client";
import { useEffect } from "react";

// Comportements de la page d'accueil : apparition au défilement, compteurs, barre de progression, effet 3D, phrase animée, quiz.
export default function Animations() {
  useEffect(() => {
    const d = document, R = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ac = new AbortController(), o = { signal: ac.signal };
    const timers: number[] = []; let vivant = true;
    d.documentElement.classList.add("js");

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target as HTMLElement; t.classList.add("in"); io.unobserve(t);
      t.querySelectorAll<HTMLElement>("[data-n]").forEach((el) => {
        const n = Number(el.dataset.n); let i = 0;
        const id = window.setInterval(() => { el.textContent = String(++i); if (i >= n) clearInterval(id); }, 900 / n); timers.push(id);
      });
    }), { threshold: 0.2 });
    d.querySelectorAll(".acc .rv").forEach((e) => io.observe(e));

    const pg = d.getElementById("pg");
    addEventListener("scroll", () => { const h = d.documentElement; if (pg) pg.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`; }, { passive: true, signal: ac.signal });

    if (!R) d.querySelectorAll<HTMLElement>(".acc .tilt").forEach((c) => {
      c.addEventListener("pointermove", (e) => { const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
        c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`; }, o);
      c.addEventListener("pointerleave", () => { c.style.transform = ""; }, o);
    });

    const M = ["Des cours clairs, adaptés à ta classe", "Des exercices avec corrigés détaillés", "Des quiz pour t’entraîner", "Une progression que tu vois grandir"];
    const m = d.getElementById("mot"); let mi = 0, ci = 0;
    const ecrire = () => { if (!m || !vivant) return; const s = M[mi];
      if (R) { m.textContent = s; return; }
      m.textContent = s.slice(0, ++ci);
      if (ci >= s.length) { ci = 0; mi = (mi + 1) % M.length; timers.push(window.setTimeout(ecrire, 1800)); } else timers.push(window.setTimeout(ecrire, 55)); };
    ecrire();

    const fb = d.getElementById("fb"), demo = d.getElementById("demo");
    d.querySelectorAll<HTMLElement>(".acc .opt").forEach((b) => b.addEventListener("click", () => {
      d.querySelectorAll(".acc .opt").forEach((x) => x.classList.remove("ok", "no"));
      if (!fb) return;
      if (b.dataset.ok === "1") {
        b.classList.add("ok"); fb.textContent = "Bravo ! 3,5 + 2,25 = 5,75 🎉";
        if (!R && demo) for (let i = 0; i < 28; i++) {
          const s = d.createElement("span"); s.className = "cf"; s.style.background = ["#0B8A4B", "#F4C430", "#E0343A"][i % 3]; s.style.left = "75%"; s.style.top = "40%"; demo.appendChild(s);
          s.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${Math.random() * 320 - 160}px,${Math.random() * -220 - 20}px) rotate(540deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => s.remove();
        }
      } else { b.classList.add("no"); fb.textContent = "Pas tout à fait. Aligne les virgules et réessaie."; }
    }, o));

    return () => { vivant = false; ac.abort(); io.disconnect(); timers.forEach((t) => { clearInterval(t); clearTimeout(t); }); d.documentElement.classList.remove("js"); };
  }, []);
  return <div id="pg" aria-hidden="true" />;
}
