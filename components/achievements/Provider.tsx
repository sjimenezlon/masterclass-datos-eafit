'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ACHIEVEMENTS, type Achievement } from '@/lib/achievements';
import Confetti from './Confetti';
import Toast from './Toast';
import Bar from './Bar';

type Ctx = {
  unlocked: Set<string>;
  unlock: (id: string) => void;
  reset: () => void;
  progress: number;
  showPanel: boolean;
  setShowPanel: (s: boolean) => void;
};

const Context = createContext<Ctx | null>(null);

export function useAchievements() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useAchievements must be used inside AchievementsProvider');
  return ctx;
}

export default function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<Achievement | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hidratación
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mclass-achievements');
      if (stored) {
        const arr = JSON.parse(stored) as string[];
        setUnlocked(new Set(arr));
      }
    } catch {}
    setHydrated(true);
  }, []);

  const unlock = useCallback(
    (id: string) => {
      setUnlocked((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        try {
          localStorage.setItem('mclass-achievements', JSON.stringify([...next]));
        } catch {}
        const ach = ACHIEVEMENTS.find((a) => a.id === id);
        if (ach) {
          setToast(ach);
          setConfettiKey((k) => k + 1);
          setShowConfetti(true);
          setTimeout(() => setToast(null), 4500);
        }
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setUnlocked(new Set());
    try {
      localStorage.removeItem('mclass-achievements');
    } catch {}
  }, []);

  const progress = unlocked.size / ACHIEVEMENTS.length;

  return (
    <Context.Provider value={{ unlocked, unlock, reset, progress, showPanel, setShowPanel }}>
      {children}
      {hydrated && <Bar />}
      {toast && <Toast achievement={toast} onClose={() => setToast(null)} />}
      {showConfetti && (
        <Confetti
          key={confettiKey}
          onDone={() => setShowConfetti(false)}
        />
      )}
    </Context.Provider>
  );
}
