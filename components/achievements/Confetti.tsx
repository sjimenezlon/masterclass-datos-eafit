'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#C8A24C', '#F0C674', '#2E6FFF', '#5B95FF', '#10B981', '#FFFFFF'];

export default function Confetti({ onDone }: { onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const N = 140;
    const particles = Array.from({ length: N }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 100,
      y: H / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 12 - 6,
      size: Math.random() * 8 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));

    let raf = 0;
    const start = performance.now();
    const DURATION = 2500;

    function frame() {
      const elapsed = performance.now() - start;
      ctx!.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.vy += 0.32; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life = Math.max(0, 1 - elapsed / DURATION);

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.globalAlpha = p.life;
        ctx!.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx!.beginPath();
          ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.restore();
      });

      if (elapsed < DURATION + 500) {
        raf = requestAnimationFrame(frame);
      } else {
        onDone?.();
      }
    }
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[100]" />;
}
