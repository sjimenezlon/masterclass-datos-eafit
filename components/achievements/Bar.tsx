'use client';

import { useState } from 'react';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { useAchievements } from './Provider';

export default function Bar() {
  const { unlocked, progress, reset } = useAchievements();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante con progreso */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Logros"
        className="fixed bottom-6 right-6 z-[60] group flex items-center gap-3 rounded-full border border-[#C8A24C]/40 bg-[#0A0E27]/90 px-4 py-3 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.50)] transition-all hover:border-[#C8A24C] hover:scale-105"
      >
        {/* progress ring */}
        <div className="relative h-9 w-9">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(200,162,76,0.15)" strokeWidth="2.5" />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#C8A24C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${progress * 100.5} 100.5`}
              className="transition-all duration-700 ease-out"
              style={{ filter: 'drop-shadow(0 0 4px #C8A24C)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-[#C8A24C]">
            {unlocked.size}/{ACHIEVEMENTS.length}
          </div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-[10px] uppercase tracking-wider text-[#8B95B5]">Logros</div>
          <div className="text-xs text-white">{Math.round(progress * 100)}% completado</div>
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-24 right-6 w-[min(420px,calc(100vw-3rem))] max-h-[70vh] overflow-y-auto rounded-3xl border border-[#C8A24C]/30 bg-gradient-to-br from-[#1A2347] to-[#0A0E27] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.60)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24C]">Tu progreso</div>
                <div className="font-display text-2xl text-white">Logros</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#8B95B5] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-3">
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8A24C] to-[#F0C674] transition-all duration-700"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-[#8B95B5]">
                <span>{unlocked.size} desbloqueados</span>
                <span>{ACHIEVEMENTS.length - unlocked.size} por descubrir</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {ACHIEVEMENTS.map((a) => {
                const u = unlocked.has(a.id);
                return (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                      u
                        ? 'border-[#C8A24C]/40 bg-[#C8A24C]/5'
                        : 'border-white/8 bg-white/[0.02] opacity-60'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                        u
                          ? 'border-2 border-[#C8A24C] bg-gradient-to-br from-[#C8A24C]/30 to-[#2E6FFF]/20 text-[#F0C674]'
                          : 'border border-white/10 bg-white/5 text-[#5B6889]'
                      }`}
                    >
                      {u ? a.icon : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[9px] text-[#8B95B5]">M{a.module}</span>
                        <div className="font-display text-sm text-white truncate">{u ? a.label : '???'}</div>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-[#8B95B5]">
                        {u ? a.desc : 'Bloqueado · explora el módulo para desbloquear'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {unlocked.size > 0 && (
              <button
                onClick={() => {
                  if (confirm('¿Reiniciar todos los logros?')) reset();
                }}
                className="mt-6 w-full text-center text-xs text-[#5B6889] hover:text-[#C8A24C] transition-colors"
              >
                Reiniciar progreso
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
