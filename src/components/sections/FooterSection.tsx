'use client';
import { useLang } from '@/hooks/useLang';
import { FOOTER_META } from '@/data/siteData';

export function FooterSection() {
  const { t, isAr } = useLang();

  return (
    <footer className="border-t border-white/8 px-4 sm:px-6 lg:px-10 py-12">
      <div className={`max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center ${isAr ? 'sm:text-right' : 'sm:text-left'}`}>

        <img
          src="/assets/sme-mark.png"
          alt="Sport Middle East"
          className="h-9 object-contain"
        />

        <div className="text-[11px] tracking-[.16em] uppercase text-steel/45 ar-body">
          {t(FOOTER_META.tagline)}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-[12px] text-steel/60">
          <a
            href={`tel:${FOOTER_META.phone}`}
            className="hover:text-white transition"
          >
            {FOOTER_META.phone}
          </a>
          <a
            href={`mailto:${FOOTER_META.email}`}
            className="ulink hover:text-white transition"
          >
            {FOOTER_META.email}
          </a>
          <a
            href={FOOTER_META.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="ulink hover:text-white transition"
          >
            {FOOTER_META.instagram}
          </a>
          <a
            href={FOOTER_META.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="ulink hover:text-white transition"
          >
            {FOOTER_META.website}
          </a>
        </div>

      </div>
    </footer>
  );
}
