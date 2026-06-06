'use client';
import { useRef, useEffect } from 'react';

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf: number | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, active = false;

    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el!.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (active || Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
        el!.style.transform = '';
      }
    }

    const onEnter = () => { active = true; if (!raf) raf = requestAnimationFrame(loop); };
    const onMove  = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width  / 2)) * strength;
      ty = (e.clientY - (r.top  + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => { active = false; tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove',  onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove',  onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
