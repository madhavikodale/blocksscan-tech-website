"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Globe, Award, Zap, Shield, Activity } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: 500, suffix: "+", label: "Projects Delivered", sublabel: "Across 12 chains" },
  { icon: Users, value: 50, suffix: "+", label: "Enterprise Clients", sublabel: "Fortune 500 to startups" },
  { icon: Globe, value: 25, suffix: "M+", label: "Transactions Processed", sublabel: "Real-time indexing" },
  { icon: Award, value: 98, suffix: "%", label: "Client Satisfaction", sublabel: "NPS score 72" },
];

const liveMetrics = [
  { label: "Network Uptime", value: "99.99%", icon: Zap, color: "#10b981" },
  { label: "Blocks Indexed", value: "18.4M", icon: Activity, color: "#3b82f6" },
  { label: "Security Audits", value: "200+", icon: Shield, color: "#8b5cf6" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [livePulse, setLivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((p) => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 border-y border-white/[0.08] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${livePulse}% 50%, rgba(59, 130, 246, 0.05), transparent 50%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Live Metrics Ticker */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {liveMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-3 px-5 py-3 rounded-full glass-card"
            >
              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
              <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {metric.label}
              </span>
              <span className="text-sm font-bold" style={{ color: metric.color }}>
                {metric.value}
              </span>
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: metric.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: metric.color }}
                />
              </span>
            </div>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl glass-card hover:border-blue-500/30 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-slate-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
