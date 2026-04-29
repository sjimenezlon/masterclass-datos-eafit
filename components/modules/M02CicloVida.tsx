'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const FASES = [
  {
    id: 1,
    nombre: 'Captura',
    icon: '◉',
    color: '#2E6FFF',
    desc: 'Cómo y dónde nace el dato.',
    detalle:
      'Formularios de matrícula, lectoras de carnet, evaluaciones online, encuestas a egresados, importaciones desde el ICFES. Aquí se decide el 80% de la calidad final.',
    riesgo: 'Captura inconsistente entre canales (web vs presencial vs Excel) que duplica registros.',
    practica: 'Validaciones en origen: campos obligatorios, formatos, dominios cerrados.',
  },
  {
    id: 2,
    nombre: 'Almacenamiento',
    icon: '▣',
    color: '#3A82FF',
    desc: 'Dónde reposa y bajo qué reglas.',
    detalle:
      'Bases de datos transaccionales (Banner, Sirena), data lake institucional, hojas de cálculo personales (sí, todavía existen y son la fuga #1).',
    riesgo: 'Hojas Excel sin control con datos sensibles en computadores personales.',
    practica: 'SSoT (single source of truth) declarada, cifrado en reposo, backups verificados.',
  },
  {
    id: 3,
    nombre: 'Procesamiento',
    icon: '◈',
    color: '#5B95FF',
    desc: 'Limpieza, integración y transformación.',
    detalle:
      'Cruzar Banner con la plataforma de aprendizaje, normalizar nombres de programas, calcular indicadores derivados (promedio acumulado, tasa de retención).',
    riesgo: 'Cada área re-implementa el cálculo del KPI con definiciones distintas.',
    practica: 'Pipelines documentados, código versionado, definiciones únicas en el diccionario.',
  },
  {
    id: 4,
    nombre: 'Análisis',
    icon: '◇',
    color: '#7AA8FF',
    desc: 'Convertir datos en hallazgos.',
    detalle:
      'Tableros, modelos predictivos, comparaciones longitudinales, segmentaciones de cohortes, descubrimientos exploratorios.',
    riesgo: 'Confundir correlación con causalidad y tomar decisiones espurias.',
    practica: 'Hipótesis explícitas, pruebas de robustez, revisión por pares analítica.',
  },
  {
    id: 5,
    nombre: 'Uso / decisión',
    icon: '★',
    color: '#C8A24C',
    desc: 'El momento donde el dato cambia algo.',
    detalle:
      'Aprobar la apertura de un programa, intervenir un grupo de estudiantes en riesgo, redistribuir presupuesto entre áreas, ajustar un currículo.',
    riesgo: 'Producir tablero hermoso que nadie usa para decidir.',
    practica: 'Cada KPI debe tener un dueño que lo accione cuando se desvía del umbral.',
  },
  {
    id: 6,
    nombre: 'Archivo',
    icon: '▼',
    color: '#9F8242',
    desc: 'Cuando deja de ser caliente pero sigue importando.',
    detalle:
      'Datos que ya no se consultan en el día a día pero deben preservarse: cohortes graduadas, evaluaciones históricas, contratos cerrados.',
    riesgo: 'Mantener datos vivos por inercia, multiplicando costos y superficie de ataque.',
    practica: 'Política de retención clara, separación física, costos optimizados (almacenamiento frío).',
  },
  {
    id: 7,
    nombre: 'Borrado',
    icon: '✕',
    color: '#7A6432',
    desc: 'Eliminar de forma definitiva y demostrable.',
    detalle:
      'Vencimiento de retención, derecho al olvido (Habeas Data), depuración de pruebas, datos personales solicitados por el titular.',
    riesgo: '"Borrar" sin borrar de backups, logs y exports olvidados.',
    practica: 'Procedimiento documentado, certificado de borrado, verificación periódica.',
  },
];

export default function M02CicloVida() {
  const [active, setActive] = useState(1);
  const fase = FASES.find((f) => f.id === active)!;

  return (
    <section id="ciclo" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          tag="Ciclo de vida del dato"
          title="Un dato no es solo un número: es un viaje."
          subtitle="Desde que un estudiante diligencia su formulario hasta que su registro se borra años después de graduado, ese dato cruza siete momentos. Cada uno tiene riesgos y buenas prácticas distintas."
        />

        {/* Línea de tiempo horizontal */}
        <div className="glass rounded-3xl p-8">
          <div className="relative mb-12">
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-[#C8A24C]/40 to-transparent" />
            <div className="relative grid grid-cols-7 gap-2">
              {FASES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className="group flex flex-col items-center"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-mono transition-all duration-300 ${
                      active === f.id
                        ? 'border-2 border-[#C8A24C] bg-[#0A0E27] text-[#C8A24C] shadow-[0_0_24px_rgba(200,162,76,0.50)] scale-110'
                        : 'border border-white/15 bg-[#0A0E27] text-[#5B95FF] group-hover:border-[#2E6FFF]/60'
                    }`}
                  >
                    {f.icon}
                  </div>
                  <div
                    className={`mt-3 text-center text-[10px] uppercase tracking-wider transition-colors ${
                      active === f.id ? 'text-white' : 'text-[#8B95B5]'
                    }`}
                  >
                    {f.nombre}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detalle de fase */}
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <div className="font-mono text-xs text-[#C8A24C]">FASE {String(fase.id).padStart(2, '0')}</div>
              <div className="font-display mt-2 text-4xl text-white">{fase.nombre}</div>
              <div className="mt-4 text-sm uppercase tracking-wider text-[#5B95FF]">{fase.desc}</div>
              <p className="mt-6 text-base leading-relaxed text-[#C9D2E8]">{fase.detalle}</p>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="text-xs uppercase tracking-wider text-red-400">⚠ Riesgo típico</div>
              <p className="mt-3 text-sm leading-relaxed text-[#C9D2E8]">{fase.riesgo}</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="text-xs uppercase tracking-wider text-emerald-400">✓ Buena práctica</div>
              <p className="mt-3 text-sm leading-relaxed text-[#C9D2E8]">{fase.practica}</p>
            </div>
          </div>
        </div>

        {/* Caso aplicado */}
        <div className="mt-12 glass rounded-3xl p-8 border-gold-glow">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">El viaje de un dato real</div>
          <h3 className="font-display mt-3 text-2xl text-white md:text-3xl">
            “Promedio acumulado de María Sofía, 4° semestre, Ingeniería de Sistemas.”
          </h3>
          <div className="mt-6 grid gap-4 text-sm leading-relaxed text-[#C9D2E8] md:grid-cols-2">
            <ol className="space-y-3 list-none counter-reset">
              {[
                'Captura: el profesor sube la nota a Banner.',
                'Almacenamiento: queda en la base transaccional.',
                'Procesamiento: el ETL nocturno consolida todas las notas y calcula el promedio acumulado.',
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-[#C8A24C]">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <ol className="space-y-3 list-none">
              {[
                'Análisis: el tablero de retención lo usa para clasificar a María como "riesgo medio".',
                'Decisión: la dirección agenda una asesoría académica con ella.',
                'Archivo y borrado: tras 10 años de graduada, el dato pasa a almacenamiento frío y luego se anonimiza.',
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-[#C8A24C]">{String(i + 4).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
