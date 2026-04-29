'use client';

import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import SectionHeader from '../SectionHeader';

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

const DISP = Array.from({ length: 60 }, (_, i) => ({
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
  {
    p: 'Quieres mostrar la tasa de retención semestre a semestre durante 5 años. ¿Qué gráfico es el más adecuado?',
    o: ['bar', 'line', 'pie', 'radar'],
    r: 'line',
    why: 'Una serie temporal con observaciones equiespaciadas se lee mejor en línea: muestra la dirección y la magnitud del cambio.',
  },
  {
    p: 'La directora pide ver cómo se distribuyen los estudiantes por estado de matrícula (5 categorías).',
    o: ['line', 'pie', 'scatter', 'area'],
    r: 'pie',
    why: 'Composición de un total con pocas categorías: el pastel funciona. Si fueran más de 5 mejor barras.',
  },
  {
    p: 'Necesitas comparar los puntajes de 5 competencias Saber Pro de un programa contra la media nacional.',
    o: ['bar', 'pie', 'radar', 'area'],
    r: 'radar',
    why: 'Múltiples dimensiones de una entidad comparadas contra otra: el radar evidencia fortalezas y debilidades en simultáneo.',
  },
  {
    p: 'Quieres explorar si existe relación entre el promedio acumulado y los semestres cursados.',
    o: ['bar', 'scatter', 'line', 'pie'],
    r: 'scatter',
    why: 'Dos variables continuas: la dispersión muestra correlación, clústeres y outliers de un vistazo.',
  },
];

export default function M06Visualizacion() {
  const [tipo, setTipo] = useState<'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'radar'>('line');
  const [respQ, setRespQ] = useState<Record<number, string>>({});
  const [revealQ, setRevealQ] = useState(false);
  const correctas = QUIZ.filter((q, i) => respQ[i] === q.r).length;

  return (
    <section id="visualizacion" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          tag="Visualización · Edward Tufte · Jeffrey Heer"
          title="El gráfico correcto piensa por ti."
          subtitle="Elegir mal un gráfico es como escribir un correo en el idioma equivocado: el contenido puede ser brillante, pero nadie te entiende. Aquí tienes un playground y un quiz para entrenar el ojo."
        />

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
              <div className="font-display text-sm" style={{ color: tipo === t.id ? '#C8A24C' : '#C9D2E8' }}>
                {t.nombre}
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-[#8B95B5]">{t.cuando}</p>
            </button>
          ))}
        </div>

        {/* Playground */}
        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Playground</div>
              <h3 className="font-display mt-1 text-2xl text-white">
                {TIPOS.find((t) => t.id === tipo)?.nombre}: ejemplo con datos académicos
              </h3>
            </div>
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
                  <YAxis dataKey="permanencia" name="Permanencia (sem)" stroke="#8B95B5" fontSize={11} domain={[1, 10]} />
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
                            isCorrect
                              ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50'
                              : isWrong
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : sel === o
                              ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold'
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
