'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

type Categoria = 'sensible' | 'pii' | 'institucional' | 'publico';

const CATEGORIAS: Record<Categoria, { label: string; color: string; desc: string }> = {
  sensible: {
    label: 'Sensible',
    color: '#EF4444',
    desc: 'Habeas Data refuerza protección. Tratamiento prohibido salvo excepciones.',
  },
  pii: {
    label: 'Personal (PII)',
    color: '#F59E0B',
    desc: 'Identifica a una persona. Requiere consentimiento y propósito.',
  },
  institucional: {
    label: 'Institucional',
    color: '#2E6FFF',
    desc: 'Operativo de la universidad. Acceso restringido al rol.',
  },
  publico: {
    label: 'Público',
    color: '#10B981',
    desc: 'Puede compartirse abiertamente. No requiere protección.',
  },
};

const CAMPOS = [
  { campo: 'Nombre del estudiante', correcta: 'pii' as Categoria },
  { campo: 'Documento de identidad', correcta: 'pii' as Categoria },
  { campo: 'Orientación sexual', correcta: 'sensible' as Categoria },
  { campo: 'Estrato socioeconómico', correcta: 'pii' as Categoria },
  { campo: 'Resultados Saber Pro agregados por programa', correcta: 'publico' as Categoria },
  { campo: 'Diagnóstico de salud mental reportado en bienestar', correcta: 'sensible' as Categoria },
  { campo: 'Promedio acumulado individual', correcta: 'pii' as Categoria },
  { campo: 'Tasa de retención de Ingeniería 2024', correcta: 'institucional' as Categoria },
  { campo: 'Datos biométricos del carnet', correcta: 'sensible' as Categoria },
  { campo: 'Religión declarada en formulario', correcta: 'sensible' as Categoria },
  { campo: 'Listado de programas vigentes', correcta: 'publico' as Categoria },
  { campo: 'Salario del personal docente', correcta: 'institucional' as Categoria },
  { campo: 'Historial de evaluación docente', correcta: 'pii' as Categoria },
  { campo: 'Origen étnico autorreportado', correcta: 'sensible' as Categoria },
  { campo: 'Calendario académico', correcta: 'publico' as Categoria },
  { campo: 'Dirección de residencia', correcta: 'pii' as Categoria },
  { campo: 'Estados financieros institucionales auditados', correcta: 'publico' as Categoria },
  { campo: 'Comentarios libres en evaluaciones (texto)', correcta: 'pii' as Categoria },
  { campo: 'Afiliación sindical declarada', correcta: 'sensible' as Categoria },
  { campo: 'Número de cohorte y año de ingreso', correcta: 'institucional' as Categoria },
];

export default function M03Tipos() {
  const [respuestas, setRespuestas] = useState<Record<number, Categoria>>({});
  const [revelar, setRevelar] = useState(false);

  const correctas = Object.entries(respuestas).filter(
    ([i, r]) => CAMPOS[Number(i)].correcta === r
  ).length;
  const respondidas = Object.keys(respuestas).length;

  return (
    <section id="tipos" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          tag="Tipos de datos"
          title="No todo dato es igual. No todo dato es protegido igual."
          subtitle="Clasificar bien es la base de la gobernanza. Arrastra cada campo a la categoría que crees correcta y descubre tu nivel de alfabetización en datos personales."
        />

        {/* Leyenda de categorías */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {(Object.keys(CATEGORIAS) as Categoria[]).map((k) => {
            const c = CATEGORIAS[k];
            return (
              <div
                key={k}
                className="glass rounded-2xl p-5"
                style={{ borderColor: `${c.color}40` }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                  <div className="text-sm font-semibold text-white">{c.label}</div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#8B95B5]">{c.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Tabla de clasificación */}
        <div className="glass rounded-3xl p-2 md:p-6">
          <div className="grid gap-2">
            {CAMPOS.map((c, i) => {
              const r = respuestas[i];
              const acerto = revelar && r === c.correcta;
              const fallo = revelar && r && r !== c.correcta;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 items-center gap-3 rounded-xl border p-3 md:grid-cols-[1fr_auto] transition-all ${
                    acerto
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : fallo
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'border-white/8 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#5B6889]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-[#C9D2E8]">{c.campo}</span>
                    {revelar && (
                      <span className="ml-2 text-xs text-[#8B95B5]">
                        {acerto ? '✓' : fallo ? `· era ${CATEGORIAS[c.correcta].label}` : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(CATEGORIAS) as Categoria[]).map((k) => {
                      const sel = r === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setRespuestas({ ...respuestas, [i]: k })}
                          className="rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all"
                          style={{
                            background: sel ? CATEGORIAS[k].color : 'rgba(255,255,255,0.04)',
                            color: sel ? 'white' : '#8B95B5',
                            border: sel ? 'none' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {CATEGORIAS[k].label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Acciones y score */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-[#C9D2E8]">
            Respondidas: <span className="font-semibold text-white">{respondidas}</span> / {CAMPOS.length}
            {revelar && (
              <span className="ml-4">
                Aciertos: <span className="font-semibold text-[#C8A24C]">{correctas}</span> / {CAMPOS.length}
                <span className="ml-2 text-xs text-[#8B95B5]">
                  ({Math.round((correctas / CAMPOS.length) * 100)}%)
                </span>
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setRevelar(false);
                setRespuestas({});
              }}
              className="btn-ghost"
            >
              Reiniciar
            </button>
            <button
              onClick={() => setRevelar(!revelar)}
              className="btn-gold"
              disabled={respondidas === 0}
            >
              {revelar ? 'Ocultar resultados' : 'Revelar respuestas'}
            </button>
          </div>
        </div>

        {/* Legal note */}
        <div className="mt-12 glass rounded-3xl p-8 border-gold-glow">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Marco regulatorio · Colombia 2026</div>
          <h3 className="font-display mt-3 text-2xl text-white">
            Ley 1581 / 2012 · Decreto 1377 / 2013 · Habeas Data
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3 text-sm text-[#C9D2E8]">
            <div>
              <div className="text-[#5B95FF] font-semibold">Principio de finalidad</div>
              <p className="mt-2 leading-relaxed">El dato solo se trata para el fin declarado en el consentimiento original.</p>
            </div>
            <div>
              <div className="text-[#5B95FF] font-semibold">Principio de seguridad</div>
              <p className="mt-2 leading-relaxed">Cifrado, control de acceso, registro de auditoría. La SIC vigila y sanciona.</p>
            </div>
            <div>
              <div className="text-[#5B95FF] font-semibold">Derecho del titular</div>
              <p className="mt-2 leading-relaxed">Cualquier persona puede pedir conocer, actualizar, rectificar o eliminar sus datos.</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-[#8B95B5]">
            Sanciones: hasta 2.000 SMLMV (≈ 2.840 millones COP en 2026) · suspensión de actividades · cierre temporal de la base.
          </p>
        </div>
      </div>
    </section>
  );
}
