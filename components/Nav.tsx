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
  const [openMobile, setOpenMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Hidrata el estado desde localStorage y refleja en <html data-nav-collapsed>
  useEffect(() => {
    const stored = localStorage.getItem('nav-collapsed');
    if (stored === 'true') {
      setCollapsed(true);
      document.documentElement.dataset.navCollapsed = 'true';
    }
  }, []);

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    if (next) {
      document.documentElement.dataset.navCollapsed = 'true';
      localStorage.setItem('nav-collapsed', 'true');
    } else {
      delete document.documentElement.dataset.navCollapsed;
      localStorage.setItem('nav-collapsed', 'false');
    }
  }

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
      <nav
        className={`fixed left-0 top-0 hidden h-screen flex-col justify-between border-r border-white/5 bg-[#050816]/85 backdrop-blur-xl xl:flex z-40 transition-transform duration-500 ease-in-out w-64 px-6 py-8 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div>
          <div className="flex items-start justify-between">
            <a href="#hero" className="block">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A24C]">EAFIT · 2026</div>
              <div className="font-display mt-2 text-2xl leading-[1.05] text-white">
                Masterclass<br />
                <span className="text-grad-gold">de datos</span>
              </div>
            </a>
            <button
              onClick={toggleCollapsed}
              aria-label="Ocultar menú"
              title="Ocultar menú lateral (M)"
              className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#8B95B5] transition-colors hover:border-[#C8A24C]/40 hover:text-[#C8A24C]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          </div>

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

      {/* Botón flotante para mostrar el menú cuando está oculto (desktop) */}
      <button
        onClick={toggleCollapsed}
        aria-label="Mostrar menú"
        title="Mostrar menú lateral"
        className={`fixed left-4 top-4 z-50 hidden h-10 w-10 items-center justify-center rounded-full border border-[#C8A24C]/40 bg-[#0A0E27]/90 text-[#C8A24C] backdrop-blur-xl transition-all duration-500 hover:bg-[#C8A24C] hover:text-[#0A0E27] hover:scale-110 xl:flex ${
          collapsed ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-75'
        }`}
        style={{ boxShadow: '0 4px 20px rgba(200, 162, 76, 0.30)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#050816]/90 px-5 py-4 backdrop-blur-xl xl:hidden">
        <div className="flex items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24C]">EAFIT</div>
          <div className="text-sm text-white font-display">Masterclass de datos</div>
        </div>
        <button
          onClick={() => setOpenMobile(!openMobile)}
          aria-label="Menú"
          className="rounded-lg border border-white/10 bg-white/5 p-2"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span className={`h-0.5 bg-white transition-all ${openMobile ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 bg-white transition-all ${openMobile ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-white transition-all ${openMobile ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {openMobile && (
        <div
          onClick={() => setOpenMobile(false)}
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
