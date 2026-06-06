'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'en' | 'ar';

interface SystemState {
  lang: Lang;
  setLang:    (lang: Lang) => void;
  toggleLang: () => void;
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      lang:       'en',
      setLang:    (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === 'en' ? 'ar' : 'en' }),
    }),
    {
      name: 'sme-lang',
      partialize: (s) => ({ lang: s.lang }),
    }
  )
);
