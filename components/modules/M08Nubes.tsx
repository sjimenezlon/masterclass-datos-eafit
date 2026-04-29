'use client';

import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import ExcelAnalyzer from '../ExcelAnalyzer';

const TOOLS = [
  {
    nombre: 'Vercel',
    cat: 'Frontend / IA apps',
    color: '#FFFFFF',
    desc: 'Plataforma para desplegar aplicaciones web con un git push. Integra dominios, edge runtime, observabilidad y agentes IA.',
    pros: ['Deploy en minutos', 'Plan gratis para experimentar', 'Templates con Next.js + IA listos'],
    contras: ['Pensado para devs', 'Costos crecen con tráfico'],
    uso: 'Tablero institucional con datos públicos, micrositios de transparencia, observatorios.',
    url: 'vercel.com',
    icon: '▲',
  },
  {
    nombre: 'Lovable',
    cat: 'No-code IA',
    color: '#FF6B9D',
    desc: 'Plataforma 2024+ que convierte descripciones en lenguaje natural en aplicaciones web funcionales. Conecta a Supabase para datos.',
    pros: ['Sin escribir código', 'Útil para prototipos rápidos', 'Auto-deploy incluido'],
    contras: ['Lock-in en su ecosistema', 'Difícil para flujos complejos'],
    uso: 'Prototipar un mini-app de seguimiento de un programa o un formulario inteligente.',
    url: 'lovable.dev',
    icon: '♥',
  },
  {
    nombre: 'Claude',
    cat: 'IA conversacional',
    color: '#D97757',
    desc: 'Asistente de Anthropic. Opus 4.7 (1M de contexto), pensamiento extendido y herramientas. Excelente para análisis, código y razonamiento.',
    pros: ['Contexto enorme (1M tokens)', 'Calidad de razonamiento alta', 'Modo de pensamiento explícito'],
    contras: ['Pago por uso intensivo', 'Sin acceso web por defecto'],
    uso: 'Analizar un Excel pegado, redactar políticas, generar tableros completos en HTML.',
    url: 'claude.ai',
    icon: '✸',
  },
  {
    nombre: 'Kimi (Moonshot)',
    cat: 'IA china con contexto largo',
    color: '#7E57C2',
    desc: 'Asistente de Moonshot AI. Famoso por su ventana de contexto extensa y manejo nativo de múltiples archivos.',
    pros: ['Procesa múltiples PDFs/Excel a la vez', 'Buena traducción', 'Plan gratuito generoso'],
    contras: ['Privacidad bajo legislación china', 'Menor adopción en LatAm'],
    uso: 'Subir 10 syllabus de un programa y pedir un resumen comparativo en minutos.',
    url: 'kimi.com',
    icon: '◐',
  },
  {
    nombre: 'Power BI',
    cat: 'BI corporativo',
    color: '#F2C811',
    desc: 'Suite de Microsoft para tableros empresariales. Integración nativa con Excel, SharePoint y Office 365.',
    pros: ['Estándar corporativo', 'Curva conocida desde Excel', 'Gobernanza centralizada'],
    contras: ['Costo por licencia Pro/Premium', 'Pesado para usuarios casuales'],
    uso: 'Tableros institucionales recurrentes con datos sensibles bajo dominio corporativo.',
    url: 'powerbi.microsoft.com',
    icon: '▦',
  },
  {
    nombre: 'Tableau',
    cat: 'BI visual',
    color: '#3DB7E4',
    desc: 'Pionero en visualización analítica. Salesforce lo adquirió en 2019. Fortaleza: visualización exploratoria.',
    pros: ['Visualización superior', 'Comunidad amplia', 'Buenos drag-and-drop'],
    contras: ['Costo alto', 'Menos integración con Office'],
    uso: 'Análisis profundo de cohortes con visualizaciones complejas para juntas directivas.',
    url: 'tableau.com',
    icon: '▶',
  },
  {
    nombre: 'Looker Studio',
    cat: 'BI gratuito',
    color: '#4285F4',
    desc: 'Herramienta gratuita de Google. Ideal para tableros públicos y casos donde el costo es prioridad.',
    pros: ['100% gratis', 'Conecta con Google Sheets', 'Compartible por URL'],
    contras: ['Limitado para datasets grandes', 'Personalización menor'],
    uso: 'Tablero público de indicadores de rendición de cuentas.',
    url: 'lookerstudio.google.com',
    icon: '⌖',
  },
  {
    nombre: 'Snowflake',
    cat: 'Data Warehouse',
    color: '#29B5E8',
    desc: 'Data warehouse en nube. Separación storage/compute permite escalar consultas masivas sin operar servidores.',
    pros: ['Escalado automático', 'Compatibilidad SQL estándar', 'Marketplace de datos'],
    contras: ['Costo por consulta puede sorprender', 'Requiere ingeniería de datos'],
    uso: 'Consolidar Banner + plataforma de aprendizaje + financiero en un único almacén analítico.',
    url: 'snowflake.com',
    icon: '❄',
  },
  {
    nombre: 'Databricks',
    cat: 'Lakehouse + IA',
    color: '#FF3621',
    desc: 'Plataforma unificada para data engineering, BI y ML. Inventores del concepto Lakehouse.',
    pros: ['Datos crudos y modelados juntos', 'MLflow para gobierno de modelos', 'Spark a escala'],
    contras: ['Curva de aprendizaje técnica', 'Cara para casos pequeños'],
    uso: 'Plataforma analítica institucional con ML para predicción de deserción y NLP en evaluaciones.',
    url: 'databricks.com',
    icon: '◤',
  },
  {
    nombre: 'AWS / Azure / GCP',
    cat: 'Nubes hyperscaler',
    color: '#FF9900',
    desc: 'Las tres nubes globales. Storage, cómputo, bases de datos, IA. EAFIT ya tiene presencia mixta en 2026.',
    pros: ['Ecosistema completo', 'Cumplimiento ISO 27001 / SOC 2', 'Acuerdos académicos'],
    contras: ['Curva de aprendizaje', 'Costos opacos'],
    uso: 'Infraestructura base. Almacenamiento, autenticación, ML services.',
    url: 'aws.amazon.com · azure.microsoft.com · cloud.google.com',
    icon: '☁',
  },
];

