"use client";

import * as React from "react";
import Link from "next/link";
import { Leaf, Menu, X, Play } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, LayoutGroup } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "AI Chat", href: "/chat" },
  { name: "Scanner", href: "/scanner" },
  { name: "Voice", href: "/voice" },
  { name: "Weather", href: "/weather" },
  { name: "Recommendation", href: "/recommendation" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Prices", href: "/market-prices" },
  { name: "Dashboard", href: "/dashboard" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Auto-hide navbar on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 20);
    if (latest > prev && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        atTop
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border/50 bg-background/70 backdrop-blur-2xl shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-20 relative flex-shrink-0">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors duration-200">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">AgriAI</span>
        </Link>

        {/* "Explore Platform" trigger button */}
        <AnimatePresence mode="wait">
          {!hasStarted && (
            <motion.button
              key="start-btn"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.88, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              onClick={() => setHasStarted(true)}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all border border-primary/20 text-sm font-semibold group"
            >
              <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Explore Platform
            </motion.button>
          )}
        </AnimatePresence>

        {/* Desktop nav links */}
        <LayoutGroup>
          <div className="hidden md:flex items-center overflow-x-auto no-scrollbar flex-grow mx-2">
            <AnimatePresence>
              {hasStarted && (
                <motion.div
                  className="flex items-center gap-0.5 w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.href} variants={itemVariants} className="relative">
                        <Link
                          href={link.href}
                          className={cn(
                            "relative px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-150",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {link.name}
                          {/* Animated underline indicator */}
                          {isActive && (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border/40 flex-shrink-0">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_-6px_rgba(34,197,94,0.6)]"
            >
              Login
            </Link>
          </motion.div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3 z-20">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-base font-medium rounded-xl transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="pt-3 mt-2 border-t border-border"
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Login to Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
