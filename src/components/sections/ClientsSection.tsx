'use client';
import { useLang } from '@/hooks/useLang';
import { CLIENTS_EYEBROW, CLIENTS_MARQUEE_ITEMS } from '@/data/siteData';

export function ClientsSection() {
  const { t } = useLang();
  /* Double the items so the seamless loop works */
  const doubled = [...CLIENTS_MARQUEE_ITEMS, ...CLIENTS_MARQUEE_ITEMS];

  return (
    <section className="py-14 lg:py-20 border-y border-white/8 overflow-hidden">
      <div className="text-center text-[11px] tracking-[.3em] uppercase text-steel/45 mb-9 px-4 ar-body">
        {t(CLIENTS_EYEBROW)}
      </div>
      <div className="marquee-mask">
        <div className="marquee gap-12 lg:gap-20 pr-12 lg:pr-20 font-archivo font-extrabold text-2xl lg:text-3xl text-steel/35">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white/95 cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
