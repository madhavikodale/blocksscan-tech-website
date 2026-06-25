"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Blocks, Cpu, Globe, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Blocks,
    title: "Multi-Chain Architecture",
    description: "Native support for Ethereum, Polygon, BSC, Solana, and emerging L2s. One platform, every chain.",
    stat: "12+ Chains",
    color: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Real-Time Indexing",
    description: "Sub-second block ingestion with custom event filters. See transactions as they confirm.",
    stat: "<2s Latency",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified infrastructure with encrypted data pipelines and role-based access.",
    stat: "SOC 2",
    color: "#10b981",
  },
  {
    icon: Cpu,
    title: "Custom RPC Clusters",
    description: "Dedicated node clusters with 99.99% uptime SLA. No rate limits, no shared resources.",
    stat: "99.99%",
    color: "#8b5cf6",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Data served from 40+ edge locations worldwide. Low latency for users everywhere.",
    stat: "40+ Regions",
    color: "#06b6d4",
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium" style={{ color: "var(--link-color)" }}>
              Platform Features
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Infrastructure Built for
            <span className="text-gradient"> Scale</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Enterprise-grade blockchain infrastructure that scales with your growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const isActive = activeFeature === index;

              return (
                <div
                  key={feature.title}
                  className={`group p-5 rounded-2xl cursor-pointer transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    backgroundColor: isActive ? feature.color + "10" : "transparent",
                    border: `1px solid ${isActive ? feature.color + "30" : "var(--glass-border)"}`,
                  }}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? feature.color + "20" : "var(--glass-bg)",
                        color: feature.color,
                      }}
                    >
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className="font-semibold transition-colors"
                          style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: feature.color + "15",
                            color: feature.color,
                          }}
                        >
                          {feature.stat}
                        </span>
                      </div>
                      <p
                        className={`text-sm transition-all duration-500 ${
                          isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                      style={{ color: feature.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Preview */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30 transition-colors duration-500"
                style={{ backgroundColor: features[activeFeature].color }}
              />

              {/* Card */}
              <div className="relative glass-card rounded-3xl p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: features[activeFeature].color + "20",
                        color: features[activeFeature].color,
                      }}
                    >
                      {(() => {
                        const Icon = features[activeFeature].icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {features[activeFeature].title}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {features.map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            i === activeFeature
                              ? features[activeFeature].color
                              : "var(--glass-border)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated content based on active feature */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold mb-2 transition-colors duration-500"
                      style={{ color: features[activeFeature].color }}
                    >
                      {features[activeFeature].stat}
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--glass-border)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Live Infrastructure Status
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: features[activeFeature].color }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-full w-full"
                        style={{ backgroundColor: features[activeFeature].color }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-[var(--text-primary)] border-0 px-8 h-12 text-base font-medium group"
            >
              Explore All Features
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
