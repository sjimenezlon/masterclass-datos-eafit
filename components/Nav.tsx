'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio', n: '00' },
  { id: 'cultura', label: 'Cultura del dato', n: '01' },
  { id: 'ciclo', label: 'Ciclo de vida', n: '02' },
  { id: 'tipos', label: 'Tipos de datos', n: '03' },
  { id: 'gobernanza', label: 'Gobernanza', n: '04' },
  { id: 'calidad', label: 'Calidad', n: '05' },
  { id: 'visualizacion', label: 'Visualización', n: '06' },
  { id: 'kpis', label: 'KPIs accionables', n: '07' },
  { id: 'nubes', label: 'Nubes y herramientas', n: '08' },
  { id: 'ia', label: 'IA aplicada', n: '09' },
  { id: 'glosario', label: 'Glosario', n: '10' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="fixed left-0 top-0 hidden h-screen w-64 flex-col justify-between border-r border-white/5 bg-[#050816]/85 px-6 py-8 backdrop-blur-xl xl:flex z-40">
        <div>
          <a href="#hero" className="block">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A24C]">EAFIT · 2026</div>
            <div className="font-display mt-2 text-2xl leading-[1.05] text-white">
              Masterclass<br />
              <span className="text-grad-gold">de datos</span>
            </div>
          </a>

          <ul className="mt-12 space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    active === s.id
                      ? 'bg-gradient-to-r from-[#2E6FFF]/15 to-transparent text-white'
                      : 'text-[#8B95B5] hover:text-white'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      active === s.id ? 'text-[#C8A24C]' : 'text-[#5B6889]'
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="flex-1">{s.label}</span>
                  {active === s.id && (
                    <span className="h-1 w-1 rounded-full bg-[#C8A24C] shadow-[0_0_8px_#C8A24C]" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-[10px] leading-relaxed text-[#5B6889]">
          Diseñada por Santiago Jiménez<br />
          para Dirección de Desarrollo<br />
          Académico · EAFIT
        </div>
      </nav>

      {/* Mobile top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#050816]/90 px-5 py-4 backdrop-blur-xl xl:hidden">
        <div className="flex items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24C]">EAFIT</div>
          <div className="text-sm text-white font-display">Masterclass de datos</div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="rounded-lg border border-white/10 bg-white/5 p-2"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span className={`h-0.5 bg-white transition-all ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-white transition-all ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#050816]/95 pt-20 backdrop-blur-xl xl:hidden"
        >
          <ul className="px-6 space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base text-[#C9D2E8]"
                >
                  <span className="font-mono text-xs text-[#C8A24C]">{s.n}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
