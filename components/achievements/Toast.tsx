'use client';

import { useEffect, useState } from 'react';
import type { Achievement } from '@/lib/achievements';

export default function Toast({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setVisible(false), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`fixed top-6 right-6 z-[110] transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#C8A24C]/50 bg-gradient-to-br from-[#1A2347] to-[#0A0E27] p-5 pl-4 shadow-[0_20px_60px_rgba(200,162,76,0.40)] min-w-[320px] max-w-[400px]">
        {/* shine */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out] bg-gradient-to-r from-transparent via-[#C8A24C]/20 to-transparent" style={{ animationFillMode: 'forwards' }} />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-[#C8A24C] bg-gradient-to-br from-[#C8A24C]/30 to-[#2E6FFF]/20 text-3xl text-[#F0C674] shadow-[0_0_20px_rgba(200,162,76,0.50)]">
            {achievement.icon}
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24C]">Logro desbloqueado</div>
            <div className="font-display mt-0.5 text-lg leading-tight text-white">{achievement.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-[#C9D2E8]">{achievement.desc}</div>
          </div>
          <button
            onClick={onClose}
            className="self-start text-[#5B6889] hover:text-white transition-colors text-lg leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
