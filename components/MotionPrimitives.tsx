'use client';

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';
import {
  fadeInVariants,
  fadeUpVariants,
  storyRevealVariants,
  staggerContainerVariants,
  staggerItemVariants,
  accordionVariants,
  TRANSITION_NORMAL,
  TRANSITION_GENTLE,
} from '@/lib/motion';

/**
 * Smooth page entrance wrapper
 */
export function PageTransition({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={TRANSITION_NORMAL}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Storytelling scroll-reveal block for editorial sections
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...TRANSITION_GENTLE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Generic FadeIn wrapper
 */
export function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TRANSITION_NORMAL, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for grids and collections
 */
export function StaggerList({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item in a StaggerList
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Professional Skeleton Loader with calm, progressive shimmer
 */
export function SkeletonLoader({
  className = 'h-4 w-full rounded-md',
  variant = 'text',
}: {
  className?: string;
  variant?: 'text' | 'card' | 'badge' | 'avatar';
}) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-200/70 dark:bg-zinc-800/60 ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-zinc-700/25 to-transparent"
        animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Smooth Collapsible Accordion Panel
 */
export function SmoothAccordion({
  isOpen,
  children,
  className = '',
}: {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="accordion-content"
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={accordionVariants}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Micro Copy/Action Confirmation Toast
 */
export function CopyFeedbackBadge({
  show,
  text = 'Copied to clipboard',
}: {
  show: boolean;
  text?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9, y: 2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20"
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
