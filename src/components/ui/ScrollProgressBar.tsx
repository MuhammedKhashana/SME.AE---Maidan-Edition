'use client';
import { useScroll, useSpring, motion } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <motion.div
        data-progress
        className="h-full bg-red origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
