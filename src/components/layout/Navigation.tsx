'use client';
import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { useMagnetic } from '@/hooks/useMagnetic';
import { NAV_LINKS, NAV_CTA } from '@/data/siteData';

export function Navigation() {
  const { lang, isAr, t, setLang } = useLang();
  const navRef  = useRef<HTMLElement>(null);
  const ctaRef  = useMagnetic<HTMLAnchorElement>(0.28);

  /* Nav solid state on scroll */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handler = () => nav.classList.toggle('nav-solid', window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Ripple helper */
  const ripple = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';
    const r    = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const d    = document.createElement('span');
    d.className = 'ripple';
    d.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
    el.appendChild(d);
    setTimeout(() => d.remove(), 750);
  }, []);

  /* Smooth anchor scroll */
  const handleAnchor = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  }, []);

  return (
    <nav ref={navRef} data-nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1500px] mx-auto h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <a href="#top" onClick={(e) => handleAnchor(e, '#top')} className="flex items-center gap-2.5 shrink-0">
          <img src="/assets/sme-horse.png" alt="SME" className="h-8 w-8 object-contain" />
          <span className="font-archivo font-bold tracking-[.18em] text-white text-sm nav-wordmark">
            SM<span className="text-red">E</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-[.16em] uppercase text-steel/80">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="ulink hover:text-white transition"
            >
              {t(link.label)}
            </a>
          ))}
        </div>

        {/* Lang toggle + CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center rounded-full border border-white/15 overflow-hidden text-[11px] font-semibold">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 transition ${lang === 'en' ? 'lang-on' : 'text-white/60'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 transition ${lang === 'ar' ? 'lang-on' : 'text-white/60'}`}
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              ع
            </button>
          </div>

          <a
            ref={ctaRef}
            href="#contact"
            onClick={(e) => handleAnchor(e, '#contact')}
            onPointerDown={ripple}
            className="btn-red hidden sm:inline-flex items-center gap-2 rounded-full bg-red px-4 py-2 text-[12px] font-semibold tracking-wide text-white hover:bg-red/90 transition"
          >
            {t(NAV_CTA)}
          </a>
        </div>

      </div>
    </nav>
  );
}
