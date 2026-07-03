"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, LogIn, ArrowRight, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex w-full bg-background overflow-hidden relative">
      {/* Background Animated Gradient (visible slightly on mobile) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0 md:hidden pointer-events-none" />

      {/* Left Panel: Image & Branding (Hidden on Mobile) */}
      <div className="hidden md:flex relative w-1/2 lg:w-3/5 bg-slate-900 flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop"
            alt="Farming landscape"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(22,163,74,0.4)]">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">AgriAI</span>
          </Link>
        </div>

        <motion.div 
          className="relative z-10 max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Grow smarter, <br/>
              not harder.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Join thousands of farmers using our AI-driven insights to maximize yield, detect diseases early, and optimize resources sustainably.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-12">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-black object-cover" 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="User" 
                />
              ))}
            </div>
            <div className="text-sm font-medium text-slate-300">
              Trusted by 10,000+ modern farmers
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 z-10 relative">
        <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-12">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">AgriAI</span>
        </Link>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-sm mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Please enter your details to sign in.</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div variants={fadeUp} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                  Email
                </label>
                <div className={cn(
                  "relative flex items-center overflow-hidden rounded-xl border bg-card transition-all duration-300",
                  focusedInput === "email" ? "border-primary ring-2 ring-primary/20 shadow-sm" : "border-border"
                )}>
                  <div className="pl-4 text-muted-foreground">
                    <Mail className={cn("h-5 w-5 transition-colors", focusedInput === "email" && "text-primary")} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className="flex h-12 w-full bg-transparent px-3 py-1 text-sm shadow-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="farmer@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className={cn(
                  "relative flex items-center overflow-hidden rounded-xl border bg-card transition-all duration-300",
                  focusedInput === "password" ? "border-primary ring-2 ring-primary/20 shadow-sm" : "border-border"
                )}>
                  <div className="pl-4 text-muted-foreground">
                    <Lock className={cn("h-5 w-5 transition-colors", focusedInput === "password" && "text-primary")} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className="flex h-12 w-full bg-transparent px-3 py-1 text-sm shadow-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden flex justify-center items-center gap-2 h-12 rounded-xl text-sm font-bold text-white bg-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_-5px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_-5px_rgba(22,163,74,0.6)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="relative flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div variants={fadeUp} className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-11 border border-border rounded-xl bg-card hover:bg-muted transition-colors text-sm font-medium group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-11 border border-border rounded-xl bg-card hover:bg-muted transition-colors text-sm font-medium group">
              <svg className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="text-center mt-10 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
