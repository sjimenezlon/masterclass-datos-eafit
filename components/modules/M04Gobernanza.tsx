'use client';

import { useEffect, useState } from 'react';
import SectionHeader from '../SectionHeader';
import { useAchievements } from '../achievements/Provider';

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

type Situacion = {
  id: number;
  s: string;
  r: 'owner' | 'steward' | 'custodian' | 'citizen';
  why: string;
};

const SITUACIONES: Situacion[] = [
  { id: 1, s: 'Autorizar que Mercadeo use datos de evaluación docente para una campaña.', r: 'owner', why: 'La autorización de uso fuera del dominio la firma el Data Owner.' },
  { id: 2, s: 'Detectar que el campo "estrato" tiene valores fuera de rango en 200 registros.', r: 'steward', why: 'El Steward monitorea calidad y reporta desviaciones.' },
  { id: 3, s: 'Cifrar la columna documento_identidad en la base de datos.', r: 'custodian', why: 'La implementación técnica del cifrado es del Custodian.' },
  { id: 4, s: 'Descargar el tablero mensual de retención para mi reunión de equipo.', r: 'citizen', why: 'Consumir tableros autorizados es lo del Data Citizen.' },
  { id: 5, s: 'Decidir si publicamos el dataset de Saber Pro como dato abierto.', r: 'owner', why: 'Publicación externa requiere decisión del Data Owner.' },
  { id: 6, s: 'Restablecer el backup de ayer porque hubo corrupción de datos.', r: 'custodian', why: 'Operación de respaldo y recuperación es del Custodian.' },
];

export default function M04Gobernanza() {
  const { unlock } = useAchievements();
  // map: situacionId -> roleId
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [dragging, setDragging] = useState<number | null>(null);
  const [hoverRole, setHoverRole] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);

  const correctas = SITUACIONES.filter((s) => placed[s.id] === s.r).length;
  const allPlaced = Object.keys(placed).length === SITUACIONES.length;

  useEffect(() => {
    if (allPlaced && correctas === SITUACIONES.length) {
      unlock('asignador');
    }
  }, [allPlaced, correctas, unlock]);

  function onDragStart(e: React.DragEvent, id: number) {
    setDragging(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(id));
  }

  function onDrop(e: React.DragEvent, role: string) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('text/plain'));
    if (!isNaN(id)) setPlaced((prev) => ({ ...prev, [id]: role }));
    setDragging(null);
    setHoverRole(null);
  }

  const sinAsignar = SITUACIONES.filter((s) => !(s.id in placed));
  const porRol = (rid: string) => SITUACIONES.filter((s) => placed[s.id] === rid);

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
                <div className="text-xs uppercase tracking-wider" style={{ color: r.color }}>Rol</div>
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

        {/* Drag & drop simulator */}
        <div className="mt-16 glass rounded-3xl p-8 border-gold-glow">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Simulador · arrastra y suelta</div>
              <h3 className="font-display mt-2 text-3xl text-white">Asigna cada situación al rol correcto</h3>
              <p className="mt-2 text-sm text-[#8B95B5]">Toma cada tarjeta y arrástrala al rol que corresponde.</p>
            </div>
            <div className="text-sm text-[#C9D2E8]">
              {reveal && (
                <span>
                  Aciertos: <span className="font-semibold text-[#C8A24C]">{correctas}</span> / {SITUACIONES.length}
                </span>
              )}
            </div>
          </div>

          {/* Pool de situaciones sin asignar */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95B5] mb-2">Sin asignar · {sinAsignar.length}</div>
            <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] p-4 min-h-[80px]">
              {sinAsignar.length === 0 ? (
                <div className="text-center text-xs text-[#5B6889] py-4">¡Todas asignadas! Pulsa "Verificar" para ver tu score.</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {sinAsignar.map((s) => (
                    <DraggableCard key={s.id} sit={s} onDragStart={onDragStart} dragging={dragging === s.id} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Drop zones por rol */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ROLES.map((rol) => {
              const items = porRol(rol.id);
              const isHover = hoverRole === rol.id;
              return (
                <div
                  key={rol.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoverRole(rol.id);
                  }}
                  onDragLeave={() => setHoverRole(null)}
                  onDrop={(e) => onDrop(e, rol.id)}
                  className={`rounded-2xl border-2 p-4 transition-all min-h-[200px] ${
                    isHover ? 'scale-[1.02] shadow-[0_0_30px_rgba(200,162,76,0.30)]' : ''
                  }`}
                  style={{
                    borderColor: isHover ? rol.color : `${rol.color}40`,
                    background: isHover ? `${rol.color}10` : 'rgba(255,255,255,0.02)',
                    borderStyle: items.length === 0 ? 'dashed' : 'solid',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: rol.color }} />
                    <div className="text-xs font-semibold" style={{ color: rol.color }}>{rol.nombre}</div>
                    <div className="ml-auto text-[10px] text-[#8B95B5]">{items.length}</div>
                  </div>

                  <div className="space-y-2">
                    {items.length === 0 && (
                      <div className="text-center text-[10px] text-[#5B6889] py-6">Suelta aquí</div>
                    )}
                    {items.map((s) => {
                      const acerto = reveal && s.r === rol.id;
                      const fallo = reveal && s.r !== rol.id;
                      return (
                        <div
                          key={s.id}
                          draggable
                          onDragStart={(e) => onDragStart(e, s.id)}
                          className={`group relative cursor-grab rounded-lg border p-2.5 text-xs transition-all hover:bg-white/10 active:cursor-grabbing ${
                            acerto ? 'border-emerald-500/50 bg-emerald-500/10' : fallo ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-mono text-[9px] text-[#8B95B5]">{String(s.id).padStart(2, '0')}</span>
                            <p className="flex-1 leading-relaxed text-[#C9D2E8]">{s.s}</p>
                          </div>
                          {reveal && fallo && (
                            <div className="mt-2 border-t border-red-500/20 pt-1.5 text-[10px] text-red-300">
                              Era <span className="font-semibold">{ROLES.find((r) => r.id === s.r)!.nombre}</span> · {s.why}
                            </div>
                          )}
                          <button
                            onClick={() => setPlaced((p) => { const np = { ...p }; delete np[s.id]; return np; })}
                            className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-[#C9D2E8] hover:bg-red-500/40 group-hover:flex"
                            aria-label="Quitar"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => { setPlaced({}); setReveal(false); }}
              className="btn-ghost"
            >
              Reiniciar
            </button>
            <button onClick={() => setReveal(!reveal)} className="btn-gold" disabled={!allPlaced}>
              {reveal ? 'Volver a intentar' : `Verificar ${Object.keys(placed).length}/${SITUACIONES.length}`}
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

function DraggableCard({
  sit,
  onDragStart,
  dragging,
}: {
  sit: Situacion;
  onDragStart: (e: React.DragEvent, id: number) => void;
  dragging: boolean;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, sit.id)}
      className={`group cursor-grab active:cursor-grabbing rounded-xl border border-white/15 bg-gradient-to-br from-[#1A2347] to-[#0A0E27] px-3 py-2 text-xs leading-relaxed text-[#C9D2E8] shadow-md hover:border-[#C8A24C]/40 hover:shadow-[0_4px_20px_rgba(200,162,76,0.20)] transition-all max-w-[280px] ${
        dragging ? 'opacity-30 scale-95' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-[#C8A24C] text-base leading-none">⋮⋮</span>
        <div className="flex-1">
          <span className="font-mono text-[9px] text-[#8B95B5] mr-2">{String(sit.id).padStart(2, '0')}</span>
          {sit.s}
        </div>
      </div>
    </div>
  );
}
