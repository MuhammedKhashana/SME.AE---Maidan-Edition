'use client';
import { useRef, useEffect } from 'react';

interface TiltOptions {
  max?:         number;
  scale?:       number;
  perspective?: number;
  lift?:        number;
}

export function useTilt<T extends HTMLElement>(opts?: TiltOptions) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const maxRot      = opts?.max         ?? 8;
    const scaleFactor = opts?.scale       ?? 1.015;
    const perspective = opts?.perspective ?? 900;
    const lift        = opts?.lift        ?? 0;

    let raf: number | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, hovered = false;

    el.style.transformStyle = 'preserve-3d';
    el.setAttribute('data-tilt', '');

    function apply() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el!.style.transform = [
        `perspective(${perspective}px)`,
        `rotateX(${(-cy * maxRot).toFixed(2)}deg)`,
        `rotateY(${(cx * maxRot).toFixed(2)}deg)`,
        `translateZ(${hovered ? lift : 0}px)`,
        `scale(${hovered ? scaleFactor : 1})`,
      ].join(' ');

      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 || hovered) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = null;
      }
    }

    const onEnter = () => { hovered = true; if (!raf) raf = requestAnimationFrame(apply); };

    const onMove = (e: PointerEvent) => {
      const r  = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top)  / r.height;
      tx = px - 0.5;
      ty = py - 0.5;
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      hovered = false; tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
      setTimeout(() => { if (el) el.style.transform = ''; }, 500);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove',  onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove',  onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [opts?.max, opts?.scale, opts?.perspective, opts?.lift]);

  return ref;
}
