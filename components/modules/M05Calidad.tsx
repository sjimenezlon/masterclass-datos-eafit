'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader';
import { useAchievements } from '../achievements/Provider';

type Row = {
  id: string;
  nombre: string;
  programa: string;
  semestre: number | string;
  promedio: number | string;
  estrato: number | string;
  correo: string;
  estado: string;
};

const SUCIO: Row[] = [
  { id: 'EAF-00001', nombre: 'María Sofía Restrepo', programa: 'ISI', semestre: 4, promedio: 4.2, estrato: 3, correo: 'maria.restrepo@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00001', nombre: 'María Sofía Restrepo', programa: 'ISI', semestre: 4, promedio: 4.2, estrato: 3, correo: 'maria.restrepo@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00002', nombre: 'JUAN PABLO MEJIA', programa: 'Ing.Sistemas', semestre: 6, promedio: 3.85, estrato: 4, correo: 'juanp@eafit.edu.co', estado: 'activo' },
  { id: 'EAF-00003', nombre: 'Ana Botero', programa: 'ADM', semestre: 'tercero', promedio: 4.1, estrato: 9, correo: 'ana.botero@', estado: 'Activo' },
  { id: 'EAF-00004', nombre: 'Carlos Vélez', programa: 'ECO', semestre: 5, promedio: 6.2, estrato: 5, correo: 'carlos.velez@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00005', nombre: 'lucia gomez', programa: 'PSI', semestre: 8, promedio: 4.5, estrato: 2, correo: '', estado: 'Activo' },
  { id: 'EAF-00006', nombre: 'David Torres', programa: 'ISI', semestre: 2, promedio: '', estrato: 3, correo: 'david.torres@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00007', nombre: 'Sofía Henao', programa: 'COM', semestre: 7, promedio: 3.7, estrato: 4, correo: 'sofia.henao@eafit.edu.co', estado: 'ACTIVO' },
  { id: 'EAF-00008', nombre: 'pedro arango', programa: 'ICI', semestre: 9, promedio: 4.0, estrato: 3, correo: 'pedro arango@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00009', nombre: 'Laura Quintero', programa: 'IPR', semestre: 4, promedio: 4.3, estrato: 5, correo: 'laura.quintero@eafit.edu.co', estado: 'A' },
];

const LIMPIO: Row[] = [
  { id: 'EAF-00001', nombre: 'María Sofía Restrepo', programa: 'ISI', semestre: 4, promedio: 4.20, estrato: 3, correo: 'maria.restrepo@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00002', nombre: 'Juan Pablo Mejía', programa: 'ISI', semestre: 6, promedio: 3.85, estrato: 4, correo: 'juanp.mejia@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00003', nombre: 'Ana Botero', programa: 'ADM', semestre: 3, promedio: 4.10, estrato: 5, correo: 'ana.botero@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00004', nombre: 'Carlos Vélez', programa: 'ECO', semestre: 5, promedio: 4.20, estrato: 5, correo: 'carlos.velez@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00005', nombre: 'Lucía Gómez', programa: 'PSI', semestre: 8, promedio: 4.50, estrato: 2, correo: 'lucia.gomez@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00006', nombre: 'David Torres', programa: 'ISI', semestre: 2, promedio: 3.50, estrato: 3, correo: 'david.torres@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00007', nombre: 'Sofía Henao', programa: 'COM', semestre: 7, promedio: 3.70, estrato: 4, correo: 'sofia.henao@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00008', nombre: 'Pedro Arango', programa: 'ICI', semestre: 9, promedio: 4.00, estrato: 3, correo: 'pedro.arango@eafit.edu.co', estado: 'Activo' },
  { id: 'EAF-00009', nombre: 'Laura Quintero', programa: 'IPR', semestre: 4, promedio: 4.30, estrato: 5, correo: 'laura.quintero@eafit.edu.co', estado: 'Activo' },
];

// Celdas con error (rowIndex 0-based en SUCIO, columna)
type CellId = string; // "row-col"
const ERRORES: { id: CellId; tipo: string; razon: string }[] = [
  { id: '0-id', tipo: 'Unicidad', razon: 'EAF-00001 está duplicado (también en fila 1).' },
  { id: '1-id', tipo: 'Unicidad', razon: 'Duplicado de la fila 0.' },
  { id: '2-programa', tipo: 'Consistencia', razon: '"Ing.Sistemas" debería ser "ISI" como en otras filas.' },
  { id: '2-estado', tipo: 'Consistencia', razon: '"activo" en minúsculas, inconsistente con el resto.' },
  { id: '3-semestre', tipo: 'Validez', razon: 'Texto "tercero" en columna numérica.' },
  { id: '3-estrato', tipo: 'Validez', razon: 'Estrato 9 no existe (rango válido: 1-6).' },
  { id: '3-correo', tipo: 'Validez', razon: 'Correo "ana.botero@" sin dominio.' },
  { id: '4-promedio', tipo: 'Validez', razon: 'Promedio 6.2 imposible (escala 0-5).' },
  { id: '5-correo', tipo: 'Completitud', razon: 'Correo en blanco.' },
  { id: '6-promedio', tipo: 'Completitud', razon: 'Promedio en blanco.' },
  { id: '7-estado', tipo: 'Consistencia', razon: '"ACTIVO" en mayúsculas, inconsistente.' },
  { id: '8-correo', tipo: 'Validez', razon: 'Espacio en correo "pedro arango@..."' },
  { id: '9-estado', tipo: 'Validez', razon: '"A" no es un valor válido del dominio.' },
];

