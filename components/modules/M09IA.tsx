'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';

type Demo = 'desercion' | 'comentarios' | 'homologa' | 'prompt';

const COMENTARIOS = [
  { txt: 'El profesor explica muy claro y siempre responde dudas.', sent: 'positivo', tema: 'claridad' },
  { txt: 'Las clases son monótonas y nunca trae ejemplos reales.', sent: 'negativo', tema: 'metodología' },
  { txt: 'Excelente dominio del tema, aprendí mucho.', sent: 'positivo', tema: 'dominio' },
  { txt: 'Se demora demasiado en devolver las calificaciones.', sent: 'negativo', tema: 'retroalimentación' },
  { txt: 'Es estricto pero justo, exige y eso me gusta.', sent: 'positivo', tema: 'evaluación' },
  { txt: 'No prepara la clase, parece improvisar todo.', sent: 'negativo', tema: 'metodología' },
  { txt: 'Las rúbricas claras me ayudaron a saber qué esperaba.', sent: 'positivo', tema: 'evaluación' },
  { txt: 'Llega tarde y termina temprano sin justificación.', sent: 'negativo', tema: 'puntualidad' },
];

const HOMOLOGA = [
  { materia_origen: 'Cálculo I (UdeA)', destino: 'Cálculo Diferencial (EAFIT)', match: 0.94, decision: 'aprobar' },
  { materia_origen: 'Microeconomía Aplicada (Andes)', destino: 'Microeconomía (EAFIT)', match: 0.88, decision: 'aprobar' },
  { materia_origen: 'Programación en Java (Politécnico)', destino: 'Programación I (EAFIT)', match: 0.79, decision: 'revisar' },
  { materia_origen: 'Teoría de Conjuntos (Nacional)', destino: 'Matemáticas Discretas (EAFIT)', match: 0.55, decision: 'revisar' },
  { materia_origen: 'Filosofía Antigua (Externado)', destino: 'Programación I (EAFIT)', match: 0.08, decision: 'rechazar' },
];

const PROMPT_BAD = 'Hazme un análisis de los datos.';
const PROMPT_GOOD = `Eres analista de datos universitario. Adjunto un Excel con 5.000 estudiantes (estudiantes.xlsx).

Tarea:
1. Identifica los 3 programas con mayor riesgo de deserción.
2. Para cada uno, dime el perfil de los estudiantes en riesgo (estrato, género, semestre).
3. Sugiere 2 acciones concretas que podría tomar la dirección académica esta misma semana.

Formato de salida:
- Tabla resumen al inicio.
- Una sección por programa con perfil + acciones.
- Tres bullets de "lo que NO podemos concluir con estos datos".

Tono ejecutivo, máximo 600 palabras.`;

