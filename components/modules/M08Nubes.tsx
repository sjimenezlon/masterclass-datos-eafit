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
            <a href="/datos/masterclass-eafit-todos-los-datasets.xlsx" download className="btn-gold whitespace-nowrap">
              ↓ Descargar bundle .xlsx
            </a>
          </div>

          <div className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['estudiantes.xlsx', '5.000 filas'],
              ['evaluacion_docente.xlsx', '3.000 filas'],
              ['saber_pro.xlsx', '400 filas'],
              ['homologaciones.xlsx', '1.200 filas'],
              ['trabajos_grado.xlsx', '800 filas'],
              ['servicios_transversales.xlsx', '2.400 filas'],
              ['matricula_financiera.xlsx', '4.500 filas'],
              ['todos.xlsx (bundle)', '17.300 filas'],
            ].map(([f, n]) => (
              <a
                key={f}
                href={`/datos/${f === 'todos.xlsx (bundle)' ? 'masterclass-eafit-todos-los-datasets.xlsx' : f}`}
                download
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs hover:border-[#C8A24C]/40 transition-colors"
              >
                <span className="font-mono text-[#C9D2E8]">{f}</span>
                <span className="text-[#8B95B5]">{n}</span>
              </a>
            ))}
          </div>
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
