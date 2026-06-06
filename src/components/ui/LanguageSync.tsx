'use client';
import { useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';

/* Keeps <html dir> and <html lang> in sync with the Zustand language store.
   Runs client-side only — safe for static export. */
export function LanguageSync() {
  const lang = useSystemStore((s) => s.lang);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    html.classList.toggle('is-ar', lang === 'ar');
  }, [lang]);

  return null;
}
