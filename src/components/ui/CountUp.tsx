'use client';
import { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpProps {
  to:       number;
  suffix?:  string;
  prefix?:  string;
  duration?: number;
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1.4 }: CountUpProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -20% 0px' });

  useEffect(() => {
    if (!ref.current) return;
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: (t) => 1 - Math.pow(1 - t, 3),
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = prefix + Math.round(v).toString() + suffix;
        },
      });
      return () => controls.stop();
    } else {
      if (ref.current) ref.current.textContent = prefix + '0' + suffix;
    }
  }, [isInView, to, suffix, prefix, duration]);

  return <span ref={ref}>{prefix}{to}{suffix}</span>;
}