const CATEGORIAS = ['Todas', 'IA', 'BI', 'Nube', 'No-code'] as const;

export default function M08Nubes() {
  const [filtro, setFiltro] = useState<typeof CATEGORIAS[number]>('Todas');
  const [datasetSize, setDatasetSize] = useState<'rapido' | 'completo'>('rapido');

  const visibles = TOOLS.filter((t) => {
    if (filtro === 'Todas') return true;
    if (filtro === 'IA') return t.cat.includes('IA');
    if (filtro === 'BI') return t.cat.includes('BI');
    if (filtro === 'Nube') return t.cat.includes('Warehouse') || t.cat.includes('Lakehouse') || t.cat.includes('hyperscaler');
    if (filtro === 'No-code') return t.cat.includes('No-code') || t.cat.includes('Frontend');
    return true;
  });

  return (
    <section id="nubes" className="relative px-6 py-32 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="08"
          tag="Nubes y herramientas"
          title="El kit 2026 para el área administrativa."
          subtitle="No es necesario aprender todo. Pero sí saber qué herramienta sirve para qué momento. Aquí está la radiografía con sus links: descarga el Excel y experimenta sin pedir permiso."
        />

        {/* Banner descarga */}
        <div className="mb-12 glass rounded-3xl p-8 border-gold-glow">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A24C]">Lleva los datos a cualquier herramienta</div>
              <h3 className="font-display mt-2 text-3xl text-white">7 datasets simulados · listos para descargar</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#C9D2E8]">
                Estudiantes · Evaluación docente · Saber Pro · Homologaciones · Trabajos de grado · Servicios transversales · Matrícula financiera.
                Súbelos a Lovable, Vercel, Power BI, Tableau, Claude, Kimi, ChatGPT y crea tableros, predicciones y resúmenes.
              </p>
            </div>
            <a
              href={datasetSize === 'rapido' ? '/datos/masterclass-eafit-rapido-todos.xlsx' : '/datos/masterclass-eafit-todos-los-datasets.xlsx'}
              download
              className="btn-gold whitespace-nowrap"
            >
              ↓ Bundle {datasetSize === 'rapido' ? 'rápido' : 'completo'}
            </a>
          </div>

          {/* Toggle Rápido vs Completo */}
          <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-[#050816]/60 p-1">
            <button
              onClick={() => setDatasetSize('rapido')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs transition-all ${
                datasetSize === 'rapido'
                  ? 'bg-gradient-to-r from-[#C8A24C] to-[#F0C674] text-[#0A0E27] font-semibold shadow-lg'
                  : 'text-[#C9D2E8] hover:text-white'
              }`}
            >
              <span>⚡</span>
              Rápido <span className="opacity-70 hidden sm:inline">· para ejercicios en clase</span>
            </button>
            <button
              onClick={() => setDatasetSize('completo')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs transition-all ${
                datasetSize === 'completo'
                  ? 'bg-gradient-to-r from-[#2E6FFF] to-[#5B95FF] text-white font-semibold shadow-lg'
                  : 'text-[#C9D2E8] hover:text-white'
              }`}
            >
              <span>📊</span>
              Completo <span className="opacity-70 hidden sm:inline">· para análisis profundo</span>
            </button>
          </div>

          {/* Texto de contexto */}
          <p className="mt-3 text-xs text-[#8B95B5]">
            {datasetSize === 'rapido'
              ? 'Versión liviana (≤300 filas por dataset). Perfecta para subir a Claude, Kimi, ChatGPT o Lovable y obtener resultados en segundos. Total: ~1.550 filas.'
              : 'Versión completa con datasets robustos para análisis profundo, modelos de ML y dashboards realistas. Total: ~17.300 filas.'}
          </p>

          <div className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {(datasetSize === 'rapido'
              ? [
                  { f: 'estudiantes_rapido.xlsx', n: '300 filas' },
                  { f: 'evaluacion_docente_rapido.xlsx', n: '250 filas' },
                  { f: 'saber_pro_rapido.xlsx', n: '100 filas' },
                  { f: 'homologaciones_rapido.xlsx', n: '200 filas' },
                  { f: 'trabajos_grado_rapido.xlsx', n: '150 filas' },
                  { f: 'servicios_transversales_rapido.xlsx', n: '250 filas' },
                  { f: 'matricula_financiera_rapido.xlsx', n: '300 filas' },
                  { f: 'masterclass-eafit-rapido-todos.xlsx', n: '1.550 filas (bundle)' },
                ]
              : [
                  { f: 'estudiantes.xlsx', n: '5.000 filas' },
                  { f: 'evaluacion_docente.xlsx', n: '3.000 filas' },
                  { f: 'saber_pro.xlsx', n: '400 filas' },
                  { f: 'homologaciones.xlsx', n: '1.200 filas' },
                  { f: 'trabajos_grado.xlsx', n: '800 filas' },
                  { f: 'servicios_transversales.xlsx', n: '2.400 filas' },
                  { f: 'matricula_financiera.xlsx', n: '4.500 filas' },
                  { f: 'masterclass-eafit-todos-los-datasets.xlsx', n: '17.300 filas (bundle)' },
                ]
            ).map(({ f, n }) => (
              <a
                key={f}
                href={`/datos/${f}`}
                download
                className={`group flex items-center justify-between rounded-lg border bg-white/[0.03] px-3 py-2 text-xs transition-colors ${
                  datasetSize === 'rapido'
                    ? 'border-[#C8A24C]/20 hover:border-[#C8A24C]/60'
                    : 'border-white/10 hover:border-[#5B95FF]/40'
                }`}
              >
                <span className="font-mono text-[#C9D2E8] truncate">{f}</span>
                <span className="text-[#8B95B5] flex-shrink-0 ml-2">{n}</span>
              </a>
            ))}
          </div>

          {/* Idea de ejercicios rápidos */}
          {datasetSize === 'rapido' && (
            <div className="mt-6 rounded-2xl border border-[#C8A24C]/20 bg-[#C8A24C]/5 p-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C8A24C]">Ideas para 5 minutos</div>
              <div className="mt-3 grid gap-3 md:grid-cols-3 text-xs leading-relaxed text-[#C9D2E8]">
                <div className="flex gap-2">
                  <span className="font-mono text-[#C8A24C]">1</span>
                  <span>Sube <code className="text-[#F0C674]">estudiantes_rapido.xlsx</code> a Claude y pídele un perfil de los estudiantes en riesgo.</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[#C8A24C]">2</span>
                  <span>Pega <code className="text-[#F0C674]">saber_pro_rapido.xlsx</code> en Lovable y crea un tablero comparativo en 3 minutos.</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[#C8A24C]">3</span>
                  <span>Carga <code className="text-[#F0C674]">homologaciones_rapido.xlsx</code> en Power BI/Looker y mide cumplimiento del SLA.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Excel Analyzer */}
        <div className="mb-12">
          <ExcelAnalyzer />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
                filtro === c ? 'bg-[#C8A24C] text-[#0A0E27]' : 'border border-white/15 bg-white/[0.03] text-[#C9D2E8]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Cards de herramientas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((t) => (
            <div key={t.nombre} className="glass rounded-3xl p-6 card-hover" style={{ borderColor: `${t.color}30` }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}40` }}
                >
                  {t.icon}
                </div>
                <div>
                  <div className="font-display text-lg text-white">{t.nombre}</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: t.color }}>{t.cat}</div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#C9D2E8]">{t.desc}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <div className="text-emerald-400 mb-1">+ A favor</div>
                  <ul className="space-y-1 text-[#8B95B5]">
                    {t.pros.map((p) => <li key={p}>· {p}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="text-red-400 mb-1">− En contra</div>
                  <ul className="space-y-1 text-[#8B95B5]">
                    {t.contras.map((p) => <li key={p}>· {p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-wider text-[#C8A24C]">Caso EAFIT</div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#C9D2E8]">{t.uso}</p>
              </div>

              <div className="mt-3 font-mono text-[10px] text-[#5B95FF]">{t.url}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
