'use client';
import { useState, useCallback, type FormEvent } from 'react';
import { useLang } from '@/hooks/useLang';
import { useMagnetic } from '@/hooks/useMagnetic';
import { RevealMotion, StaggerContainer, StaggerItem } from '@/components/ui/RevealMotion';
import { contactSchema, type ContactFormData, type ContactFormErrors } from '@/schemas/contactSchema';
import { CTA_META, FORM_PLACEHOLDERS } from '@/data/siteData';

export function CTASection() {
  const { t, isAr } = useLang();
  const btnRef       = useMagnetic<HTMLButtonElement>(0.28);
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState(false);
  const [errors,    setErrors]    = useState<ContactFormErrors>({});
  const [form,      setForm]      = useState<ContactFormData>({ name: '', company: '', email: '', message: '' });

  const update = useCallback((field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  , []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData;
        if (key) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    setSendError(false);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }, [form]);

  /* Ripple helper */
  const ripple = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
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

  const inputClass = (field: keyof ContactFormData) =>
    `bg-white/[.04] border rounded-lg px-4 py-3.5 text-white placeholder:text-steel/40
     focus:outline-none transition w-full
     ${errors[field] ? 'border-red/60' : 'border-white/12 focus:border-red'}`;

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,rgba(230,45,34,.16),transparent_70%)]" />

      <div className="relative max-w-[1100px] mx-auto text-center">
        <RevealMotion type="fade" className="text-[11px] tracking-[.3em] uppercase text-red mb-7 ar-body">
          {t(CTA_META.eyebrow)}
        </RevealMotion>

        <RevealMotion type="3d">
          <h2
            className="font-display text-white leading-[.92] tracking-[-.01em]"
            style={{ fontSize: 'clamp(44px,9vw,128px)' }}
          >
            <span>{t(CTA_META.heading)}</span>
            <br />
            <span className="stroke-text">{t(CTA_META.headingStroke)}</span>
          </h2>
        </RevealMotion>

        <RevealMotion
          type="default"
          delay={120}
          className="mt-7 max-w-xl mx-auto text-steel/70 leading-relaxed ar-body"
        >
          {t(CTA_META.description)}
        </RevealMotion>

        {/* Form */}
        <RevealMotion type="fade" delay={180}>
          <form
            onSubmit={handleSubmit}
            className={`mt-10 max-w-xl mx-auto grid gap-3 ${isAr ? 'text-right' : 'text-left'}`}
          >
            <StaggerContainer className="grid sm:grid-cols-2 gap-3" staggerDelay={0.07}>
              <StaggerItem>
                <input
                  required
                  placeholder={t(FORM_PLACEHOLDERS.name)}
                  value={form.name}
                  onChange={update('name')}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red text-xs mt-1">{errors.name}</p>}
              </StaggerItem>
              <StaggerItem>
                <input
                  placeholder={t(FORM_PLACEHOLDERS.company)}
                  value={form.company ?? ''}
                  onChange={update('company')}
                  className={inputClass('company')}
                />
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer className="grid gap-3" staggerDelay={0.07}>
              <StaggerItem>
                <input
                  required
                  type="email"
                  placeholder={t(FORM_PLACEHOLDERS.email)}
                  value={form.email}
                  onChange={update('email')}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red text-xs mt-1">{errors.email}</p>}
              </StaggerItem>
              <StaggerItem>
                <textarea
                  rows={3}
                  placeholder={t(FORM_PLACEHOLDERS.message)}
                  value={form.message ?? ''}
                  onChange={update('message')}
                  className={`${inputClass('message')} resize-none`}
                />
              </StaggerItem>
            </StaggerContainer>

            {sendError && (
              <p className="text-red text-xs text-center -mb-1">
                {t({ en: 'Something went wrong — please try again.', ar: 'حدث خطأ ما، يرجى المحاولة مجدداً.' })}
              </p>
            )}

            {!submitted ? (
              <button
                ref={btnRef}
                type="submit"
                disabled={sending}
                onPointerDown={ripple}
                className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-lg bg-red
                           px-6 py-4 text-sm font-semibold text-white hover:bg-red/90 transition
                           hover:-translate-y-0.5 shadow-[0_12px_40px_-8px_rgba(230,45,34,.5)]
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span>{sending ? t({ en: 'Sending…', ar: 'جارٍ الإرسال…' }) : t(CTA_META.submitLabel)}</span>
                {!sending && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={isAr ? 'rotate-180' : ''}>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ) : (
              <p className="text-green text-sm text-center mt-1">{t(CTA_META.successMsg)}</p>
            )}
          </form>
        </RevealMotion>
      </div>
    </section>
  );
}
