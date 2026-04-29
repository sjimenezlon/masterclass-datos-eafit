'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const ROLES = [
  {
    id: 'owner',
    nombre: 'Data Owner',
    color: '#C8A24C',
    quien: 'Director(a) de Desarrollo Académico',
    responsabilidades: [
      'Aprueba clasificación y políticas del dato',
      'Autoriza accesos al dominio',
      'Firma compromisos de calidad y SLA',
      'Es responsable legal ante auditorías',
    ],
    no: 'No escribe SQL ni opera dashboards.',
  },
  {
    id: 'steward',
    nombre: 'Data Steward',
    color: '#2E6FFF',
    quien: 'Analista o coordinador en el área',
    responsabilidades: [
      'Documenta cada campo en el diccionario',
      'Monitorea calidad y reporta desviaciones',
      'Capacita a usuarios del dominio',
      'Levanta requerimientos para TI',
    ],
    no: 'No es dueño del dato; es su custodio funcional.',
  },
  {
    id: 'custodian',
    nombre: 'Data Custodian',
    color: '#5B95FF',
    quien: 'Equipo de TI / DBA',
    responsabilidades: [
      'Opera bases de datos y backups',
      'Aplica controles de seguridad técnicos',
      'Implementa accesos definidos por el Owner',
      'Garantiza disponibilidad e integridad',
    ],
    no: 'No decide qué se hace con el dato; lo custodia.',
  },
  {
    id: 'citizen',
    nombre: 'Data Citizen',
    color: '#10B981',
    quien: 'Cualquier funcionario que usa datos',
    responsabilidades: [
      'Consume tableros y descarga reportes autorizados',
      'Reporta inconsistencias que detecta',
      'Aplica criterios de privacidad',
      'Aporta a la cultura del dato',
    ],
    no: 'No requiere capacidades técnicas profundas.',
  },
];

const SITUACIONES = [
  {
    s: 'Necesito autorizar que el área de Mercadeo use los datos de evaluación docente para una campaña.',
    r: 'owner',
    why: 'La autorización de uso fuera del dominio la firma el Data Owner.',
  },
  {
    s: 'Detecté que el campo "estrato" tiene valores fuera de rango (8, 9) en 200 registros.',
    r: 'steward',
    why: 'El Steward monitorea calidad y reporta desviaciones para que TI las corrija.',
  },
  {
    s: 'Hay que cifrar la columna documento_identidad en la base de datos.',
    r: 'custodian',
    why: 'La implementación técnica del cifrado es responsabilidad del Custodian.',
  },
  {
    s: 'Quiero descargar el tablero mensual de retención para mi reunión de equipo.',
    r: 'citizen',
    why: 'Consumir tableros autorizados es la actividad típica del Data Citizen.',
  },
  {
    s: 'Hay que decidir si publicamos el dataset agregado de Saber Pro como dato abierto.',
    r: 'owner',
    why: 'Publicación externa requiere decisión estratégica del Data Owner.',
  },
  {
    s: 'Necesitamos restablecer el backup de ayer porque hubo corrupción de datos.',
    r: 'custodian',
    why: 'Operación técnica de respaldo y recuperación: dominio del Custodian.',
  },
];

export default function M04Gobernanza() {
  const [resp, setResp] = useState<Record<number, string>>({});
  const [reveal, setReveal] = useState(false);
  const correctas = SITUACIONES.filter((s, i) => resp[i] === s.r).length;

  return (
    <section id="gobernanza" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          tag="Gobernanza · DAMA-DMBOK2 · ISO 38505"
          title="Datos sin dueño son datos sin futuro."
          subtitle="La gobernanza no es una herramienta: es una distribución clara de roles. Si no sabes quién aprueba, quién monitorea y quién opera, no tienes gobernanza, tienes intuición."
        />

        {/* Roles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r) => (
            <div
              key={r.id}
              className="glass rounded-3xl p-6 card-hover"
              style={{ borderColor: `${r.color}30` }}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                <div className="text-xs uppercase tracking-wider" style={{ color: r.color }}>
                  Rol
                </div>
              </div>
              <div className="font-display mt-2 text-2xl text-white">{r.nombre}</div>
              <div className="mt-1 text-xs text-[#8B95B5]">{r.quien}</div>

              <ul className="mt-6 space-y-2">
                {r.responsabilidades.map((x) => (
                  <li key={x} className="flex gap-2 text-xs leading-relaxed text-[#C9D2E8]">
                    <span style={{ color: r.color }}>›</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-lg border border-white/8 bg-white/[0.03] p-3 text-[11px] italic text-[#8B95B5]">
                {r.no}
              </div>
            </div>
          ))}
        </div>

        {/* Simulador */}
        <div className="mt-16 glass rounded-3xl p-8 border-gold-glow">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Simulador · ¿quién decide?</div>
          <h3 className="font-display mt-3 text-3xl text-white">
            Asigna cada situación al rol correcto
          </h3>
          <p className="mt-3 text-sm text-[#8B95B5]">Escenarios reales en una dirección académica.</p>

          <div className="mt-8 space-y-4">
            {SITUACIONES.map((s, i) => {
              const sel = resp[i];
              const acerto = reveal && sel === s.r;
              const fallo = reveal && sel && sel !== s.r;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 transition-all ${
                    acerto
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : fallo
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <p className="flex-1 text-sm text-[#C9D2E8]">
                      <span className="font-mono text-xs text-[#C8A24C] mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {s.s}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setResp({ ...resp, [i]: r.id })}
                          className="rounded-lg px-3 py-1.5 text-xs transition-all"
                          style={{
                            background: sel === r.id ? r.color : 'rgba(255,255,255,0.04)',
                            color: sel === r.id ? '#0A0E27' : '#C9D2E8',
                            fontWeight: sel === r.id ? 600 : 400,
                          }}
                        >
                          {r.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                  {reveal && (
                    <div className="mt-3 text-xs text-[#8B95B5]">
                      <span className="font-semibold text-[#C8A24C]">
                        {acerto ? '✓ Correcto · ' : '✗ Era ' + ROLES.find((r) => r.id === s.r)!.nombre + ' · '}
                      </span>
                      {s.why}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[#C9D2E8]">
              {reveal && `${correctas} / ${SITUACIONES.length} aciertos`}
            </div>
            <button onClick={() => setReveal(!reveal)} className="btn-gold" disabled={Object.keys(resp).length === 0}>
              {reveal ? 'Volver a intentar' : 'Verificar'}
            </button>
          </div>
        </div>

        {/* Frameworks */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { k: 'DAMA-DMBOK2', d: 'Body of Knowledge en gestión de datos. 11 áreas, biblia operativa.', l: 'dama.org' },
            { k: 'ISO/IEC 38505', d: 'Estándar internacional de gobernanza de datos. Foco en accountability.', l: 'iso.org' },
            { k: 'NIST AI RMF', d: 'Marco de gestión de riesgos para sistemas de IA. Govern · Map · Measure · Manage.', l: 'nist.gov' },
          ].map((f) => (
            <div key={f.k} className="glass rounded-2xl p-6 card-hover">
              <div className="font-display text-xl text-white">{f.k}</div>
              <p className="mt-2 text-xs leading-relaxed text-[#8B95B5]">{f.d}</p>
              <div className="mt-3 font-mono text-[10px] text-[#C8A24C]">{f.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
