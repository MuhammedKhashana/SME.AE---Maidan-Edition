'use client';
import { useCallback } from 'react';
import { useLang } from '@/hooks/useLang';
import { useTilt } from '@/hooks/useTilt';
import { RevealMotion, StaggerContainer, StaggerItem } from '@/components/ui/RevealMotion';
import { Placeholder } from '@/components/ui/Placeholder';
import { WORK_META, WORK_CARDS, type WorkCard } from '@/data/siteData';

function WorkCardItem({ card }: { card: WorkCard }) {
  const tiltRef = useTilt<HTMLAnchorElement>({ max: 7, scale: 1.02, perspective: 1100, lift: 8 });

  /* Ripple */
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

  const colClass = card.colSpan === 2
    ? 'sm:col-span-2 lg:col-span-2'
    : '';

  return (
    <StaggerItem className={colClass}>
      <a
        ref={tiltRef}
        href="#contact"
        onPointerDown={ripple}
        className="workcard group block rounded-xl overflow-hidden border border-white/8"
      >
        <Placeholder
          label={card.placeholder}
          imageUrl={card.imageUrl}
          videoUrl={card.videoUrl}
          className={`relative ${card.aspectClass}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-[2]" />
          <div className="absolute top-4 left-4 text-[10px] tracking-[.24em] uppercase text-steel/70 z-[3] wc-tag">
            {card.regionTag}
          </div>
          <div className="absolute bottom-0 inset-x-0 p-5 lg:p-7 z-[3]">
            <div className="font-archivo font-extrabold text-white text-xl lg:text-2xl wc-title transition-transform duration-500">
              {card.title}
            </div>
            <div className="wc-meta mt-2 flex gap-5 text-steel/70 text-sm flex-wrap">
              {card.metrics.map((m) => (
                <span key={m.label}>
                  <b className="text-white font-semibold">{m.value}</b> {m.label}
                </span>
              ))}
            </div>
          </div>
        </Placeholder>
      </a>
    </StaggerItem>
  );
}

export function WorkSection() {
  const { t } = useLang();

  return (
    <section id="work" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 lg:mb-16">
          <div>
            <RevealMotion type="fade" className="flex items-center gap-3 mb-4">
              <span className="font-archivo font-extrabold text-red text-sm">{WORK_META.number}</span>
              <span className="text-[11px] tracking-[.3em] uppercase text-steel/55 ar-body">
                {t(WORK_META.eyebrow)}
              </span>
            </RevealMotion>

            <RevealMotion type="rise">
              <h2
                className="font-display text-white leading-[.9]"
                style={{ fontSize: 'clamp(36px,6.5vw,84px)' }}
              >
                <span>{t(WORK_META.heading)}</span>{' '}
                <span className="text-steel/40">{t(WORK_META.headingAccent)}</span>
              </h2>
            </RevealMotion>
          </div>
        </div>

        {/* Cards grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          staggerDelay={0.1}
        >
          {WORK_CARDS.map((card) => (
            <WorkCardItem key={card.title} card={card} />
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