const ERROR_IDS = new Set(ERRORES.map((e) => e.id));

export default function M05Calidad() {
  const { unlock } = useAchievements();
  const [view, setView] = useState<'sucio' | 'limpio' | 'detective'>('sucio');
  const data = view === 'limpio' ? LIMPIO : SUCIO;

  // Detective state
  const [found, setFound] = useState<Set<CellId>>(new Set());
  const [misses, setMisses] = useState<CellId[]>([]);
  const [time, setTime] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [activeTip, setActiveTip] = useState<{ x: number; y: number; text: string; ok: boolean } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && !done) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            setDone(true);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, done]);

  useEffect(() => {
    if (found.size === ERROR_IDS.size && view === 'detective') {
      setDone(true);
      setRunning(false);
      unlock('higienista');
    }
  }, [found, view, unlock]);

  function startGame() {
    setFound(new Set());
    setMisses([]);
    setTime(60);
    setDone(false);
    setRunning(true);
  }

  function handleCellClick(rowIdx: number, col: keyof Row, e: React.MouseEvent) {
    if (view !== 'detective' || !running || done) return;
    const id: CellId = `${rowIdx}-${col}`;
    if (found.has(id)) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const tipPos = { x: rect.left + rect.width / 2, y: rect.top - 10 };
    if (ERROR_IDS.has(id)) {
      const err = ERRORES.find((er) => er.id === id)!;
      setFound((p) => new Set(p).add(id));
      setActiveTip({ x: tipPos.x, y: tipPos.y, text: `✓ ${err.tipo}: ${err.razon}`, ok: true });
      setTimeout(() => setActiveTip(null), 2200);
    } else {
      setMisses((p) => [...p, id]);
      setTime((t) => Math.max(0, t - 3));
      setActiveTip({ x: tipPos.x, y: tipPos.y, text: '✗ Aquí no hay error · −3s', ok: false });
      setTimeout(() => setActiveTip(null), 1500);
    }
  }

  const score = found.size * 10 - misses.length * 3 + time;

  return (
    <section id="calidad" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05"
          tag="Calidad de datos · 6 dimensiones DAMA"
          title="Garbage in, garbage out. Aplica a Excel, a tableros y a IA."
          subtitle="Un dataset sucio convierte el modelo más sofisticado en un mentiroso elegante. Activa el modo Detective y caza los 8 errores antes de que se acabe el tiempo."
        />

        {/* Dimensiones */}
        <div className="mb-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { d: 'Completitud', q: '¿Hay valores en blanco?' },
            { d: 'Exactitud', q: '¿Refleja la realidad?' },
            { d: 'Consistencia', q: '¿Coincide entre sistemas?' },
            { d: 'Validez', q: '¿Cumple las reglas?' },
            { d: 'Unicidad', q: '¿Hay duplicados?' },
            { d: 'Oportunidad', q: '¿Llegó a tiempo?' },
          ].map((x) => (
            <div key={x.d} className="glass rounded-2xl p-4 text-center card-hover">
              <div className="font-display text-base text-[#C8A24C]">{x.d}</div>
              <p className="mt-2 text-[10px] leading-relaxed text-[#8B95B5]">{x.q}</p>
            </div>
          ))}
        </div>

        {/* Toggle modos */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="text-xs uppercase tracking-wider text-[#8B95B5]">Modo</div>
          <button
            onClick={() => setView('sucio')}
            className={`rounded-lg px-4 py-2 text-sm transition ${view === 'sucio' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'border border-white/10 text-[#8B95B5]'}`}
          >
            Antes (sucio)
          </button>
          <button
            onClick={() => setView('limpio')}
            className={`rounded-lg px-4 py-2 text-sm transition ${view === 'limpio' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'border border-white/10 text-[#8B95B5]'}`}
          >
            Después (limpio)
          </button>
          <button
            onClick={() => setView('detective')}
            className={`rounded-lg px-4 py-2 text-sm transition flex items-center gap-2 ${view === 'detective' ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold' : 'border border-[#C8A24C]/40 text-[#C8A24C]'}`}
          >
            <span>🔍</span> Modo Detective
          </button>
        </div>

        {view === 'detective' && (
          <div className="mb-6 glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Tiempo</div>
                <div className={`font-mono text-3xl tabular-nums ${time < 15 ? 'text-red-400 animate-pulse' : 'text-[#C8A24C]'}`}>
                  {String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Errores cazados</div>
                <div className="font-mono text-3xl tabular-nums text-[#10B981]">{found.size} / {ERROR_IDS.size}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Fallos</div>
                <div className="font-mono text-3xl tabular-nums text-red-400">{misses.length}</div>
              </div>
              {(done || running) && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Score</div>
                  <div className="font-mono text-3xl tabular-nums text-grad-gold">{score}</div>
                </div>
              )}
            </div>

            {!running && !done && (
              <button onClick={startGame} className="btn-gold">▶ Iniciar reto · 60s</button>
            )}
            {running && (
              <button onClick={() => { setRunning(false); setDone(true); }} className="btn-ghost">Rendirse</button>
            )}
            {done && (
              <button onClick={startGame} className="btn-gold">↻ Reintentar</button>
            )}
          </div>
        )}

        {/* Tabla */}
        <div className="glass overflow-visible rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.03] text-left text-[#8B95B5]">
                <tr>
                  {['ID', 'Nombre', 'Programa', 'Semestre', 'Promedio', 'Estrato', 'Correo', 'Estado'].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                {data.map((r, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                    {(['id', 'nombre', 'programa', 'semestre', 'promedio', 'estrato', 'correo', 'estado'] as (keyof Row)[]).map((col) => {
                      const cellId = `${i}-${col}`;
                      const isError = ERROR_IDS.has(cellId);
                      const isFound = found.has(cellId);
                      const value = r[col];
                      const isEmpty = value === '';

                      // Estilos por modo
                      let cellClass = '';
                      if (view === 'detective') {
                        cellClass = `cursor-crosshair transition-all ${
                          isFound ? 'bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400' : 'hover:bg-white/10'
                        }`;
                      }

                      return (
                        <td
                          key={col}
                          onClick={(e) => handleCellClick(i, col, e)}
                          className={`px-4 py-2.5 ${cellClass}`}
                        >
                          {col === 'id' ? <span className="text-[#C8A24C]">{value}</span>
                            : col === 'nombre' ? <span className="text-white">{value}</span>
                            : isEmpty ? <span className="text-red-400">∅</span>
                            : <span className="text-[#C9D2E8]">{value}</span>
                          }
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tooltip flotante para detective */}
        {activeTip && (
          <div
            className={`fixed z-[120] -translate-x-1/2 -translate-y-full rounded-lg px-3 py-2 text-xs shadow-xl ${
              activeTip.ok ? 'bg-emerald-500 text-emerald-50' : 'bg-red-500 text-red-50'
            }`}
            style={{ left: activeTip.x, top: activeTip.y }}
          >
            {activeTip.text}
          </div>
        )}

        {/* Resultado modo detective */}
        {view === 'detective' && done && (
          <div className="mt-6 glass rounded-2xl p-6 border-gold-glow">
            <div className="font-display text-2xl text-white">
              {found.size === ERROR_IDS.size ? '🏆 ¡Caza perfecta!' : found.size >= 6 ? '👏 Buen ojo de detective' : '🔍 Sigue practicando'}
            </div>
            <p className="mt-2 text-sm text-[#C9D2E8]">
              Cazaste <span className="font-semibold text-[#C8A24C]">{found.size} de {ERROR_IDS.size}</span> errores · {misses.length} fallos · score final <span className="font-semibold text-[#C8A24C]">{score}</span>.
            </p>
            {found.size < ERROR_IDS.size && (
              <details className="mt-3 text-xs text-[#8B95B5]">
                <summary className="cursor-pointer hover:text-[#C8A24C]">Ver errores que faltaron</summary>
                <ul className="mt-2 space-y-1">
                  {ERRORES.filter((e) => !found.has(e.id)).map((e) => (
                    <li key={e.id}>· <span className="text-[#C8A24C]">{e.tipo}</span>: {e.razon}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        {/* Costo de la mala calidad */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: '15-25%', d: 'del tiempo de un analista se pierde limpiando datos sucios', src: 'Forrester 2024' },
            { n: '$3.1T', d: 'USD anuales se pierden globalmente por datos de mala calidad', src: 'IBM 2023' },
            { n: '60%', d: 'de proyectos de IA fallan por problemas de calidad de los datos', src: 'Gartner 2025' },
          ].map((s) => (
            <div key={s.d} className="glass rounded-2xl p-6 card-hover">
              <div className="font-display text-4xl text-grad-gold">{s.n}</div>
              <p className="mt-3 text-sm leading-relaxed text-[#C9D2E8]">{s.d}</p>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-[#5B6889]">{s.src}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
