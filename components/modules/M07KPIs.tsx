'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionHeader from '../SectionHeader';

const PROGRAMAS = ['ADM','ECO','FIN','CON','DER','PSI','ISI','IME','ICI','IPR','BIO','COM'];

// Datos base simulados de Saber Pro 2025 por programa (puntaje promedio)
const SABER = {
  ADM: { eafit: 168, nal: 152, n: 180 },
  ECO: { eafit: 172, nal: 150, n: 95 },
  FIN: { eafit: 175, nal: 150, n: 110 },
  CON: { eafit: 165, nal: 148, n: 130 },
  DER: { eafit: 167, nal: 152, n: 165 },
  PSI: { eafit: 164, nal: 151, n: 140 },
  ISI: { eafit: 178, nal: 155, n: 220 },
  IME: { eafit: 174, nal: 153, n: 95 },
  ICI: { eafit: 173, nal: 152, n: 80 },
  IPR: { eafit: 175, nal: 154, n: 70 },
  BIO: { eafit: 169, nal: 150, n: 45 },
  COM: { eafit: 162, nal: 149, n: 90 },
};

// Tasa retención por cohorte
const RET_BASE = {
  ADM: 0.88, ECO: 0.86, FIN: 0.91, CON: 0.84, DER: 0.92, PSI: 0.93,
  ISI: 0.85, IME: 0.83, ICI: 0.81, IPR: 0.86, BIO: 0.79, COM: 0.87,
};

// Homologaciones SLA
const HOM_SLA = 30;

