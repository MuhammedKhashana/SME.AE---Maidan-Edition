'use client';
import { useRef, useEffect, useCallback } from 'react';
import {
  motion, useScroll, useTransform, useMotionValue, useSpring,
  animate
} from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { useMagnetic } from '@/hooks/useMagnetic';
import { CountUp } from '@/components/ui/CountUp';
import {
  HERO_EYEBROW, HERO_HEADLINE, HERO_BODY, HERO_STATS,
  HERO_CTA_PRIMARY, HERO_CTA_SECONDARY, HERO_BILLING, HERO_MEDIA,
  type Bilingual,
} from '@/data/siteData';

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const { isAr, t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.28);

  /* Scroll-driven 3D on hero headline */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const headlineZ = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const headlineRX = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const headlineOp = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  /* Pointer parallax on the horse silhouette */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const horseX = useSpring(rawX, { damping: 30, stiffness: 80 });
  const horseY = useSpring(rawY, { damping: 30, stiffness: 80 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * -10);
      rawY.set((e.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [rawX, rawY]);

  /* Ripple helper */
  const ripple = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';
    const r = el.getBoundingClientRect(), size = Math.max(r.width, r.height);
    const d = document.createElement('span');
    d.className = 'ripple';
    d.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
    el.appendChild(d);
    setTimeout(() => d.remove(), 750);
  }, []);

  /* Smooth anchor */
  const anchor = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const t = document.querySelector(href);
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: (t as HTMLElement).getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  }, []);

  /* Kinetic headline entrance — each word rises on load */
  const wordVariants = {
    hidden: { y: '118%' as const },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: i * 0.06 },
    }),
  };

  return (
    <header ref={heroRef} id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">

      {/* Full-bleed hero background — video > image > placeholder */}
      {HERO_MEDIA.backgroundVideo ? (
        <video
          src={HERO_MEDIA.backgroundVideo}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster={HERO_MEDIA.backgroundImage || undefined}
        />
      ) : HERO_MEDIA.backgroundImage ? (
        <img
          src={HERO_MEDIA.backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="ph absolute inset-0" data-ph="Hero film — drop 16:9 / 4K" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-transparent" />

      {/* Archer-horse — parallax */}
      <motion.img
        src="/assets/sme-horse.png"
        alt=""
        aria-hidden="true"
        style={{ x: horseX, y: horseY }}
        className="drift pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2
                   w-[min(58vw,640px)] opacity-[.13] grayscale brightness-150
                   [mask-image:linear-gradient(90deg,transparent,#000_45%)]"
      />

      {/* Content */}
      {/* <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14"> */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14 pt-20">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
          <span className="text-[11px] sm:text-xs font-medium tracking-[.3em] uppercase text-steel/70 ar-body">
            {t(HERO_EYEBROW)}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          ref={h1Ref}
          className="font-display text-white leading-[.86] tracking-[-.01em]"
          style={{
            // fontSize: 'clamp(58px,14vw,200px)',
            fontSize: 'clamp(40px,9vw,140px)',
            translateZ: headlineZ,
            translateY: headlineY,
            rotateX: headlineRX,
            opacity: headlineOp,
            perspective: 1200,
          }}
          initial="hidden"
          animate="visible"
        >
          {HERO_HEADLINE.map((word, i) => (
            <span key={word} className="clip-line kin is-in">
              <motion.span variants={wordVariants} custom={i}>
                {i === 1 ? <span className="stroke-text">{word}</span> : word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Body + stats */}
        <div className="mt-7 grid lg:grid-cols-[1.1fr_.9fr] gap-6 lg:gap-12 items-end">
          <motion.p
            className="max-w-xl text-base sm:text-lg text-steel/85 leading-relaxed ar-body"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}
            dangerouslySetInnerHTML={{ __html: t(HERO_BODY) }}
          />

          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.24 }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label.en} className="stat-3d group">
                <div className="font-archivo font-extrabold text-white text-3xl sm:text-4xl transition-transform duration-500 group-hover:[transform:translateZ(20px)_rotateX(-6deg)] group-hover:[text-shadow:0_12px_30px_rgba(230,45,34,.45)]">
                  {stat.isStatic
                    ? stat.staticDisplay
                    : <CountUp to={stat.countTo} suffix={stat.suffix} />
                  }
                </div>
                <div className="text-[10px] tracking-[.22em] uppercase text-steel/55 mt-1 ar-body">
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          <a
            ref={ctaRef}
            href="#contact"
            onClick={(e) => anchor(e, '#contact')}
            onPointerDown={ripple}
            className="btn-red inline-flex items-center gap-2.5 rounded-full bg-red px-6 py-3.5
                       text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform
                       shadow-[0_12px_40px_-8px_rgba(230,45,34,.6)]"
          >
            <span>{t(HERO_CTA_PRIMARY)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={isAr ? 'rotate-180' : ''}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#work"
            onClick={(e) => anchor(e, '#work')}
            className="inline-flex items-center gap-2 rounded-full border border-white/18 px-6 py-3.5
                       text-sm font-medium text-white hover:bg-white/5 transition"
          >
            {t(HERO_CTA_SECONDARY)}
          </a>
        </motion.div>

        {/* Billing block */}
        <motion.div
          className="billing mt-10 pt-5 border-t border-white/10 text-steel/45 uppercase flex flex-wrap gap-x-3 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {HERO_BILLING.map((item, i) =>
            typeof item === 'string'
              ? <span key={i}>{item}</span>
              : <span key={i} className={i === 0 ? 'text-white/70' : ''}>{isAr && (item as Bilingual).ar ? (item as Bilingual).ar : (item as Bilingual).en}</span>
          )}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 right-5 hidden sm:flex flex-col items-center gap-2 text-steel/40 z-10">
        <span className="text-[9px] tracking-[.3em] uppercase rotate-90 origin-center mb-4">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-steel/50 to-transparent" />
      </div>
    </header>
  );
}
