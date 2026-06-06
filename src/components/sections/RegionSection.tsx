'use client';
import { useLang } from '@/hooks/useLang';
import { useTilt } from '@/hooks/useTilt';
import { RevealMotion } from '@/components/ui/RevealMotion';
import { Placeholder } from '@/components/ui/Placeholder';
import { REGION_META, REGION_CARDS } from '@/data/siteData';

function RegionCard({ card }: { card: typeof REGION_CARDS[0] }) {
  const { t } = useLang();
  const tiltRef = useTilt<HTMLDivElement>({ max: 5, scale: 1.015, perspective: 1200, lift: 6 });

  return (
    <RevealMotion type={card.revealDir} delay={card.delay}>
      <div ref={tiltRef} className="h-full">
        <Placeholder
          label={card.placeholder}
          imageUrl={card.imageUrl}
          videoUrl={card.videoUrl}
          className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent z-[2]" />
          <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8 z-[3]">
            <div className={`text-[11px] tracking-[.24em] uppercase ${card.badgeColor} mb-1.5 ar-body`}>
              {t(card.badge)}
            </div>
            <div className="font-display text-white text-3xl lg:text-5xl leading-none">
              {t(card.title)}
            </div>
            <div className="text-steel/70 text-sm mt-2 ar-body">{card.subtitle}</div>
          </div>
        </Placeholder>
      </div>
    </RevealMotion>
  );
}

export function RegionSection() {
  const { t } = useLang();

  return (
    <section id="region" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-10 bg-ink2 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto">

        <RevealMotion type="fade" className="flex items-center gap-3 mb-4">
          <span className="font-archivo font-extrabold text-red text-sm">{REGION_META.number}</span>
          <span className="text-[11px] tracking-[.3em] uppercase text-steel/55 ar-body">
            {t(REGION_META.eyebrow)}
          </span>
        </RevealMotion>

        <RevealMotion type="rise">
          <h2
            className="font-display text-white leading-[.9] mb-12 lg:mb-16"
            style={{ fontSize: 'clamp(36px,6.5vw,84px)' }}
          >
            <span>{t(REGION_META.heading)}</span>{' '}
            <span className="text-red">{t(REGION_META.headingAccent)}</span>
          </h2>
        </RevealMotion>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {REGION_CARDS.map((card) => (
            <RegionCard key={card.placeholder} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}