export default function M07KPIs() {
  const [programa, setPrograma] = useState('ADM');
  const [cohorteIngreso, setCohorteIngreso] = useState(800);
  const [activos2do, setActivos2do] = useState(704);
  const [solicitudes, setSolicitudes] = useState(120);
  const [resueltasEnSLA, setResueltasEnSLA] = useState(78);

  const tasaRetencion = useMemo(() => (activos2do / cohorteIngreso) * 100, [activos2do, cohorteIngreso]);
  const tasaCumplSLA = useMemo(() => (resueltasEnSLA / solicitudes) * 100, [resueltasEnSLA, solicitudes]);

  const compSaber = useMemo(() => {
    return PROGRAMAS.map((p) => ({
      programa: p,
      eafit: SABER[p as keyof typeof SABER].eafit,
      nacional: SABER[p as keyof typeof SABER].nal,
      delta: SABER[p as keyof typeof SABER].eafit - SABER[p as keyof typeof SABER].nal,
    })).sort((a, b) => b.delta - a.delta);
  }, []);

  return (
    <section id="kpis" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="07"
          tag="Indicadores accionables"
          title="Si nadie cambia algo cuando el dato cambia, no es un KPI."
          subtitle="Mover el indicador es la prueba ácida. Aquí calculas tres KPIs centrales de la dirección académica con datos editables y ves cómo se interpretan."
        />

        {/* KPI 1: Retención */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="glass rounded-3xl p-6 border-gold-glow lg:col-span-1">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">KPI 01</div>
            <div className="font-display mt-2 text-2xl text-white">Tasa de retención</div>
            <div className="mt-1 text-xs text-[#8B95B5]">Cohorte de primer semestre que sigue activa al inicio del segundo.</div>

            <div className="mt-6 space-y-4">
              <Field label="Cohorte de ingreso" value={cohorteIngreso} onChange={setCohorteIngreso} />
              <Field label="Activos en 2° semestre" value={activos2do} onChange={setActivos2do} max={cohorteIngreso} />
            </div>
          </div>

          <div className="glass rounded-3xl p-8 lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-7xl tabular-nums text-grad-gold">{tasaRetencion.toFixed(1)}%</div>
              <div className="mt-3 text-sm text-[#C9D2E8]">Tasa de retención semestre 1 → 2</div>
              <div className="mt-6 inline-flex flex-wrap gap-2 justify-center">
                <Tag label="Meta institucional" value=">88%" />
                <Tag label="Promedio nacional 2025" value="68%" />
                <Tag label="Status" value={tasaRetencion >= 88 ? 'Cumple ✓' : 'Brecha ⚠'} highlight={tasaRetencion >= 88 ? 'good' : 'bad'} />
              </div>
              <p className="mt-6 max-w-lg mx-auto text-xs leading-relaxed text-[#8B95B5]">
                Acción típica si baja: intervención psicoeducativa, asesoría académica intensiva, revisión de carga del primer semestre.
              </p>
            </div>
          </div>
        </div>

        {/* KPI 2: Cumplimiento SLA */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="glass rounded-3xl p-6 border-gold-glow lg:col-span-1">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">KPI 02</div>
            <div className="font-display mt-2 text-2xl text-white">SLA homologaciones</div>
            <div className="mt-1 text-xs text-[#8B95B5]">Solicitudes resueltas en ≤ {HOM_SLA} días sobre el total.</div>

            <div className="mt-6 space-y-4">
              <Field label="Solicitudes recibidas (mes)" value={solicitudes} onChange={setSolicitudes} />
              <Field label="Resueltas en ≤ 30 días" value={resueltasEnSLA} onChange={setResueltasEnSLA} max={solicitudes} />
            </div>
          </div>

          <div className="glass rounded-3xl p-8 lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-7xl tabular-nums text-grad-gold">{tasaCumplSLA.toFixed(1)}%</div>
              <div className="mt-3 text-sm text-[#C9D2E8]">Cumplimiento del SLA de 30 días</div>
              <div className="mt-6 inline-flex flex-wrap gap-2 justify-center">
                <Tag label="Meta interna" value=">80%" />
                <Tag label="Backlog actual" value={`${solicitudes - resueltasEnSLA} casos`} />
                <Tag label="Status" value={tasaCumplSLA >= 80 ? 'Cumple ✓' : 'Brecha ⚠'} highlight={tasaCumplSLA >= 80 ? 'good' : 'bad'} />
              </div>
              <p className="mt-6 max-w-lg mx-auto text-xs leading-relaxed text-[#8B95B5]">
                Acción típica si baja: re-distribuir carga entre revisores, automatizar pre-clasificación con IA, simplificar requisitos para casos repetidos.
              </p>
            </div>
          </div>
        </div>

        {/* KPI 3: Saber Pro */}
        <div className="glass rounded-3xl p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C8A24C]">KPI 03</div>
              <div className="font-display mt-2 text-2xl text-white">Brecha Saber Pro: EAFIT vs nacional</div>
              <div className="mt-1 text-xs text-[#8B95B5]">Diferencia en puntaje promedio (escala 0-300). Datos simulados 2025.</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <select value={programa} onChange={(e) => setPrograma(e.target.value)} className="rounded-lg border border-white/15 bg-[#0A0E27] px-3 py-2 text-white">
                {PROGRAMAS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-wider text-[#5B95FF]">Programa {programa}</div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs text-[#8B95B5]">EAFIT</div>
                  <div className="font-display text-3xl text-white tabular-nums">{SABER[programa as keyof typeof SABER].eafit}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B95B5]">Nacional</div>
                  <div className="font-display text-3xl text-[#5B95FF] tabular-nums">{SABER[programa as keyof typeof SABER].nal}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B95B5]">Brecha</div>
                  <div className="font-display text-3xl text-[#C8A24C] tabular-nums">+{SABER[programa as keyof typeof SABER].eafit - SABER[programa as keyof typeof SABER].nal}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B95B5]">Evaluados</div>
                  <div className="font-display text-3xl text-white tabular-nums">{SABER[programa as keyof typeof SABER].n}</div>
                </div>
              </div>
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer>
                <BarChart data={compSaber} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid stroke="rgba(200,162,76,0.08)" />
                  <XAxis type="number" stroke="#8B95B5" fontSize={11} />
                  <YAxis dataKey="programa" type="category" stroke="#8B95B5" fontSize={11} width={50} />
                  <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #C8A24C40', borderRadius: 8 }} />
                  <Bar dataKey="delta" radius={[0, 6, 6, 0]}>
                    {compSaber.map((d, i) => (
                      <Cell key={i} fill={d.programa === programa ? '#C8A24C' : '#2E6FFF'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Principios SMART */}
        <div className="mt-12 grid gap-3 md:grid-cols-5">
          {[
            { l: 'S', t: 'Específico', d: 'Definición no ambigua' },
            { l: 'M', t: 'Medible', d: 'Numero, % o escala' },
            { l: 'A', t: 'Alcanzable', d: 'Realista en el plazo' },
            { l: 'R', t: 'Relevante', d: 'Mueve el negocio' },
            { l: 'T', t: 'Temporal', d: 'Tiene fecha límite' },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="font-display text-5xl text-grad-gold">{s.l}</div>
              <div className="mt-2 text-sm text-white">{s.t}</div>
              <div className="mt-1 text-[10px] text-[#8B95B5]">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, max }: { label: string; value: number; onChange: (n: number) => void; max?: number }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-[#8B95B5]">{label}</div>
      <input
        type="number"
        value={value}
        max={max}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (max !== undefined && v > max) onChange(max);
          else if (v < 0) onChange(0);
          else onChange(v);
        }}
        className="mt-1 w-full rounded-lg border border-white/15 bg-[#0A0E27] px-3 py-2 font-mono text-lg text-white tabular-nums focus:border-[#C8A24C] focus:outline-none"
      />
    </label>
  );
}

function Tag({ label, value, highlight }: { label: string; value: string; highlight?: 'good' | 'bad' }) {
  const color = highlight === 'good' ? '#10B981' : highlight === 'bad' ? '#EF4444' : '#5B95FF';
  return (
    <div className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px]">
      <span className="text-[#8B95B5]">{label}: </span>
      <span style={{ color }} className="font-semibold">{value}</span>
    </div>
  );
}