export default function M09IA() {
  const [demo, setDemo] = useState<Demo>('desercion');
  const [riesgoEstrato, setRiesgoEstrato] = useState(3);
  const [riesgoSemestre, setRiesgoSemestre] = useState(2);
  const [riesgoPromedio, setRiesgoPromedio] = useState(3.2);

  // Modelo simulado de riesgo
  const score =
    (5 - riesgoPromedio) * 22 +
    (riesgoSemestre <= 2 ? 15 : riesgoSemestre <= 4 ? 8 : 3) +
    (riesgoEstrato <= 2 ? 14 : riesgoEstrato <= 3 ? 7 : 0);

  const nivel = score > 55 ? 'ALTO' : score > 35 ? 'MEDIO' : 'BAJO';
  const color = nivel === 'ALTO' ? '#EF4444' : nivel === 'MEDIO' ? '#F59E0B' : '#10B981';

  return (
    <section id="ia" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="09"
          tag="IA aplicada · Mayo 2026"
          title="La IA no reemplaza el juicio. Lo amplifica."
          subtitle="Cuatro demos que verás funcionar en vivo: predicción de deserción, análisis de evaluación docente, recomendación de homologaciones y arte de pedirle a un modelo lo correcto."
        />

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { k: 'desercion', l: 'Predicción de riesgo' },
            { k: 'comentarios', l: 'NLP en evaluaciones' },
            { k: 'homologa', l: 'Match de homologaciones' },
            { k: 'prompt', l: 'Anatomía de un prompt' },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setDemo(t.k as Demo)}
              className={`rounded-lg px-4 py-2 text-sm transition-all ${
                demo === t.k ? 'bg-[#C8A24C] text-[#0A0E27] font-semibold' : 'border border-white/15 bg-white/[0.03] text-[#C9D2E8]'
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        {/* Demo 1: deserción */}
        {demo === 'desercion' && (
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Demo 01 · Modelo predictivo</div>
            <h3 className="font-display mt-2 text-3xl text-white">¿Quién deserta probablemente?</h3>
            <p className="mt-3 text-sm text-[#8B95B5]">
              Modelo simulado entrenado con 5.000 registros históricos. Mueve los sliders y observa cómo cambia el riesgo predicho.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-6">
                <Slider label="Estrato socioeconómico" value={riesgoEstrato} min={1} max={6} onChange={setRiesgoEstrato} />
                <Slider label="Semestre actual" value={riesgoSemestre} min={1} max={10} onChange={setRiesgoSemestre} />
                <Slider label="Promedio acumulado" value={riesgoPromedio} min={1.5} max={5.0} step={0.1} onChange={setRiesgoPromedio} />

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs uppercase tracking-wider text-[#5B95FF]">Variables del modelo</div>
                  <p className="mt-2 text-xs leading-relaxed text-[#8B95B5]">
                    Modelo simulado: en producción se usarían 25-40 variables (créditos perdidos, asistencia, evaluaciones,
                    interacción con plataforma, condiciones socioeconómicas, etc.) y un algoritmo como gradient boosting.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl border-2 p-8" style={{ borderColor: `${color}50`, background: `${color}10` }}>
                <div className="text-xs uppercase tracking-wider text-[#C9D2E8]">Riesgo de deserción predicho</div>
                <div className="font-display mt-4 text-7xl tabular-nums" style={{ color }}>
                  {nivel}
                </div>
                <div className="mt-2 font-mono text-sm text-[#8B95B5]">score: {Math.round(score)}/100</div>

                <div className="mt-8 w-full">
                  <div className="text-xs uppercase tracking-wider text-[#C8A24C] mb-3">Acción recomendada</div>
                  <div className="text-sm leading-relaxed text-[#C9D2E8]">
                    {nivel === 'ALTO' && 'Asesoría académica intensiva esta semana, evaluación socioeconómica con bienestar y plan de mejoramiento individualizado.'}
                    {nivel === 'MEDIO' && 'Sesión de seguimiento con tutor académico, revisión de carga semestral y monitoreo mensual.'}
                    {nivel === 'BAJO' && 'Continuar acompañamiento estándar. Reforzar opciones de profundización y oportunidades de excelencia.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-[#C9D2E8]">
              <span className="font-semibold text-amber-300">⚠ Sesgo importante: </span>
              un modelo entrenado solo con datos históricos perpetúa exclusiones del pasado. Toda predicción educativa cae en
              "alto riesgo" según la Ley de IA UE 2024. Requiere auditoría de fairness y supervisión humana.
            </div>
          </div>
        )}

        {/* Demo 2: comentarios */}
        {demo === 'comentarios' && (
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Demo 02 · Procesamiento de lenguaje natural</div>
            <h3 className="font-display mt-2 text-3xl text-white">8.000 comentarios libres en 30 segundos.</h3>
            <p className="mt-3 text-sm text-[#8B95B5]">
              Cada semestre la evaluación docente genera miles de comentarios libres. Un LLM los clasifica por sentimiento y tema en minutos.
            </p>

            <div className="mt-8 space-y-3">
              {COMENTARIOS.map((c, i) => (
                <div key={i} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:grid-cols-[1fr_auto_auto]">
                  <p className="text-sm italic text-[#C9D2E8]">"{c.txt}"</p>
                  <div
                    className="self-center rounded-full px-3 py-1 text-[10px] uppercase tracking-wider"
                    style={{
                      background: c.sent === 'positivo' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: c.sent === 'positivo' ? '#10B981' : '#EF4444',
                      border: `1px solid ${c.sent === 'positivo' ? '#10B98140' : '#EF444440'}`,
                    }}
                  >
                    {c.sent}
                  </div>
                  <div className="self-center rounded-full bg-[#C8A24C]/15 border border-[#C8A24C]/40 px-3 py-1 text-[10px] uppercase tracking-wider text-[#C8A24C]">
                    {c.tema}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat n="83%" l="comentarios positivos" />
              <Stat n="metodología" l="tema crítico detectado" />
              <Stat n="0:42" l="tiempo de proceso (vs días manuales)" />
            </div>
          </div>
        )}

        {/* Demo 3: homologaciones */}
        {demo === 'homologa' && (
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Demo 03 · Embeddings + similitud semántica</div>
            <h3 className="font-display mt-2 text-3xl text-white">Pre-clasificación inteligente de homologaciones</h3>
            <p className="mt-3 text-sm text-[#8B95B5]">
              El sistema vectoriza el syllabus de origen y destino y calcula similitud. Sugiere decisión, el humano revisa.
              No reemplaza al revisor: le ahorra el 70% del tiempo en casos triviales.
            </p>

            <div className="mt-8 space-y-3">
              {HOMOLOGA.map((h, i) => {
                const c = h.decision === 'aprobar' ? '#10B981' : h.decision === 'rechazar' ? '#EF4444' : '#F59E0B';
                return (
                  <div key={i} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:grid-cols-[1fr_auto_auto_auto] items-center">
                    <div>
                      <div className="text-xs text-[#8B95B5]">Origen</div>
                      <div className="text-sm text-white">{h.materia_origen}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#8B95B5]">Destino EAFIT</div>
                      <div className="text-sm text-white">{h.destino}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#8B95B5]">Match</div>
                      <div className="font-mono text-2xl" style={{ color: c }}>{(h.match * 100).toFixed(0)}%</div>
                    </div>
                    <div
                      className="self-center rounded-full px-4 py-2 text-xs uppercase tracking-wider font-semibold"
                      style={{ background: `${c}20`, color: c, border: `1px solid ${c}40` }}
                    >
                      {h.decision}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Demo 4: prompt */}
        {demo === 'prompt' && (
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-wider text-[#C8A24C]">Demo 04 · Anatomía de un prompt útil</div>
            <h3 className="font-display mt-2 text-3xl text-white">No es magia: es claridad ejecutiva.</h3>
            <p className="mt-3 text-sm text-[#8B95B5]">
              El mismo dataset, dos prompts: uno produce párrafos genéricos, el otro produce algo accionable para la dirección.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-red-400">✗ Prompt débil</div>
                <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-[#050816] border border-white/5 p-4 font-mono text-xs text-[#C9D2E8]">{PROMPT_BAD}</pre>
                <ul className="mt-4 space-y-1 text-[11px] text-[#8B95B5]">
                  <li>· Sin rol asignado al modelo</li>
                  <li>· Sin tarea específica</li>
                  <li>· Sin formato esperado</li>
                  <li>· Sin contexto del usuario</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400">✓ Prompt útil</div>
                <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-[#050816] border border-white/5 p-4 font-mono text-[11px] text-[#C9D2E8]">{PROMPT_GOOD}</pre>
                <ul className="mt-4 space-y-1 text-[11px] text-[#8B95B5]">
                  <li>· Rol claro · contexto del archivo</li>
                  <li>· Tarea específica con pasos</li>
                  <li>· Formato esperado · longitud · tono</li>
                  <li>· Pide explicitar limitaciones del análisis</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#C8A24C]/30 bg-[#C8A24C]/5 p-5">
              <div className="text-xs uppercase tracking-wider text-[#C8A24C]">RCTF · plantilla útil</div>
              <p className="mt-2 text-sm leading-relaxed text-[#C9D2E8]">
                <span className="font-semibold text-white">R</span>ol · <span className="font-semibold text-white">C</span>ontexto · <span className="font-semibold text-white">T</span>area · <span className="font-semibold text-white">F</span>ormato. Aplica para Claude, GPT, Kimi, Gemini.
              </p>
            </div>
          </div>
        )}

        {/* Modelos 2026 */}
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            { n: 'Claude Opus 4.7', d: '1M tokens · pensamiento extendido' },
            { n: 'GPT-5', d: 'Multimodal · agentes nativos' },
            { n: 'Gemini 2.5 Ultra', d: 'Búsqueda + Workspace' },
            { n: 'Llama 4', d: 'Open weights · self-host' },
          ].map((m) => (
            <div key={m.n} className="glass rounded-2xl p-5 card-hover">
              <div className="font-display text-base text-white">{m.n}</div>
              <p className="mt-1 text-xs text-[#8B95B5]">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="uppercase tracking-wider text-[#8B95B5]">{label}</span>
        <span className="font-mono text-[#C8A24C]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#C8A24C]"
      />
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
      <div className="font-display text-3xl text-grad-gold">{n}</div>
      <div className="mt-2 text-xs leading-relaxed text-[#8B95B5]">{l}</div>
    </div>
  );
}
