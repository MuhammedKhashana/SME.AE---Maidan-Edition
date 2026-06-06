'use client';
import { useLang } from '@/hooks/useLang';
import { useTilt } from '@/hooks/useTilt';
import { RevealMotion, StaggerContainer, StaggerItem } from '@/components/ui/RevealMotion';
import { Placeholder } from '@/components/ui/Placeholder';
import { STUDIO_META, SERVICES } from '@/data/siteData';

function ServiceRow({ service }: { service: typeof SERVICES[0] }) {
  const { t }      = useLang();
  const tiltRef    = useTilt<HTMLDivElement>({ max: 6, scale: 1.02, perspective: 1100, lift: 4 });
  const isEven     = parseInt(service.number) % 2 === 0;

  return (
    <RevealMotion
      type={isEven ? 'slide-right' : 'slide-left'}
      as="article"
      className="group grid md:grid-cols-[auto_1.1fr_1fr] gap-6 lg:gap-10 items-center border-t border-white/10 pt-7 lg:pt-9"
    >
      {/* Number */}
      <div
        className={`font-display text-white/15 transition-colors duration-500 ${isEven ? 'group-hover:text-green' : 'group-hover:text-red'}`}
        style={{ fontSize: 'clamp(40px,5vw,72px)' }}
      >
        {service.number}
      </div>

      {/* Copy */}
      <div>
        <h3 className="font-archivo font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
          {t(service.title)}
        </h3>
        <p className="mt-3 text-steel/70 leading-relaxed max-w-md ar-body">
          {t(service.description)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-wide text-steel/55">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 px-3 py-1
                         hover:translate-y-[-2px] hover:scale-105 hover:bg-red/14
                         hover:border-red/50 hover:text-white transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tilt image */}
      <div ref={tiltRef}>
        <Placeholder
          label={service.placeholder}
          imageUrl={service.imageUrl}
          videoUrl={service.videoUrl}
          className="aspect-[16/10] rounded-lg w-full"
        />
      </div>
    </RevealMotion>
  );
}

export function StudioSection() {
  const { t } = useLang();

  return (
    <section id="studio" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-10 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14 lg:mb-20">
          <div>
            <RevealMotion type="fade" className="flex items-center gap-3 mb-4">
              <span className="font-archivo font-extrabold text-red text-sm">{STUDIO_META.number}</span>
              <span className="text-[11px] tracking-[.3em] uppercase text-steel/55 ar-body">
                {t(STUDIO_META.eyebrow)}
              </span>
            </RevealMotion>

            <RevealMotion type="rise">
              <h2
                className="font-display text-white leading-[.9]"
                style={{ fontSize: 'clamp(36px,6.5vw,84px)' }}
              >
                <span>{t(STUDIO_META.heading)}</span>
                <br />
                <span className="text-steel/40">{t(STUDIO_META.headingAccent)}</span>
              </h2>
            </RevealMotion>
          </div>

          <RevealMotion type="default" delay={120} className="max-w-sm text-steel/70 leading-relaxed ar-body">
            {t(STUDIO_META.description)}
          </RevealMotion>
        </div>

        {/* Service rows */}
        <div className="grid gap-4 lg:gap-5">
          {SERVICES.map((service) => (
            <ServiceRow key={service.number} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
