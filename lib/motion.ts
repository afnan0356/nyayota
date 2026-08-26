/**
 * Nyayota — Unified Motion Design System
 * 
 * Professional, calm, and high-performance animation primitives built on `motion/react`.
 * Adheres strictly to institutional legal aesthetics: zero bouncing, zero cartoonish rubber-banding,
 * crisp Apple/Stripe-caliber cubic-bezier easing, and low-latency microinteractions.
 */

import { type Variants, type Transition } from 'motion/react';

// Standardized Easing Curves
export const EASE_DECELERATE = [0.16, 1, 0.3, 1] as const; // Natural decel for entrances
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1.0] as const; // Balanced for transitions
export const EASE_ACCELERATE = [0.4, 0, 1, 1] as const; // Exits

// Standard Transitions
export const TRANSITION_FAST: Transition = {
  duration: 0.18,
  ease: EASE_DECELERATE,
};

export const TRANSITION_NORMAL: Transition = {
  duration: 0.28,
  ease: EASE_DECELERATE,
};

export const TRANSITION_GENTLE: Transition = {
  duration: 0.42,
  ease: EASE_DECELERATE,
};

export const TRANSITION_STORY: Transition = {
  duration: 0.55,
  ease: EASE_DECELERATE,
};

// Fade In Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_NORMAL,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

// Fade Up (Subtle 8-12px translation)
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_NORMAL,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

// Storytelling Scroll Entrance (Gentle 16px translation)
export const storyRevealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_STORY,
  },
};

// Staggered Container for Lists and Grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
};

export const fastStaggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.01,
    },
  },
};

// Header Navigation Stagger & Item Reveal Variants
export const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.04,
    },
  },
};

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: EASE_DECELERATE,
    },
  },
};

// Staggered Item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_NORMAL,
  },
};

// Scale In Subtle (for Popovers, Tooltips, Modals)
export const popoverVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: TRANSITION_FAST,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -4,
    transition: { duration: 0.12, ease: 'easeOut' },
  },
};

// Accordion & Collapsible Content
export const accordionVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: { duration: 0.22, ease: EASE_SMOOTH },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    transition: { duration: 0.28, ease: EASE_DECELERATE },
  },
};

// Tab Transition
export const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_FAST,
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.12 },
  },
};

// Button Press / Hover Microinteractions
export const buttonPressProps = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.12, ease: 'easeOut' },
};

export const iconButtonPressProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.94 },
  transition: { duration: 0.1, ease: 'easeOut' },
};

export const cardHoverProps = {
  whileHover: { y: -2 },
  transition: { duration: 0.2, ease: EASE_SMOOTH },
};
