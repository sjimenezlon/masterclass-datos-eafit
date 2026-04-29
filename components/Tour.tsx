'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { id: 'hero', title: 'Bienvenido', text: 'Esto es una masterclass interactiva. Vas a desbloquear logros mientras avanzas. Sigue el tour para conocer los 10 módulos en 90 segundos.' },
  { id: 'cultura', title: '01 · Cultura del dato', text: 'Explora el ecosistema académico. Toca cada nodo del mapa para descubrir qué datos genera cada área.' },
  { id: 'ciclo', title: '02 · Ciclo de vida', text: 'Acompaña a un dato en su viaje de 7 fases: desde que nace en un formulario hasta que se borra.' },
  { id: 'tipos', title: '03 · Tipos de datos', text: 'Clasifica 20 campos académicos: público, institucional, personal o sensible. Vive la Ley 1581 en tu cabeza.' },
  { id: 'gobernanza', title: '04 · Gobernanza', text: 'Arrastra cada situación al rol que decide: Owner, Steward, Custodian o Citizen.' },
  { id: 'calidad', title: '05 · Calidad', text: 'Caza errores en una hoja Excel sucia. Modo Detective con cronómetro disponible.' },
  { id: 'visualizacion', title: '06 · Visualización', text: 'Construye gráficos arrastrando campos a los ejes. Aprende qué chart usar cuándo.' },
  { id: 'kpis', title: '07 · KPIs accionables', text: 'Calcula retención, SLA y brecha Saber Pro con datos editables. Mueve los números.' },
  { id: 'nubes', title: '08 · Nubes y herramientas', text: 'Descarga los 7 datasets o sube tu propio Excel y obtén un análisis instantáneo.' },
  { id: 'ia', title: '09 · IA aplicada', text: 'Cuatro demos: deserción, NLP, homologaciones y la anatomía de un buen prompt.' },
  { id: 'glosario', title: '10 · Glosario', text: '62 términos buscables actualizados a mayo 2026. Tu vocabulario para no perderte en juntas.' },
];

export default function Tour({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [box, setBox] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  // Calcula caja del elemento target
  useEffect(() => {
    const el = document.getElementById(current.id);
    if (!el) {
      setBox(null);
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      setBox({
        top: r.top - 12,
        left: r.left - 12,
        width: r.width + 24,
        height: Math.min(r.height, window.innerHeight * 0.65) + 24,
      });
    }, 700);
    return () => clearTimeout(t);
  }, [step]);

  // Recalcula al hacer scroll/resize
  useEffect(() => {
    function update() {
      const el = document.getElementById(current.id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBox({
        top: r.top - 12,
        left: r.left - 12,
        width: r.width + 24,
        height: Math.min(r.height, window.innerHeight * 0.65) + 24,
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [current.id]);

  // Salir con Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLast) onClose();
        else setStep((s) => Math.min(s + 1, STEPS.length - 1));
      }
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(s - 1, 0));
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLast, onClose]);

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Spotlight overlay */}
      {box && (
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: 'rgba(5, 8, 22, 0.85)',
            clipPath: `polygon(
              0% 0%, 0% 100%, ${box.left}px 100%,
              ${box.left}px ${box.top}px,
              ${box.left + box.width}px ${box.top}px,
              ${box.left + box.width}px ${box.top + box.height}px,
              ${box.left}px ${box.top + box.height}px,
              ${box.left}px 100%, 100% 100%, 100% 0%
            )`,
            backdropFilter: 'blur(2px)',
          }}
          onClick={onClose}
        />
      )}
      {!box && (
        <div className="absolute inset-0 bg-[#050816]/85 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Card de tour */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(560px,calc(100vw-2rem))]">
        <div className="rounded-3xl border-2 border-[#C8A24C]/50 bg-gradient-to-br from-[#1A2347] to-[#0A0E27] p-6 shadow-[0_30px_80px_rgba(200,162,76,0.30)]">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#C8A24C]">
              PASO {step + 1} DE {STEPS.length}
            </div>
            <button onClick={onClose} className="text-xs text-[#8B95B5] hover:text-white transition-colors">
              Saltar tour ✕
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1 mb-4">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i === step
                    ? 'bg-[#C8A24C]'
                    : i < step
                    ? 'bg-[#C8A24C]/40'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          <h3 className="font-display text-2xl text-white">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#C9D2E8]">{current.text}</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-[10px] text-[#5B6889]">
              ← → para navegar · ESC para cerrar
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#C9D2E8] hover:border-[#C8A24C]/40 transition-colors"
                >
                  Atrás
                </button>
              )}
              <button
                onClick={() => {
                  if (isLast) onClose();
                  else setStep((s) => s + 1);
                }}
                className="rounded-lg bg-[#C8A24C] px-4 py-1.5 text-xs font-semibold text-[#0A0E27] hover:bg-[#F0C674] transition-colors"
              >
                {isLast ? '¡Empezar!' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
