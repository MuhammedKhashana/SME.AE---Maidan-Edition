'use client';
import { useSystemStore } from '@/store/useSystemStore';
import type { Bilingual } from '@/data/siteData';

export function useLang() {
  const { lang, setLang, toggleLang } = useSystemStore();
  const isAr = lang === 'ar';

  const t = (bi: Bilingual): string => (isAr ? bi.ar : bi.en);

  return { lang, isAr, t, setLang, toggleLang };
}
