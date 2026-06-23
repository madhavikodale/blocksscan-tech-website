"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Hexagon, Network, Shield, ChevronDown } from "lucide-react";
import { NetworkVisualization } from "@/components/network-visualization";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Live Network Background */}
      <div className="absolute inset-0">
        <NetworkVisualization />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                backgroundColor: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Live Network Active — 50+ Enterprise Clients
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span style={{ color: "var(--text-primary)" }}>Building the Future</span>
              <br />
              <span style={{ color: "var(--text-primary)" }}>of </span>
              <span className="text-gradient">Decentralized</span>{" "}
              <span style={{ color: "var(--text-primary)" }}>Innovation</span>
            </h1>

            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              BlocksScan builds the infrastructure that powers blockchain
              visibility. Real-time explorers, analytics, and monitoring for
              the decentralized future.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-white border-0 px-8 h-12 text-base font-medium group"
                >
                  Explore Platform
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 h-12 text-base font-medium"
                  style={{
                    borderColor: "var(--btn-outline-border)",
                    color: "var(--btn-outline-text)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--btn-outline-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 flex items-center justify-center text-xs font-bold text-white"
                    style={{ borderColor: "var(--page-bg)" }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  500+ Projects
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Delivered Successfully
                </div>
              </div>
            </div>
          </div>

          {/* Visual - Live Block Preview */}
          <div
            className={`relative hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Central Block */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 bg-gradient-primary rounded-3xl rotate-45 opacity-20 blur-xl animate-pulse-slow" />
                  <div className="absolute inset-4 glass-card rounded-2xl flex flex-col items-center justify-center p-6">
                    <Hexagon
                      className="w-16 h-16 text-blue-400 mb-4"
                      strokeWidth={1}
                    />
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Block #18,429,301
                      </div>
                      <div
                        className="text-sm font-mono"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        0x7a3f...9e2d
                      </div>
                      <div className="flex items-center gap-2 mt-3 justify-center">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          2.4s ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="glass-card p-4 rounded-xl glow-blue">
                    <Network className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "25s", animationDirection: "reverse" }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                  <div className="glass-card p-4 rounded-xl glow-purple">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "30s" }}
              >
                <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2">
                  <div className="glass-card p-4 rounded-xl glow-blue">
                    <Activity className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 500 500"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="180"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="220"
                  fill="none"
                  stroke="url(#grad2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient
                    id="grad2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
        </div>
      </div>
    </section>
  );
}

// Activity icon for the orbiting element
function Activity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
