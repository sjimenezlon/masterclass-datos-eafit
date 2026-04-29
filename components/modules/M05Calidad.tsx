'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

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

const ISSUES = [
  { dim: 'Unicidad', detalle: 'EAF-00001 está duplicado.', color: '#EF4444' },
  { dim: 'Consistencia', detalle: 'Programa "Ing.Sistemas" vs "ISI": dos formas para lo mismo.', color: '#F59E0B' },
  { dim: 'Validez', detalle: 'Estrato 9 no existe (rango válido: 1-6).', color: '#EF4444' },
  { dim: 'Validez', detalle: 'Promedio 6.2 imposible (escala 0-5).', color: '#EF4444' },
  { dim: 'Completitud', detalle: 'Correo y promedio en blanco.', color: '#F59E0B' },
  { dim: 'Consistencia', detalle: 'Estado "Activo" / "activo" / "ACTIVO" / "A".', color: '#F59E0B' },
  { dim: 'Validez', detalle: 'Semestre "tercero" en columna numérica.', color: '#EF4444' },
  { dim: 'Validez', detalle: 'Correo "ana.botero@" sin dominio.', color: '#EF4444' },
];

export default function M05Calidad() {
  const [view, setView] = useState<'sucio' | 'limpio'>('sucio');
  const data = view === 'sucio' ? SUCIO : LIMPIO;

  return (
    <section id="calidad" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05"
          tag="Calidad de datos · 6 dimensiones DAMA"
          title="Garbage in, garbage out. Aplica a Excel, a tableros y a IA."
          subtitle="Un dataset sucio convierte el modelo más sofisticado en un mentiroso elegante. Estas son las 6 dimensiones que toda área debe medir, y un antes/después con datos académicos reales."
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

        {/* Toggle */}
        <div className="mb-6 flex items-center gap-3">
          <div className="text-xs uppercase tracking-wider text-[#8B95B5]">Vista del dataset</div>
          <button
            onClick={() => setView('sucio')}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              view === 'sucio'
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'border border-white/10 text-[#8B95B5]'
            }`}
          >
            Antes (sucio)
          </button>
          <button
            onClick={() => setView('limpio')}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              view === 'limpio'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'border border-white/10 text-[#8B95B5]'
            }`}
          >
            Después (limpio)
          </button>
        </div>

        {/* Tabla */}
        <div className="glass overflow-hidden rounded-3xl">
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
                    <td className="px-4 py-2.5 text-[#C8A24C]">{r.id}</td>
                    <td className="px-4 py-2.5 text-white">{r.nombre}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.programa}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.semestre}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.promedio === '' ? <span className="text-red-400">∅</span> : r.promedio}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.estrato}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.correo === '' ? <span className="text-red-400">∅</span> : r.correo}</td>
                    <td className="px-4 py-2.5 text-[#C9D2E8]">{r.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues detectados */}
        {view === 'sucio' && (
          <div className="mt-8 glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Problemas detectados</div>
            <h3 className="font-display mt-2 text-2xl text-white">8 fallas en 10 filas</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {ISSUES.map((x, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div
                    className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: x.color }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#C8A24C]">{x.dim}</span>
                    <span className="ml-2 text-xs text-[#C9D2E8]">{x.detalle}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#8B95B5]">
              💡 En un dataset real de 5.000 estudiantes una sola hoja sucia puede arrastrar 400-800 fallas.
              La metodología no cambia: detectar, clasificar, priorizar, corregir, monitorear.
            </p>
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
