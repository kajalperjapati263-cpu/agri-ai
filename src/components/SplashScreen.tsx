"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onComplete, 1800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-[0_0_60px_-10px_rgba(34,197,94,0.6)]">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-4xl font-black tracking-tighter text-foreground"
          >
            AgriAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-muted-foreground text-sm mt-1 font-medium tracking-wide"
          >
            Smart Farming Platform
          </motion.p>
        </div>
      </motion.div>

      {/* Loading bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <SplashScreen key="splash" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
