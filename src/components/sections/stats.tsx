"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Blocks,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const initialStats: StatItem[] = [
  {
    label: "Network Uptime",
    value: "99.99%",
    change: "+0.01%",
    isPositive: true,
    icon: Activity,
  },
  {
    label: "Blocks Indexed",
    value: "18.4M",
    change: "+12.3%",
    isPositive: true,
    icon: Blocks,
  },
  {
    label: "Security Audits",
    value: "200+",
    change: "+8.5%",
    isPositive: true,
    icon: Shield,
  },
  {
    label: "TPS",
    value: "2.4K",
    change: "+15.7%",
    isPositive: true,
    icon: Zap,
  },
  {
    label: "Active Users",
    value: "42.3K",
    change: "+3.1%",
    isPositive: true,
    icon: Users,
  },
  {
    label: "Market Cap",
    value: "$2.4M",
    change: "-5.2%",
    isPositive: false,
    icon: TrendingUp,
  },
];

export function LiveStatsSection() {
  const [stats, setStats] = useState(initialStats);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          const currentVal = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
          const variation = (Math.random() - 0.5) * currentVal * 0.002;
          const newVal = currentVal + variation;

          let formatted: string;
          if (stat.value.includes("M")) {
            formatted = newVal.toFixed(1) + "M";
          } else if (stat.value.includes("K")) {
            formatted = newVal.toFixed(1) + "K";
          } else if (stat.value.includes("%")) {
            formatted = newVal.toFixed(2) + "%";
          } else {
            formatted = Math.round(newVal).toString() + "+";
          }

          return {
            ...stat,
            value: formatted,
          };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            Live Network
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Blockchain{" "}
            <span className="text-gradient">Network Stats</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real-time metrics from across the network. Updated every 5 seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative p-6 rounded-2xl floating-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gradient-text-from)]/20 to-[var(--gradient-text-to)]/20 flex items-center justify-center">
                  {(() => {
                    const IconComponent = stat.icon as React.ElementType;
                    return <IconComponent className="w-5 h-5 text-[var(--primary)]" />;
                  })()}
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.isPositive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-[var(--text-muted)]">
            Last updated: {lastUpdated || "--:--:--"} — Auto-refreshing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
