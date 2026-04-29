'use client';

import { useEffect, useRef, useState } from 'react';
import Tour from './Tour';
import { useAchievements } from './achievements/Provider';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showTour, setShowTour] = useState(false);
  const { unlock } = useAchievements();

  useEffect(() => {
    const t = setTimeout(() => unlock('first-step'), 1500);
    return () => clearTimeout(t);
  }, [unlock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    const N = 60;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }));

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      });

      // links
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const d = Math.hypot(dx, dy);
          const max = w * 0.18;
          if (d < max) {
            const alpha = (1 - d / max) * 0.18;
            const grad = ctx.createLinearGradient(a.x * w, a.y * h, b.x * w, b.y * h);
            grad.addColorStop(0, `rgba(46, 111, 255, ${alpha})`);
            grad.addColorStop(1, `rgba(200, 162, 76, ${alpha * 0.6})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      // dots
      nodes.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, 3 * dpr);
        grad.addColorStop(0, 'rgba(240, 198, 116, 0.85)');
        grad.addColorStop(1, 'rgba(240, 198, 116, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 xl:pt-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-12">
        <div className="pill mb-8">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A24C]" />
          Masterclass · BigData & Visualización
        </div>

        <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
          De la <span className="italic text-grad-gold">cultura del dato</span><br />
          a la <span className="italic text-grad-gold">inteligencia artificial</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#C9D2E8] md:text-xl">
          Una experiencia interactiva para entender, gobernar y aprovechar los datos
          que produce la academia. Diez módulos, siete bases de datos descargables,
          un glosario actualizado y demos en vivo con IA.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#cultura" className="btn-gold">
            Comenzar la masterclass →
          </a>
          <button onClick={() => setShowTour(true)} className="btn-ghost flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8A24C]/20 text-[10px] text-[#C8A24C]">▶</span>
            Tomar el tour de 90s
          </button>
          <a href="#glosario" className="btn-ghost">
            Ir al glosario
          </a>
          <a
            href="/datos/masterclass-eafit-todos-los-datasets.xlsx"
            download
            className="btn-ghost group"
          >
            <span>↓</span>
            <span>Descargar todos los Excel</span>
          </a>
        </div>

        {showTour && <Tour onClose={() => setShowTour(false)} />}

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 max-w-3xl">
          {[
            { n: '10', l: 'módulos interactivos' },
            { n: '7', l: 'datasets descargables' },
            { n: '62', l: 'términos en glosario' },
            { n: '∞', l: 'tableros que vas a crear' },
          ].map((s) => (
            <div key={s.l} className="border-l border-[#C8A24C]/30 pl-4">
              <div className="font-display text-3xl text-white tabular-nums">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#8B95B5]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
