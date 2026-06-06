'use client';
import { useRef, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { RevealMotion } from '@/components/ui/RevealMotion';
import { VOICE_META } from '@/data/siteData';

export function VoiceSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLQuoteElement>(null);
  /* Cursor parallax tilt on the quote */
  useEffect(() => {
    const section = sectionRef.current;
    const quote   = quoteRef.current;
    if (!section || !quote) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf: number | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, active = false;

    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      quote!.style.transform = `perspective(1000px) rotateY(${(cx * 4).toFixed(2)}deg) rotateX(${(-cy * 3).toFixed(2)}deg)`;
      if (active || Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top)  / r.height - 0.5;
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => { active = false; tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };

    section.addEventListener('pointermove',  onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove',  onMove);
      section.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="voice"
      className="relative py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Background video */}
      <video
        src={VOICE_META.backgroundVideo}
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />

      <div className="relative max-w-[1100px] mx-auto text-center">
        <RevealMotion type="fade" className="text-[11px] tracking-[.3em] uppercase text-red mb-8 ar-body">
          {t(VOICE_META.eyebrow)}
        </RevealMotion>

        <blockquote
          ref={quoteRef}
          className="font-display text-white leading-[1.02] tracking-[-.01em]"
          style={{ fontSize: 'clamp(30px,5.5vw,72px)' }}
        >
          <RevealMotion type="blur" as="span" className="block">
            {t(VOICE_META.quoteLine1)}
          </RevealMotion>
          <RevealMotion type="blur" delay={60} as="span" className="text-red block">
            {t(VOICE_META.quoteLine2)}
          </RevealMotion>
        </blockquote>

        <RevealMotion
          type="default"
          delay={120}
          className="mt-8 text-steel/60 text-sm tracking-wide ar-body"
        >
          {t(VOICE_META.attribution)}
        </RevealMotion>
      </div>
    </section>
  );
}
