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
            <ul className="space-y-2 text-sm text-[#C9D2E8]">
              <li><a href="/datos/masterclass-eafit-todos-los-datasets.xlsx" download className="hover:text-[#C8A24C]">↓ Bundle de 7 datasets</a></li>
              <li><a href="/datos/estudiantes.xlsx" download className="hover:text-[#C8A24C]">↓ estudiantes.xlsx</a></li>
              <li><a href="/datos/evaluacion_docente.xlsx" download className="hover:text-[#C8A24C]">↓ evaluacion_docente.xlsx</a></li>
              <li><a href="/datos/saber_pro.xlsx" download className="hover:text-[#C8A24C]">↓ saber_pro.xlsx</a></li>
              <li><a href="/datos/homologaciones.xlsx" download className="hover:text-[#C8A24C]">↓ homologaciones.xlsx</a></li>
              <li><a href="/datos/trabajos_grado.xlsx" download className="hover:text-[#C8A24C]">↓ trabajos_grado.xlsx</a></li>
              <li><a href="/datos/servicios_transversales.xlsx" download className="hover:text-[#C8A24C]">↓ servicios_transversales.xlsx</a></li>
              <li><a href="/datos/matricula_financiera.xlsx" download className="hover:text-[#C8A24C]">↓ matricula_financiera.xlsx</a></li>
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
