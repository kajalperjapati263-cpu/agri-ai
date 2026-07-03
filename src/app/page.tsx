"use client";

import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Bot, Sprout, CloudSun, ChevronDown,
  BarChart3, TrendingUp, Zap, Globe, CheckCircle2,
  Play, Activity, Thermometer, Droplets, ShoppingCart, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ScrollReveal, StaggerGroup, StaggerItem, staggerItemVariants,
  AnimatedCounter, FloatingElement,
} from "@/components/motion";

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {label && (
        <ScrollReveal>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {label}
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.05}>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

// ─── Accordion ───────────────────────────────────────────────────────────────

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-border/50 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-primary transition-colors duration-200">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[760px] flex items-center justify-center overflow-hidden">

        {/* Parallax background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/hero-bg.png"
            alt="AI-powered farm at sunrise"
            className="w-full h-full object-cover scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/25" />
        </motion.div>

        {/* Animated ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[700px] h-[700px] bg-primary/20 rounded-full blur-[140px]" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center pt-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/25 backdrop-blur-xl mb-8 text-white shadow-2xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.9)] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">AgriAI Platform 2.0 is Live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl mx-auto leading-[1.08] text-white drop-shadow-2xl"
          >
            AI-Powered Smart{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-400">
              Farming Platform.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Empowering modern farmers with artificial intelligence to increase
            productivity, prevent crop losses, and automate operations seamlessly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-[0_0_40px_-8px_rgba(34,197,94,0.8)] hover:shadow-[0_0_60px_-6px_rgba(34,197,94,0.9)] transition-shadow flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/chat"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/25 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/18 transition-colors flex items-center justify-center gap-2 group"
              >
                <Bot className="w-5 h-5 group-hover:text-primary transition-colors" />
                Try AI Assistant
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Farmers", to: 100, suffix: "K+" },
              { label: "Crop Accuracy", to: 95, suffix: "%" },
              { label: "Higher Yield", to: 30, suffix: "%" },
              { label: "AI Support", label2: "24/7", isText: true },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center cursor-default shadow-2xl hover:border-primary/30 hover:bg-black/40 transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-1.5">
                  {stat.isText ? stat.label2 : (
                    <AnimatedCounter to={stat.to!} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-xs text-slate-300 font-semibold uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. TRUSTED BY ────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-border/50 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-10">
              Trusted by leading agricultural enterprises worldwide
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
              {["Pioneer Farms", "AgriCorp", "BioHarvest", "EcoTech", "GlobalGrow"].map((logo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  className="text-lg md:text-2xl font-black font-mono tracking-tighter flex items-center gap-2 hover:text-primary transition-colors cursor-default"
                >
                  <Globe className="w-6 h-6" /> {logo}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. FEATURES GRID ─────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeading
            label="Features"
            title="A unified platform for modern agriculture."
            subtitle="Everything you need to optimize your farm, powered by cutting-edge artificial intelligence."
          />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
            {[
              { icon: Bot, title: "AI Chatbot", desc: "Multilingual assistant available 24/7 in 8 languages." },
              { icon: Sprout, title: "Crop Disease Detection", desc: "Instantly diagnose issues from photos with 99.8% accuracy." },
              { icon: CloudSun, title: "Weather Forecast", desc: "Hyperlocal micro-climate predictions & insights." },
              { icon: ShoppingCart, title: "Marketplace", desc: "Buy seeds & tools at best prices with AI guidance." },
              { icon: TrendingUp, title: "Crop Recommendation", desc: "AI-driven yield optimization for your soil & region." },
              { icon: Thermometer, title: "Soil Health Analysis", desc: "Deep insights into soil nutrients and pH levels." },
              { icon: Droplets, title: "Smart Irrigation", desc: "Automated watering schedules that reduce water usage by 40%." },
              { icon: Activity, title: "Voice Assistant", desc: "Hands-free farming control in your native language." },
            ].map((feature, i) => (
              <StaggerItem
                key={i}
                variants={staggerItemVariants}
                className="group relative p-px rounded-3xl overflow-hidden hover-glow transition-all duration-300"
                style={{ background: "linear-gradient(to bottom, var(--border), transparent)" }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-card h-full p-7 rounded-[23px] transition-colors duration-300 group-hover:bg-muted/40"
                >
                  <FloatingElement amplitude={6} duration={3 + i * 0.3}>
                    <div className="w-13 h-13 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300 w-12 h-12">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </FloatingElement>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-slate-950 text-white relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-full h-[500px] bg-primary rounded-full blur-[180px] -translate-y-1/2 pointer-events-none"
        />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <SectionHeading
            label="Process"
            title="How AgriAI Works"
            subtitle="Seamlessly integrating into your daily farm operations."
          />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 relative mt-8">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {[
              { step: "01", title: "Connect", desc: "Sign up and link your farm data, GPS coordinates, and IoT sensors in minutes." },
              { step: "02", title: "Analyze", desc: "Our AI processes millions of data points across weather, soil, and market trends." },
              { step: "03", title: "Optimize", desc: "Receive actionable insights and automate tasks to drastically improve yield." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction="up">
                <div className="relative flex flex-col items-center text-center group">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl font-black text-primary mb-8 relative z-10 shadow-[0_0_40px_-12px_rgba(34,197,94,0.4)] group-hover:bg-primary group-hover:text-slate-950 group-hover:border-primary transition-all duration-300"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CROP SCANNER PREVIEW ───────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative border-b border-border/50">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center gap-16">
          <ScrollReveal direction="left" className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/8 blur-3xl rounded-3xl" />
              <div className="relative group overflow-hidden rounded-3xl border border-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef71a3fb51d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Crop Disease Scanner AI"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <FloatingElement amplitude={12} duration={4} className="absolute -right-6 md:-right-10 top-10 z-20">
                <div className="bg-background/85 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/15 rounded-full flex items-center justify-center">
                    <Zap className="text-red-500 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Blight Detected</div>
                    <div className="text-xs text-muted-foreground">98% Confidence</div>
                  </div>
                </div>
              </FloatingElement>
              <FloatingElement amplitude={8} duration={5} className="absolute -left-4 bottom-10 z-20">
                <div className="bg-background/85 backdrop-blur-xl border border-border p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="text-xs font-semibold">Pesticide Recommended</div>
                </div>
              </FloatingElement>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="md:w-1/2 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <Sprout className="w-3.5 h-3.5" /> Computer Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Instant Crop Health<br />Diagnosis.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Simply snap a photo of a leaf. Our proprietary AI models analyze it instantly to detect diseases, pest infestations, and nutrient deficiencies with extreme accuracy.
            </p>
            <ul className="space-y-3">
              {["400+ diseases detected", "Works offline on-device", "Results in under 2 seconds"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <motion.div whileHover={{ x: 4 }} className="inline-block">
              <Link href="/scanner" className="inline-flex items-center gap-2 text-primary font-bold text-base hover:gap-3 transition-all duration-200">
                Try the Scanner <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6 & 7. WEATHER & CHAT SPLIT ──────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <ScrollReveal direction="left" className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <CloudSun className="w-3.5 h-3.5" /> Hyperlocal Weather
              </span>
              <h3 className="text-3xl font-bold tracking-tight">Farm-specific forecasts,<br />not generic city data.</h3>
              <FloatingElement amplitude={6} duration={5}>
                <div className="bg-card border border-border rounded-3xl p-7 shadow-xl hover-glow">
                  <div className="flex justify-between items-start mb-7">
                    <div>
                      <div className="text-6xl font-thin mb-1">24°</div>
                      <div className="text-muted-foreground font-medium text-sm">Partly Cloudy · Humidity 45%</div>
                    </div>
                    <CloudSun className="w-16 h-16 text-primary opacity-80" />
                  </div>
                  <div className="h-px bg-border w-full mb-5" />
                  <div className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> AI Recommendation
                  </div>
                  <p className="text-muted-foreground text-sm">Optimal conditions for applying nitrogen fertilizers today before 2 PM.</p>
                </div>
              </FloatingElement>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15} className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <Bot className="w-3.5 h-3.5" /> AI Assistant
              </span>
              <h3 className="text-3xl font-bold tracking-tight">24/7 expert advice in<br />your language.</h3>
              <div className="bg-card border border-border rounded-3xl p-5 shadow-xl flex flex-col gap-3 h-[260px] overflow-hidden hover-glow">
                <div className="bg-primary/10 text-primary p-3.5 rounded-2xl rounded-tr-sm ml-auto max-w-[82%] text-sm">
                  What is the best time to sow wheat in Punjab?
                </div>
                <div className="bg-muted p-3.5 rounded-2xl rounded-tl-sm mr-auto max-w-[82%] text-sm text-muted-foreground">
                  The ideal time is between the 1st and 3rd week of November. Would you like me to add a reminder to your calendar?
                </div>
                <div className="mt-auto relative">
                  <div className="w-full bg-background border border-border rounded-full py-2.5 px-5 text-sm text-muted-foreground pointer-events-none">
                    Ask AgriAI anything...
                  </div>
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 8. MARKETPLACE PREVIEW ───────────────────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeading
            label="Marketplace"
            title="The Smart Marketplace."
            subtitle="Purchase top-quality seeds, fertilizers, and tools directly within the platform, guided by AI recommendations."
          />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-7" stagger={0.1}>
            {[
              { name: "Premium Wheat Seeds", price: "₹4,500", rating: 4.8, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2000&auto=format&fit=crop" },
              { name: "Organic Fertilizer Mix", price: "₹1,800", rating: 4.9, img: "https://images.unsplash.com/photo-1627844642677-9b422a5786a3?q=80&w=2000&auto=format&fit=crop" },
              { name: "Smart Soil Sensor", price: "₹9,999", rating: 5.0, img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" },
            ].map((product, i) => (
              <StaggerItem key={i} variants={staggerItemVariants}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 24px 50px -12px rgba(0,0,0,0.2)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-md group hover-glow"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-foreground">{product.rating}</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-light">{product.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm"
                      >
                        <ShoppingCart className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="text-center mt-10">
            <motion.div whileHover={{ x: 4 }} className="inline-block">
              <Link href="/marketplace" className="inline-flex items-center gap-2 font-bold hover:text-primary transition-colors">
                View All Products <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/50 overflow-hidden relative">
        <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <SectionHeading
            label="Testimonials"
            title="Loved by modern farmers."
            subtitle="See how AgriAI is transforming agricultural operations worldwide."
          />
          <StaggerGroup className="grid md:grid-cols-3 gap-7" stagger={0.1}>
            {[
              { quote: "AgriAI detected a minor nitrogen deficiency weeks before it became visible. It saved us thousands in lost yield.", author: "Sarah Jenkins", role: "Manager, Horizon Farms", avatar: 20 },
              { quote: "The market prediction tool accurately forecasted a price spike, allowing us to time our harvest perfectly. The ROI is incredible.", author: "David Chen", role: "Owner, Chen Orchards", avatar: 33 },
              { quote: "Finally a platform that doesn't feel like it was built in 1995. Lightning fast and works flawlessly on my phone in the field.", author: "Marcus Thorne", role: "Lead Agronomist, EcoGrow", avatar: 12 },
            ].map((t, i) => (
              <StaggerItem key={i} variants={staggerItemVariants}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="p-7 rounded-3xl bg-card border border-border shadow-lg flex flex-col justify-between h-full hover-glow"
                >
                  <p className="text-base leading-relaxed mb-8 text-muted-foreground">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-blue-500/80 p-0.5 flex-shrink-0">
                      <img
                        src={`https://i.pravatar.cc/80?img=${t.avatar}`}
                        alt={t.author}
                        className="w-full h-full rounded-full border-2 border-background object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{t.author}</div>
                      <div className="text-xs text-primary font-semibold">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-0 divide-y divide-border/50">
            <AccordionItem
              question="Do I need expensive hardware to use AgriAI?"
              answer="Not at all. While AgriAI integrates beautifully with enterprise IoT sensors, our core features only require a smartphone with a camera. Everything works right from your pocket."
            />
            <AccordionItem
              question="How secure is my farm's data?"
              answer="We use military-grade AES-256 encryption for all data at rest and in transit. Your proprietary yield data and GPS coordinates are never shared or sold to third parties — ever."
            />
            <AccordionItem
              question="Does the AI chatbot support regional languages?"
              answer="Yes! Our AI is trained on specialized agricultural datasets in English, Hindi, Punjabi, Tamil, Telugu, Bengali, Marathi, and Gujarati — covering over 900 million people."
            />
            <AccordionItem
              question="What happens if I lose internet connection in the field?"
              answer="Our 'Offline Mode' caches critical data locally on your device. You can log observations, scan crop photos, and review recommendations — everything syncs automatically once you're back online."
            />
            <AccordionItem
              question="Is there a free trial?"
              answer="Yes! We offer a full-featured 14-day free trial, no credit card required. You get access to every feature including the AI chatbot, crop scanner, and market insights."
            />
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[400px] bg-primary rounded-full blur-[150px]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-tight">
              Ready to revolutionize<br className="hidden md:block" /> your farm?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 100,000+ farmers already using AgriAI. Start your 14-day free trial — no credit card required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-xl hover:shadow-[0_0_60px_-10px_rgba(34,197,94,0.7)] transition-shadow shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]"
                >
                  Create Free Account
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-xl hover:bg-white/18 transition-colors"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
