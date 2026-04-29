'use client';

import { useState, useMemo } from 'react';
import SectionHeader from '../SectionHeader';
import { GLOSSARY, type GlossaryEntry } from '@/lib/glossary';

const CATEGORIAS = [
  'Todas',
  'Gobernanza',
  'Roles',
  'Calidad',
  'Arquitectura',
  'Almacenamiento',
  'Procesos',
  'Privacidad',
  'Analítica',
  'IA',
  'Regulación',
] as const;

const CAT_COLOR: Record<string, string> = {
  Gobernanza: '#C8A24C',
  Roles: '#F0C674',
  Calidad: '#10B981',
  Arquitectura: '#5B95FF',
  Almacenamiento: '#3A82FF',
  Procesos: '#7AA8FF',
  Privacidad: '#EF4444',
  Analítica: '#A855F7',
  IA: '#FF6B9D',
  Regulación: '#F59E0B',
};

export default function M10Glosario() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<typeof CATEGORIAS[number]>('Todas');
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return GLOSSARY.filter((e) => {
      if (cat !== 'Todas' && e.category !== cat) return false;
      if (!q) return true;
      const search = q.toLowerCase();
      return (
        e.term.toLowerCase().includes(search) ||
        e.short.toLowerCase().includes(search) ||
        e.long.toLowerCase().includes(search)
      );
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [q, cat]);

  return (
    <section id="glosario" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="10"
          tag={`Glosario · ${GLOSSARY.length} términos · Mayo 2026`}
          title="Vocabulario para no perderse en la conversación."
          subtitle="Cuando alguien diga “data lakehouse”, “pseudonimización” o “ISO 42001” en una junta, vas a saber exactamente qué quiere decir y qué impacto tiene."
        />

        {/* Buscador + filtros */}
        <div className="glass rounded-3xl p-6 mb-8 sticky top-20 z-30 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B6889]">⌕</span>
              <input
                type="text"
                placeholder="Buscar término, definición o categoría..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#050816]/80 px-12 py-3 text-sm text-white placeholder-[#5B6889] focus:border-[#C8A24C] focus:outline-none"
              />
            </div>
            <div className="text-xs text-[#8B95B5]">
              {filtered.length} de {GLOSSARY.length}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition-all ${
                  cat === c
                    ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold'
                    : 'border border-white/10 bg-white/[0.02] text-[#C9D2E8] hover:border-[#C8A24C]/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((e) => (
            <Card key={e.term} entry={e} open={open === e.term} onToggle={() => setOpen(open === e.term ? null : e.term)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <div className="font-display text-2xl text-[#8B95B5]">Sin resultados</div>
            <p className="mt-2 text-sm text-[#5B6889]">Prueba otro término o cambia la categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ entry, open, onToggle }: { entry: GlossaryEntry; open: boolean; onToggle: () => void }) {
  const color = CAT_COLOR[entry.category] || '#C8A24C';
  return (
    <button
      onClick={onToggle}
      className="text-left glass rounded-2xl p-5 card-hover w-full"
      style={{ borderColor: open ? `${color}50` : undefined }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div
            className="inline-block rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
            style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
          >
            {entry.category}
          </div>
          <div className="font-display mt-2 text-lg text-white">{entry.term}</div>
          <p className="mt-1 text-xs leading-relaxed text-[#C9D2E8]">{entry.short}</p>
        </div>
        <div className="text-[#C8A24C] text-xl flex-shrink-0">{open ? '−' : '+'}</div>
      </div>

      {open && (
        <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
          <p className="text-sm leading-relaxed text-[#C9D2E8]">{entry.long}</p>
          {entry.example && (
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-wider text-[#C8A24C]">Ejemplo aplicado</div>
              <p className="mt-1 text-xs italic leading-relaxed text-[#8B95B5]">{entry.example}</p>
            </div>
          )}
        </div>
      )}
    </button>
  );
}
