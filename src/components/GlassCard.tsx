"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-xl dark:shadow-2xl rounded-2xl overflow-hidden",
          hoverEffect && "hover:shadow-2xl hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
