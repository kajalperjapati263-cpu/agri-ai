"use client";

/**
 * Shared animation utilities and reusable motion components.
 * All animations use GPU-accelerated transforms (opacity, transform) only.
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type MotionProps,
} from "framer-motion";

// ─── Shared Variants ────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Page Transition Wrapper ─────────────────────────────────────────────────

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll-triggered Fade Wrapper ───────────────────────────────────────────

interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  ...motionProps
}: ScrollRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const variants = {
    up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -32 }, show: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Children Wrapper ─────────────────────────────────────────────────

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delayStart = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayStart?: number;
  once?: boolean;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={staggerContainer(stagger, delayStart)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger child item – wrap each child in this
export const StaggerItem = motion.div;
export const staggerItemVariants = fadeUp;

// ─── Animated Counter ─────────────────────────────────────────────────────────

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(from);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [displayed, setDisplayed] = React.useState(from);

  React.useEffect(() => {
    if (isInView) {
      motionVal.set(to);
    }
  }, [isInView, to, motionVal]);

  React.useEffect(() => {
    return springVal.on("change", (v) => setDisplayed(Math.round(v)));
  }, [springVal]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayed}{suffix}
    </span>
  );
}

// ─── Floating Element ─────────────────────────────────────────────────────────

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 4,
  className,
}: {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Shimmer Skeleton ─────────────────────────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-muted ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ translateX: ["−100%", "200%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear", repeatDelay: 0.2 }}
      />
    </div>
  );
}

// ─── Button with Ripple ───────────────────────────────────────────────────────

export function PremiumButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number }[]>([]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.();
  };

  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_30px_-8px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_-4px_rgba(34,197,94,0.7)]",
    ghost: "bg-transparent border border-border hover:bg-muted",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={handleRipple}
      className={`relative overflow-hidden rounded-full font-semibold transition-shadow duration-300 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/25 pointer-events-none"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
      {children}
    </motion.button>
  );
}
