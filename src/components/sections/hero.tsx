"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/3d/aurora-background";
import { FloatingGeometry, FloatingBlockchainNodes } from "@/components/3d/floating-geometry";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Aurora Background - fixed, covers full page */}
      <AuroraBackground />

      {/* Floating geometry layer */}
      <FloatingGeometry variant="hero" />
      <FloatingBlockchainNodes />

      {/* Subtle gradient overlays for depth - lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--page-bg)]/10 to-[var(--page-bg)]/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial z-10 pointer-events-none" />

      {/* Content with 3D perspective */}
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Layered Glass Cards */}
          <motion.div
            initial={{ opacity: 0.95, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left"
          >
            {/* Status badge - floating glass */}
            <motion.div
              initial={{ opacity: 0.95, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-card"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                Live Network Active — 50+ Enterprise Clients
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0.95, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-[var(--text-primary)]">Building the Future</span>
              <br />
              <span className="text-[var(--text-primary)]">of </span>
              <span className="text-gradient">Web3 Technology</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0.95, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed text-[var(--text-secondary)]"
            >
              BlocksScan builds the infrastructure that powers blockchain
              visibility. Real-time explorers, analytics, and monitoring for the
              decentralized future.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0.95, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-[var(--text-primary)] border-0 px-8 h-12 text-base font-medium group shadow-lg shadow-[var(--glow-blue)]"
                >
                  Explore Platform
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 h-12 text-base font-medium border-[var(--btn-outline-border)] text-[var(--btn-outline-text)] bg-transparent hover:bg-[var(--btn-outline-hover)]"
                >
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Social proof - floating avatars */}
            <motion.div
              initial={{ opacity: 0.95, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <motion.div
                    key={letter}
                    initial={{ opacity: 0.95, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gradient-text-from)] to-[var(--gradient-text-to)] border-2 border-[var(--page-bg)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]"
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--text-primary)]">500+ Projects</div>
                <div className="text-sm text-[var(--text-muted)]">Delivered Successfully</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Glass Card Stack */}
          <motion.div
            initial={{ opacity: 0.95, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="hidden lg:flex items-center justify-center relative"
            style={{ perspective: 1000 }}
          >
            <div className="relative w-[500px] h-[500px]" style={{ transformStyle: "preserve-3d" }}>
              {/* Back glow layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--glow-blue)] to-[var(--glow-purple)] rounded-full blur-3xl animate-pulse-slow opacity-50" />
              
              {/* Floating glass card 1 - back */}
              <motion.div
                className="absolute top-10 right-10 w-48 h-32 glass-card-3d rounded-2xl p-4"
                animate={{ y: [0, -15, 0], rotateY: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(-40px)" }}
              >
                <div className="text-xs text-[var(--text-muted)] mb-1">Transactions</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">2.4M</div>
                <div className="text-xs text-emerald-400 mt-1">+12.5%</div>
              </motion.div>

              {/* Floating glass card 2 - middle */}
              <motion.div
                className="absolute bottom-20 left-5 w-44 h-28 glass-card-3d rounded-2xl p-4"
                animate={{ y: [0, 12, 0], rotateX: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transform: "translateZ(-20px)" }}
              >
                <div className="text-xs text-[var(--text-muted)] mb-1">Active Nodes</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">8,942</div>
                <div className="text-xs text-[var(--primary)] mt-1">Live</div>
              </motion.div>

              {/* Floating glass card 3 - front */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-36 glass-card-3d rounded-2xl p-5"
                animate={{ y: [0, -20, 0], rotateZ: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-pulse" />
                  <div className="text-xs text-[var(--text-muted)]">Network Health</div>
                </div>
                <div className="text-3xl font-bold text-[var(--text-primary)]">99.97%</div>
                <div className="w-full h-1.5 bg-[var(--glass-border)] rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "99.97%" }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* Decorative ring */}
              <motion.div
                className="absolute inset-0 border border-[var(--glass-border)] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transform: "translateZ(-60px)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('stats')}
        >
          <span className="text-xs text-[var(--text-muted)]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
