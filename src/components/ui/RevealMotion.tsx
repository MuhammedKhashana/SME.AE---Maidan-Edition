'use client';
import { motion, type Variant } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

type VariantMap = Record<string, Variant>;

/* ─── Variant catalogue ─────────────────────────────────────── */
const HIDDEN: VariantMap = {
  fade:          { opacity: 0 },
  rise:          { opacity: 0, y: 70, scale: 0.96 },
  'slide-left':  { opacity: 0, x: -40, y: 10 },
  'slide-right': { opacity: 0, x: 40,  y: 10 },
  blur:          { opacity: 0, y: 20, filter: 'blur(10px)' },
  '3d':          { opacity: 0, rotateX: 28, y: 60, transformPerspective: 1200 },
  scale:         { opacity: 0, scale: 0.86, y: 30, filter: 'blur(6px)' },
  default:       { opacity: 0, y: 40 },
};

const VISIBLE: VariantMap = {
  fade:          { opacity: 1 },
  rise:          { opacity: 1, y: 0, scale: 1 },
  'slide-left':  { opacity: 1, x: 0, y: 0 },
  'slide-right': { opacity: 1, x: 0, y: 0 },
  blur:          { opacity: 1, y: 0, filter: 'blur(0px)' },
  '3d':          { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
  scale:         { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
  default:       { opacity: 1, y: 0 },
};

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealType = keyof typeof HIDDEN;

interface RevealMotionProps {
  children:   ReactNode;
  type?:      RevealType;
  delay?:     number;
  duration?:  number;
  className?: string;
  style?:     React.CSSProperties;
  as?:        ElementType;
}

export function RevealMotion({
  children,
  type      = 'default',
  delay     = 0,
  duration  = 1.1,
  className,
  style,
  as        = 'div',
}: RevealMotionProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden:  HIDDEN[type] ?? HIDDEN.default,
        visible: {
          ...(VISIBLE[type] ?? VISIBLE.default),
          transition: { duration, ease: EASE, delay: delay / 1000 },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/* ─── Stagger container ──────────────────────────────────────── */
interface StaggerContainerProps {
  children:      ReactNode;
  className?:    string;
  staggerDelay?: number;
  style?:        React.CSSProperties;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  style,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, y: 40, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
