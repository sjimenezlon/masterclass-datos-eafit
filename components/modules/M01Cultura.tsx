'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const NODES = [
  { id: 'estudiantes', label: 'Estudiantes', x: 50, y: 50, size: 'huge', children: ['matrícula', 'desempeño', 'permanencia', 'graduación'] },
  { id: 'profesores', label: 'Profesores', x: 18, y: 25, size: 'large', children: ['evaluación docente', 'planeación', 'dedicación'] },
  { id: 'programas', label: 'Programas', x: 82, y: 25, size: 'large', children: ['acreditación', 'currículo', 'Saber Pro'] },
  { id: 'investigacion', label: 'Investigación', x: 18, y: 75, size: 'medium', children: ['publicaciones', 'grupos', 'tesis'] },
  { id: 'servicios', label: 'Servicios transversales', x: 82, y: 75, size: 'large', children: ['homologaciones', 'reingresos', 'movilidad'] },
  { id: 'financiero', label: 'Matrícula financiera', x: 50, y: 92, size: 'medium', children: ['valor', 'becas', 'mora'] },
  { id: 'aprendizaje', label: 'Resultados de aprendizaje', x: 50, y: 8, size: 'medium', children: ['competencias', 'rúbricas', 'evidencias'] },
];

const FRASES = [
  '“Sin datos, eres solo otra persona con una opinión.” — W. Edwards Deming',
  '“Los datos son el nuevo petróleo, pero solo si saben fluir.” — adaptación de Clive Humby',
  '“Una organización con cultura del dato no decide a ciegas; decide con humildad informada.”',
];

export default function M01Cultura() {
  const [selected, setSelected] = useState<string>('estudiantes');
  const node = NODES.find((n) => n.id === selected)!;

  return (
    <section id="cultura" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          tag="Cultura del dato"
          title="Antes de pedir un tablero, mira el ecosistema."
          subtitle="Cada rincón de la academia genera datos. Reconocer ese mapa mental es el primer ejercicio de cualquier estrategia. Toca un nodo y descubre qué se cocina ahí."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Mapa mental */}
          <div className="glass relative aspect-square w-full rounded-3xl p-6">
            <div className="absolute inset-0 grid-pattern opacity-20 rounded-3xl" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {NODES.filter((n) => n.id !== 'estudiantes').map((n) => (
                <line
                  key={n.id}
                  x1={50}
                  y1={50}
                  x2={n.x}
                  y2={n.y}
                  stroke={selected === n.id ? '#C8A24C' : 'rgba(46, 111, 255, 0.30)'}
                  strokeWidth={selected === n.id ? '0.4' : '0.2'}
                  strokeDasharray={selected === n.id ? '0' : '0.8 0.8'}
                />
              ))}
            </svg>

            {NODES.map((n) => {
              const sizeClass =
                n.size === 'huge'
                  ? 'h-32 w-32 text-base'
                  : n.size === 'large'
                  ? 'h-24 w-24 text-sm'
                  : 'h-20 w-20 text-xs';
              const isSel = selected === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelected(n.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${sizeClass} flex items-center justify-center text-center font-medium transition-all duration-300 ${
                    isSel
                      ? 'border-2 border-[#C8A24C] bg-gradient-to-br from-[#C8A24C]/30 to-[#2E6FFF]/20 text-white shadow-[0_0_30px_rgba(200,162,76,0.40)]'
                      : 'border border-white/15 bg-white/5 text-[#C9D2E8] hover:border-[#2E6FFF]/60 hover:bg-[#2E6FFF]/10'
                  }`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  {n.label}
                </button>
              );
            })}
          </div>

          {/* Detalle */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Dominio seleccionado</div>
              <div className="font-display mt-2 text-3xl text-white">{node.label}</div>
              <div className="mt-6 space-y-3">
                {node.children.map((c) => (
                  <div key={c} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#C8A24C] to-[#2E6FFF]" />
                    <div className="text-sm text-[#C9D2E8]">{c}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Pregunta orientadora</div>
              <p className="mt-3 text-lg leading-relaxed text-white">
                ¿Cuál de estos datos nadie está revisando hoy y debería?
              </p>
              <p className="mt-2 text-sm text-[#8B95B5]">
                La respuesta suele ser un pedazo de oro escondido en archivos de Excel sueltos.
              </p>
            </div>
          </div>
        </div>

        {/* Frases */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FRASES.map((f) => (
            <blockquote
              key={f}
              className="glass rounded-2xl p-6 text-sm italic leading-relaxed text-[#C9D2E8] card-hover"
            >
              {f}
            </blockquote>
          ))}
        </div>

        {/* Pilares */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {[
            { k: 'Liderazgo', d: 'Si los directivos no usan datos, nadie lo hará.' },
            { k: 'Alfabetización', d: 'Toda el área debe leer un gráfico sin sentirse extranjera.' },
            { k: 'Acceso responsable', d: 'Datos disponibles para quien decide, con privacidad.' },
            { k: 'Rituales', d: 'Reuniones donde abrir el tablero es rutina, no excepción.' },
          ].map((p, i) => (
            <div key={p.k} className="glass rounded-2xl p-6 card-hover">
              <div className="font-mono text-xs text-[#C8A24C]">PILAR {String(i + 1).padStart(2, '0')}</div>
              <div className="font-display mt-2 text-xl text-white">{p.k}</div>
              <p className="mt-3 text-sm leading-relaxed text-[#8B95B5]">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
