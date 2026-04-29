export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-20 lg:px-12 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A24C]">EAFIT · 2026</div>
            <h3 className="font-display mt-3 text-3xl text-white leading-tight">
              Termina la masterclass.<br />Empieza la cultura.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#8B95B5]">
              El reto no es saber más. Es decidir mejor. Cada vez que abras un Excel, un tablero o una conversación con IA,
              recuerda: el dato es solo el primer paso del juicio humano.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#5B95FF] mb-4">Recursos descargables</div>
            <div className="text-[10px] uppercase tracking-wider text-[#C8A24C] mb-2">⚡ Versión rápida</div>
            <ul className="space-y-1.5 text-sm text-[#C9D2E8] mb-4">
              <li><a href="/datos/masterclass-eafit-rapido-todos.xlsx" download className="hover:text-[#C8A24C]">↓ Bundle rápido (1.550 filas)</a></li>
              <li><a href="/datos/estudiantes_rapido.xlsx" download className="hover:text-[#C8A24C]">↓ estudiantes_rapido.xlsx</a></li>
              <li><a href="/datos/saber_pro_rapido.xlsx" download className="hover:text-[#C8A24C]">↓ saber_pro_rapido.xlsx</a></li>
            </ul>
            <div className="text-[10px] uppercase tracking-wider text-[#5B95FF] mb-2">📊 Versión completa</div>
            <ul className="space-y-1.5 text-sm text-[#C9D2E8]">
              <li><a href="/datos/masterclass-eafit-todos-los-datasets.xlsx" download className="hover:text-[#C8A24C]">↓ Bundle completo (17.300 filas)</a></li>
              <li><a href="/datos/estudiantes.xlsx" download className="hover:text-[#C8A24C]">↓ estudiantes.xlsx</a></li>
              <li><a href="/datos/saber_pro.xlsx" download className="hover:text-[#C8A24C]">↓ saber_pro.xlsx</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#5B95FF] mb-4">Próximos pasos sugeridos</div>
            <ol className="space-y-3 text-sm text-[#C9D2E8]">
              <li><span className="font-mono text-xs text-[#C8A24C] mr-2">01</span>Sube uno de los Excel a Claude o Kimi y pide un análisis ejecutivo.</li>
              <li><span className="font-mono text-xs text-[#C8A24C] mr-2">02</span>Replica el tablero del módulo 06 en Lovable o Power BI.</li>
              <li><span className="font-mono text-xs text-[#C8A24C] mr-2">03</span>Identifica un dato que tu área genera y nadie revisa.</li>
              <li><span className="font-mono text-xs text-[#C8A24C] mr-2">04</span>Define quién es el Data Owner de ese dato. Anótalo.</li>
              <li><span className="font-mono text-xs text-[#C8A24C] mr-2">05</span>Programa una próxima reunión donde abras un tablero como ritual.</li>
            </ol>
          </div>
        </div>

        {/* Recurso para profundizar */}
        <div className="mt-16">
          <a
            href="https://que-ia-necesito.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl border-2 border-[#C8A24C]/30 bg-gradient-to-br from-[#C8A24C]/10 via-[#2E6FFF]/5 to-transparent p-8 transition-all hover:border-[#C8A24C] hover:shadow-[0_20px_60px_rgba(200,162,76,0.20)] hover:-translate-y-1"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A24C]">¿Quieres seguir profundizando?</div>
                <h3 className="font-display mt-3 text-3xl text-white leading-tight">
                  ¿Qué IA necesito? <span className="text-grad-gold">→</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#C9D2E8] max-w-xl">
                  Cualquier duda que te quede sobre herramientas, casos de uso o cómo escoger la IA correcta para tu proceso,
                  ve al directorio curado de 100+ herramientas con búsqueda, filtros por categoría y un capítulo dedicado al sector público colombiano.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="font-mono text-xs text-[#5B95FF] group-hover:text-[#C8A24C] transition-colors">
                  que-ia-necesito.vercel.app
                </div>
                <div className="rounded-full border border-[#C8A24C]/40 bg-[#C8A24C]/10 px-5 py-2 text-xs text-[#F0C674] group-hover:bg-[#C8A24C] group-hover:text-[#0A0E27] group-hover:border-[#C8A24C] transition-all">
                  Abrir guía →
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 items-end border-t border-white/5 pt-8">
          <div className="text-xs text-[#5B6889]">
            Diseñada por Santiago Jiménez · Universidad EAFIT · 2026<br />
            Datos 100% simulados con fines pedagógicos. Cualquier coincidencia es casual.
          </div>
          <div className="text-xs text-[#5B6889] md:text-right">
            Stack: Next.js 16 · Tailwind v4 · Recharts · SheetJS · Vercel<br />
            Ley 1581 / 2012 · DAMA-DMBOK2 · ISO/IEC 42001 · NIST AI RMF
          </div>
        </div>
      </div>
    </footer>
  );
}
