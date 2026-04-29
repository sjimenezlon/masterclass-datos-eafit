'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import SectionHeader from '../SectionHeader';
import { useAchievements } from '../achievements/Provider';

const RETENCION = [
  { semestre: '2022-1', tasa: 89 },
  { semestre: '2022-2', tasa: 87 },
  { semestre: '2023-1', tasa: 88 },
  { semestre: '2023-2', tasa: 86 },
  { semestre: '2024-1', tasa: 90 },
  { semestre: '2024-2', tasa: 91 },
  { semestre: '2025-1', tasa: 92 },
  { semestre: '2025-2', tasa: 91 },
];

const PROGRAMAS = [
  { name: 'Administración', val: 4.2 },
  { name: 'Ingeniería de Sistemas', val: 4.4 },
  { name: 'Economía', val: 4.1 },
  { name: 'Derecho', val: 4.0 },
  { name: 'Psicología', val: 4.3 },
  { name: 'Comunicación', val: 4.0 },
];

const ESTADO = [
  { name: 'Activo', value: 78 },
  { name: 'En riesgo', value: 8 },
  { name: 'Aplazado', value: 5 },
  { name: 'Retirado', value: 4 },
  { name: 'Graduado', value: 5 },
];

const DISP = Array.from({ length: 60 }, () => ({
  promedio: 2 + Math.random() * 3,
  permanencia: 1 + Math.random() * 9,
}));

const RADAR = [
  { dim: 'Lectura crítica', eafit: 168, nacional: 152 },
  { dim: 'R. cuantitativo', eafit: 175, nacional: 154 },
  { dim: 'C. escrita', eafit: 165, nacional: 150 },
  { dim: 'Inglés', eafit: 178, nacional: 148 },
  { dim: 'C. ciudadanas', eafit: 162, nacional: 151 },
];

const COLORS = ['#2E6FFF', '#C8A24C', '#10B981', '#EF4444', '#A855F7'];

const TIPOS = [
  { id: 'bar', nombre: 'Barras', cuando: 'Comparar categorías discretas.' },
  { id: 'line', nombre: 'Líneas', cuando: 'Tendencia en el tiempo (datos continuos).' },
  { id: 'area', nombre: 'Área', cuando: 'Tendencia + magnitud acumulada.' },
  { id: 'pie', nombre: 'Pastel', cuando: 'Composición de un total. Usar solo con 3-5 categorías.' },
  { id: 'scatter', nombre: 'Dispersión', cuando: 'Relación entre dos variables continuas.' },
  { id: 'radar', nombre: 'Radar', cuando: 'Comparar múltiples dimensiones de una entidad.' },
];

const QUIZ = [
  { p: 'Tasa de retención semestre a semestre durante 5 años.', o: ['bar', 'line', 'pie', 'radar'], r: 'line', why: 'Una serie temporal con observaciones equiespaciadas se lee mejor en línea.' },
  { p: 'Distribución de estudiantes por estado de matrícula (5 categorías).', o: ['line', 'pie', 'scatter', 'area'], r: 'pie', why: 'Composición de un total con pocas categorías: el pastel funciona.' },
  { p: 'Comparar 5 competencias Saber Pro de un programa contra la media nacional.', o: ['bar', 'pie', 'radar', 'area'], r: 'radar', why: 'Múltiples dimensiones comparadas contra otra entidad: el radar evidencia fortalezas y debilidades.' },
  { p: 'Relación entre promedio acumulado y semestres cursados.', o: ['bar', 'scatter', 'line', 'pie'], r: 'scatter', why: 'Dos variables continuas: la dispersión muestra correlación, clústeres y outliers.' },
];

// === Chart Builder data ===
type Field = { id: string; label: string; type: 'cat' | 'num'; values: { name: string; value: number }[] };

const DATASET: Field[] = [
  { id: 'programa', label: 'Programa', type: 'cat',
    values: [
      { name: 'Admin', value: 1180 }, { name: 'Eco', value: 620 }, { name: 'Ing.Sis', value: 1420 },
      { name: 'Derecho', value: 980 }, { name: 'Psico', value: 720 }, { name: 'Comm', value: 540 },
    ],
  },
  { id: 'matriculados', label: 'Matriculados', type: 'num',
    values: [
      { name: 'Admin', value: 1180 }, { name: 'Eco', value: 620 }, { name: 'Ing.Sis', value: 1420 },
      { name: 'Derecho', value: 980 }, { name: 'Psico', value: 720 }, { name: 'Comm', value: 540 },
    ],
  },
  { id: 'desercion', label: 'Tasa deserción', type: 'num',
    values: [
      { name: 'Admin', value: 12 }, { name: 'Eco', value: 14 }, { name: 'Ing.Sis', value: 15 },
      { name: 'Derecho', value: 8 }, { name: 'Psico', value: 7 }, { name: 'Comm', value: 13 },
    ],
  },
  { id: 'satisfaccion', label: 'Satisfacción', type: 'num',
    values: [
      { name: 'Admin', value: 4.2 }, { name: 'Eco', value: 4.1 }, { name: 'Ing.Sis', value: 4.4 },
      { name: 'Derecho', value: 4.0 }, { name: 'Psico', value: 4.3 }, { name: 'Comm', value: 4.0 },
    ],
  },
];

