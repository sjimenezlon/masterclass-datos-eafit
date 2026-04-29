'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAchievements } from './achievements/Provider';

type Stats = {
  col: string;
  type: 'num' | 'cat';
  filled: number;
  empty: number;
  unique: number;
  // num
  min?: number;
  max?: number;
  mean?: number;
  // cat
  topValues?: { name: string; value: number }[];
};

export default function ExcelAnalyzer() {
  const { unlock } = useAchievements();
  const [filename, setFilename] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCol, setSelectedCol] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });
      if (json.length === 0) {
        setError('La hoja está vacía o tiene un formato no estándar.');
        setLoading(false);
        return;
      }
      const limited = json.slice(0, 5000); // cap para no colgar el navegador
      setRows(limited);
      setFilename(file.name);
      setStats(calcStats(limited));
      setSelectedCol(null);
      unlock('curador-cloud');
    } catch (e) {
      setError('No se pudo leer el archivo. Verifica que sea un .xlsx o .csv válido.');
    }
    setLoading(false);
  }

  function calcStats(data: Record<string, unknown>[]): Stats[] {
    const cols = Object.keys(data[0] ?? {});
    return cols.map((col) => {
      const values = data.map((r) => r[col]);
      const filled = values.filter((v) => v !== '' && v !== null && v !== undefined).length;
      const empty = values.length - filled;
      const numeric = values.filter((v) => typeof v === 'number' && !isNaN(v as number));
      const isNum = numeric.length / Math.max(filled, 1) > 0.7;
      const unique = new Set(values.filter((v) => v !== '')).size;

      if (isNum) {
        const nums = numeric as number[];
        const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
        return {
          col,
          type: 'num',
          filled,
          empty,
          unique,
          min: Math.min(...nums),
          max: Math.max(...nums),
          mean: round(mean, 2),
        };
      } else {
        const counts: Record<string, number> = {};
        values.forEach((v) => {
          const k = String(v ?? '∅').slice(0, 60);
          counts[k] = (counts[k] || 0) + 1;
        });
        const topValues = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([name, value]) => ({ name, value }));
        return { col, type: 'cat', filled, empty, unique, topValues };
      }
    });
  }

  function round(n: number, d: number) {
    return Math.round(n * 10 ** d) / 10 ** d;
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const totalRows = rows.length;
  const totalCols = stats.length;
  const totalCells = totalRows * totalCols;
  const totalEmpty = stats.reduce((acc, s) => acc + s.empty, 0);
  const completitud = totalCells > 0 ? (1 - totalEmpty / totalCells) * 100 : 0;
  const sel = stats.find((s) => s.col === selectedCol);

  return (
    <div className="glass rounded-3xl p-8 border-gold-glow">
      <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Tu turno · 100% privado, todo se procesa en tu navegador</div>
      <h3 className="font-display mt-2 text-3xl text-white">Sube tu propio Excel y obtén su radiografía</h3>
      <p className="mt-2 text-sm text-[#8B95B5]">
        Formatos soportados: .xlsx, .xls, .csv · hasta 5.000 filas · ningún dato sale de tu equipo.
      </p>

      {!filename && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mt-6 block cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragOver ? 'border-[#C8A24C] bg-[#C8A24C]/10 scale-[1.01]' : 'border-white/15 bg-white/[0.02] hover:border-[#C8A24C]/40'
          }`}
        >
          <div className="text-5xl mb-3">📊</div>
          <div className="font-display text-xl text-white">Arrastra tu archivo aquí</div>
          <div className="mt-2 text-sm text-[#8B95B5]">o pulsa para seleccionar</div>
          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onInput} />
          {loading && <div className="mt-4 text-xs text-[#C8A24C]">Procesando...</div>}
          {error && <div className="mt-4 text-xs text-red-400">{error}</div>}
        </label>
      )}

      {filename && (
        <div className="mt-6">
          {/* Cabecera de archivo */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#C8A24C]/30 bg-[#C8A24C]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8A24C]/20 text-xl">📑</div>
              <div>
                <div className="font-display text-base text-white">{filename}</div>
                <div className="text-xs text-[#8B95B5]">{totalRows.toLocaleString()} filas · {totalCols} columnas</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setFilename(null); setRows([]); setStats([]); }}
                className="btn-ghost text-xs"
              >
                ↻ Cambiar archivo
              </button>
            </div>
          </div>

          {/* KPIs globales */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <Kpi label="Filas" value={totalRows.toLocaleString()} />
            <Kpi label="Columnas" value={String(totalCols)} />
            <Kpi label="Completitud" value={`${completitud.toFixed(1)}%`} highlight={completitud > 95 ? 'good' : completitud > 80 ? 'warn' : 'bad'} />
            <Kpi label="Celdas vacías" value={totalEmpty.toLocaleString()} highlight={totalEmpty === 0 ? 'good' : 'warn'} />
          </div>

          {/* Heatmap de columnas */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-3">Mapa de calidad por columna · clic para detalle</div>
            <div className="grid gap-1.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {stats.map((s) => {
                const pct = (s.filled / totalRows) * 100;
                const bg =
                  pct >= 99 ? '#10B981'
                  : pct >= 90 ? '#84CC16'
                  : pct >= 70 ? '#F59E0B'
                  : '#EF4444';
                const isSel = selectedCol === s.col;
                return (
                  <button
                    key={s.col}
                    onClick={() => setSelectedCol(s.col)}
                    className={`group relative overflow-hidden rounded-lg border p-2 text-left transition-all ${
                      isSel ? 'border-[#C8A24C] scale-[1.02]' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 transition-all"
                      style={{ background: `${bg}20`, width: `${pct}%` }}
                    />
                    <div className="relative flex items-center justify-between gap-2">
                      <div className="text-[11px] truncate text-white">{s.col}</div>
                      <div className="flex items-center gap-1 text-[9px]" style={{ color: bg }}>
                        <span className="text-[8px] uppercase">{s.type === 'num' ? 'num' : 'cat'}</span>
                        <span className="font-mono">{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle de columna */}
          {sel && (
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-wider text-[#C8A24C]">Columna seleccionada</div>
                <div className="font-display text-xl text-white mt-1">{sel.col}</div>
                <div className="mt-3 space-y-2 text-xs">
                  <Stat label="Tipo" value={sel.type === 'num' ? 'Numérico' : 'Categórico'} />
                  <Stat label="Llenas" value={`${sel.filled.toLocaleString()} (${((sel.filled/totalRows)*100).toFixed(1)}%)`} />
                  <Stat label="Vacías" value={String(sel.empty)} />
                  <Stat label="Únicos" value={sel.unique.toLocaleString()} />
                  {sel.type === 'num' && (
                    <>
                      <Stat label="Mín" value={String(sel.min)} />
                      <Stat label="Máx" value={String(sel.max)} />
                      <Stat label="Media" value={String(sel.mean)} />
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-3">
                  {sel.type === 'cat' ? 'Top 8 valores' : 'Distribución básica'}
                </div>
                {sel.type === 'cat' && sel.topValues && (
                  <div className="h-[260px]">
                    <ResponsiveContainer>
                      <BarChart data={sel.topValues} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                        <XAxis type="number" stroke="#8B95B5" fontSize={10} />
                        <YAxis dataKey="name" type="category" stroke="#8B95B5" fontSize={10} width={120} />
                        <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                        <Bar dataKey="value" fill="#C8A24C" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {sel.type === 'num' && (
                  <div className="space-y-3 text-sm text-[#C9D2E8]">
                    <div className="rounded-xl border border-white/10 p-3">
                      <div className="text-xs text-[#8B95B5]">Rango</div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="font-mono text-[#5B95FF]">{sel.min}</span>
                        <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#5B95FF] via-[#C8A24C] to-[#10B981]" />
                        <span className="font-mono text-[#10B981]">{sel.max}</span>
                      </div>
                      <div className="mt-2 text-xs">Media: <span className="text-[#C8A24C] font-mono">{sel.mean}</span></div>
                    </div>
                    <p className="text-xs leading-relaxed text-[#8B95B5]">
                      💡 Lleva tu archivo a Power BI, Lovable o Claude (con un prompt RCTF) y pídele un análisis profundo.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview tabla */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-2">Primeras 10 filas</div>
            <div className="rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-white/[0.05] text-left text-[#8B95B5]">
                  <tr>
                    {stats.slice(0, 10).map((s) => (
                      <th key={s.col} className="px-3 py-2 font-medium uppercase tracking-wider whitespace-nowrap">{s.col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono text-[10px]">
                  {rows.slice(0, 10).map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      {stats.slice(0, 10).map((s) => (
                        <td key={s.col} className="px-3 py-1.5 text-[#C9D2E8] whitespace-nowrap">
                          {String(r[s.col] ?? '').slice(0, 40) || <span className="text-red-400">∅</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalCols > 10 && <div className="px-3 py-2 text-[10px] text-[#5B6889]">+ {totalCols - 10} columnas más</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value, highlight }: { label: string; value: string; highlight?: 'good' | 'warn' | 'bad' }) {
  const color = highlight === 'good' ? '#10B981' : highlight === 'warn' ? '#F59E0B' : highlight === 'bad' ? '#EF4444' : '#C8A24C';
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">{label}</div>
      <div className="font-display text-2xl mt-1" style={{ color }}>{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <span className="text-[#8B95B5]">{label}</span>
      <span className="font-mono text-[#C9D2E8]">{value}</span>
    </div>
  );
}