type Slot = 'x' | 'y' | 'serie';

export default function M06Visualizacion() {
  const { unlock } = useAchievements();
  const [tipo, setTipo] = useState<'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'radar'>('line');
  const [respQ, setRespQ] = useState<Record<number, string>>({});
  const [revealQ, setRevealQ] = useState(false);
  const correctas = QUIZ.filter((q, i) => respQ[i] === q.r).length;

  // Chart builder state
  const [mode, setMode] = useState<'preview' | 'builder'>('preview');
  const [slots, setSlots] = useState<{ x: string | null; y: string | null }>({ x: null, y: null });
  const [builderType, setBuilderType] = useState<'bar' | 'line' | 'area'>('bar');
  const [hoverSlot, setHoverSlot] = useState<Slot | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [configCount, setConfigCount] = useState(0);

  useEffect(() => {
    if (configCount >= 1) unlock('disenador');
  }, [configCount, unlock]);

  function onDrop(e: React.DragEvent, slot: 'x' | 'y') {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    setSlots((prev) => {
      const next = { ...prev, [slot]: id };
      if (next.x && next.y) setConfigCount((c) => c + 1);
      return next;
    });
    setHoverSlot(null);
    setDragging(null);
  }

  const xField = DATASET.find((f) => f.id === slots.x);
  const yField = DATASET.find((f) => f.id === slots.y);
  const builderData = useMemo(() => {
    if (!xField || !yField) return [];
    return xField.values.map((v, i) => ({
      x: v.name,
      y: yField.values[i].value,
    }));
  }, [xField, yField]);

  return (
    <section id="visualizacion" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          tag="Visualización · Edward Tufte · Jeffrey Heer"
          title="El gráfico correcto piensa por ti."
          subtitle="Elegir mal un gráfico es como escribir un correo en el idioma equivocado: el contenido puede ser brillante, pero nadie te entiende. Aquí tienes un playground, un constructor y un quiz."
        />

        {/* Toggle modo */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setMode('preview')}
            className={`rounded-lg px-4 py-2 text-sm transition-all ${mode === 'preview' ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold' : 'border border-white/15 text-[#C9D2E8]'}`}
          >
            Galería de tipos
          </button>
          <button
            onClick={() => setMode('builder')}
            className={`rounded-lg px-4 py-2 text-sm transition-all flex items-center gap-2 ${mode === 'builder' ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold' : 'border border-white/15 text-[#C9D2E8]'}`}
          >
            <span className="text-base">⚒</span> Constructor drag & drop
          </button>
        </div>

        {mode === 'preview' && (
          <>
            {/* Tipos */}
            <div className="mb-6 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTipo(t.id as typeof tipo)}
                  className={`glass rounded-xl p-4 text-left transition-all ${
                    tipo === t.id ? 'border-[#C8A24C]/50 shadow-[0_0_20px_rgba(200,162,76,0.20)]' : ''
                  }`}
                >
                  <div className="font-display text-sm" style={{ color: tipo === t.id ? '#C8A24C' : '#C9D2E8' }}>{t.nombre}</div>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#8B95B5]">{t.cuando}</p>
                </button>
              ))}
            </div>

            {/* Playground */}
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Galería</div>
                <h3 className="font-display mt-1 text-2xl text-white">{TIPOS.find((t) => t.id === tipo)?.nombre}: ejemplo con datos académicos</h3>
              </div>

              <div className="h-[400px] rounded-2xl border border-white/5 bg-[#050816]/60 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  {tipo === 'bar' ? (
                    <BarChart data={PROGRAMAS}>
                      <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                      <XAxis dataKey="name" stroke="#8B95B5" fontSize={11} />
                      <YAxis stroke="#8B95B5" fontSize={11} domain={[3.5, 5]} />
                      <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                      <Bar dataKey="val" fill="#2E6FFF" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  ) : tipo === 'line' ? (
                    <LineChart data={RETENCION}>
                      <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                      <XAxis dataKey="semestre" stroke="#8B95B5" fontSize={11} />
                      <YAxis stroke="#8B95B5" fontSize={11} domain={[80, 95]} />
                      <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                      <Line type="monotone" dataKey="tasa" stroke="#C8A24C" strokeWidth={3} dot={{ r: 5, fill: '#C8A24C' }} />
                    </LineChart>
                  ) : tipo === 'area' ? (
                    <AreaChart data={RETENCION}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2E6FFF" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#2E6FFF" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                      <XAxis dataKey="semestre" stroke="#8B95B5" fontSize={11} />
                      <YAxis stroke="#8B95B5" fontSize={11} domain={[80, 95]} />
                      <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                      <Area type="monotone" dataKey="tasa" stroke="#2E6FFF" strokeWidth={2} fill="url(#g1)" />
                    </AreaChart>
                  ) : tipo === 'pie' ? (
                    <PieChart>
                      <Pie data={ESTADO} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} innerRadius={70} paddingAngle={3} label={(e) => e.name + ' ' + e.value + '%'} labelLine={false} fontSize={11}>
                        {ESTADO.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                    </PieChart>
                  ) : tipo === 'scatter' ? (
                    <ScatterChart>
                      <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                      <XAxis dataKey="promedio" name="Promedio" stroke="#8B95B5" fontSize={11} domain={[2, 5]} />
                      <YAxis dataKey="permanencia" name="Permanencia" stroke="#8B95B5" fontSize={11} domain={[1, 10]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                      <Scatter data={DISP} fill="#C8A24C" />
                    </ScatterChart>
                  ) : (
                    <RadarChart data={RADAR}>
                      <PolarGrid stroke="rgba(200,162,76,0.20)" />
                      <PolarAngleAxis dataKey="dim" stroke="#8B95B5" fontSize={11} />
                      <PolarRadiusAxis stroke="#5B6889" fontSize={9} />
                      <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                      <Radar dataKey="eafit" stroke="#C8A24C" fill="#C8A24C" fillOpacity={0.4} />
                      <Radar dataKey="nacional" stroke="#2E6FFF" fill="#2E6FFF" fillOpacity={0.2} />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {mode === 'builder' && (
          <div className="glass rounded-3xl p-6 md:p-8 border-gold-glow">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Constructor · arrastra y suelta campos</div>
              <h3 className="font-display mt-1 text-2xl text-white">Construye tu propio gráfico</h3>
              <p className="mt-2 text-sm text-[#8B95B5]">
                Arrastra los campos a los ejes. Combinaciones que has probado:
                <span className="ml-2 font-mono text-[#C8A24C]">{configCount}</span>
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
              {/* Sidebar de campos */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-2">Campos disponibles</div>
                <div className="space-y-2">
                  {DATASET.map((f) => (
                    <div
                      key={f.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', f.id);
                        setDragging(f.id);
                      }}
                      onDragEnd={() => setDragging(null)}
                      className={`group cursor-grab active:cursor-grabbing rounded-xl border bg-gradient-to-br from-[#1A2347] to-[#0A0E27] p-3 transition-all hover:border-[#C8A24C]/40 ${
                        f.type === 'cat' ? 'border-[#5B95FF]/30' : 'border-[#C8A24C]/30'
                      } ${dragging === f.id ? 'opacity-30 scale-95' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base text-[#8B95B5]">⋮⋮</span>
                        <div className="flex-1">
                          <div className="text-sm text-white">{f.label}</div>
                          <div className="text-[10px] uppercase tracking-wider" style={{ color: f.type === 'cat' ? '#5B95FF' : '#C8A24C' }}>
                            {f.type === 'cat' ? 'Categórico' : 'Numérico'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-2">Tipo de gráfico</div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['bar', 'line', 'area'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setBuilderType(t)}
                        className={`rounded-lg px-2 py-1.5 text-xs uppercase tracking-wider transition-all ${
                          builderType === t ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold' : 'border border-white/10 text-[#C9D2E8]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {(['x', 'y'] as const).map((slot) => (
                    <div
                      key={slot}
                      onDragOver={(e) => { e.preventDefault(); setHoverSlot(slot); }}
                      onDragLeave={() => setHoverSlot(null)}
                      onDrop={(e) => onDrop(e, slot)}
                      className={`rounded-xl border-2 border-dashed p-4 min-h-[80px] transition-all ${
                        hoverSlot === slot
                          ? 'border-[#C8A24C] bg-[#C8A24C]/10 scale-[1.02]'
                          : slots[slot]
                          ? 'border-[#C8A24C]/40 bg-[#C8A24C]/5'
                          : 'border-white/15 bg-white/[0.02]'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Eje {slot.toUpperCase()}</div>
                      {slots[slot] ? (
                        <div className="mt-2 flex items-center justify-between">
                          <div className="font-display text-base text-white">
                            {DATASET.find((f) => f.id === slots[slot])?.label}
                          </div>
                          <button
                            onClick={() => setSlots((p) => ({ ...p, [slot]: null }))}
                            className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-[#8B95B5] hover:bg-red-500/30 hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-[#5B6889]">Arrastra un campo aquí</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="h-[340px] rounded-2xl border border-white/5 bg-[#050816]/60 p-4">
                  {!slots.x || !slots.y ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-[#5B6889]">
                      <div className="text-6xl opacity-20 mb-3">📊</div>
                      <div className="text-sm">Asigna ambos ejes para ver el gráfico</div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      {builderType === 'bar' ? (
                        <BarChart data={builderData}>
                          <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                          <XAxis dataKey="x" stroke="#8B95B5" fontSize={11} />
                          <YAxis stroke="#8B95B5" fontSize={11} />
                          <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                          <Bar dataKey="y" fill="#C8A24C" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      ) : builderType === 'line' ? (
                        <LineChart data={builderData}>
                          <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                          <XAxis dataKey="x" stroke="#8B95B5" fontSize={11} />
                          <YAxis stroke="#8B95B5" fontSize={11} />
                          <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                          <Line type="monotone" dataKey="y" stroke="#C8A24C" strokeWidth={3} dot={{ r: 5, fill: '#C8A24C' }} />
                        </LineChart>
                      ) : (
                        <AreaChart data={builderData}>
                          <defs>
                            <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#C8A24C" stopOpacity={0.6} />
                              <stop offset="100%" stopColor="#C8A24C" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                          <XAxis dataKey="x" stroke="#8B95B5" fontSize={11} />
                          <YAxis stroke="#8B95B5" fontSize={11} />
                          <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                          <Area type="monotone" dataKey="y" stroke="#C8A24C" strokeWidth={2} fill="url(#gb)" />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  )}
                </div>

                {slots.x && slots.y && (
                  <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-xs text-[#8B95B5]">
                    💡 Consejo: probaste <span className="text-[#C8A24C] font-mono">{xField?.label}</span> en X y <span className="text-[#C8A24C] font-mono">{yField?.label}</span> en Y. Cambia los ejes y el tipo para ver cómo cuenta cada gráfico una historia distinta.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quiz */}
        <div className="mt-12 glass rounded-3xl p-8 border-gold-glow">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Quiz · ¿qué gráfico uso?</div>
          <h3 className="font-display mt-2 text-3xl text-white">Cuatro casos de la dirección</h3>

          <div className="mt-8 space-y-6">
            {QUIZ.map((q, i) => {
              const sel = respQ[i];
              return (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-sm text-[#C9D2E8]">
                    <span className="font-mono text-xs text-[#C8A24C] mr-2">{String(i + 1).padStart(2, '0')}</span>
                    {q.p}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.o.map((o) => {
                      const t = TIPOS.find((x) => x.id === o)!;
                      const isCorrect = revealQ && o === q.r;
                      const isWrong = revealQ && sel === o && o !== q.r;
                      return (
                        <button
                          key={o}
                          onClick={() => setRespQ({ ...respQ, [i]: o })}
                          className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                            isCorrect ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50'
                            : isWrong ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : sel === o ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold'
                            : 'bg-white/5 text-[#C9D2E8] border border-white/10'
                          }`}
                        >
                          {t.nombre}
                        </button>
                      );
                    })}
                  </div>
                  {revealQ && (
                    <div className="mt-3 text-xs text-[#8B95B5]">
                      <span className="font-semibold text-[#C8A24C]">{TIPOS.find((t) => t.id === q.r)!.nombre}: </span>
                      {q.why}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[#C9D2E8]">{revealQ && `${correctas} / ${QUIZ.length} aciertos`}</div>
            <button onClick={() => setRevealQ(!revealQ)} className="btn-gold">
              {revealQ ? 'Reintentar' : 'Verificar respuestas'}
            </button>
          </div>
        </div>

        {/* Principios */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { k: 'Data-ink ratio', d: 'Tinta solo donde aporte información. Borra todo lo decorativo.' },
            { k: 'Pre-attentive', d: 'El cerebro percibe color, posición y tamaño antes que texto.' },
            { k: 'Clutter', d: 'Si tienes que explicar el gráfico, falló. Simplifica.' },
          ].map((p) => (
            <div key={p.k} className="glass rounded-2xl p-6 card-hover">
              <div className="font-display text-xl text-white">{p.k}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#8B95B5]">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
