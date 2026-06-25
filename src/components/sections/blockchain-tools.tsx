"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Route,
  ShieldAlert,
  Zap,
  Fish,
  ArrowRightLeft,
} from "lucide-react";

const tools = [
  {
    id: "transaction-tracer",
    name: "Transaction Tracer",
    description: "Visualize transaction flows with animated flow maps and risk scoring.",
    icon: Route,
    color: "#3b82f6",
    href: "/tools/transaction-tracer",
  },
  {
    id: "contract-scanner",
    name: "Contract Scanner",
    description: "Scan smart contracts for vulnerabilities with severity ratings.",
    icon: ShieldAlert,
    color: "#ef4444",
    href: "/tools/contract-scanner",
  },
  {
    id: "mev-monitor",
    name: "MEV Monitor",
    description: "Real-time MEV activity tracking with live feed and bot labels.",
    icon: Zap,
    color: "#f59e0b",
    href: "/tools/mev-monitor",
  },
  {
    id: "whale-tracker",
    name: "Whale Tracker",
    description: "Track whale wallets, cluster analysis, and movement alerts.",
    icon: Fish,
    color: "#8b5cf6",
    href: "/tools/whale-tracker",
  },
  {
    id: "bridge-tracker",
    name: "Bridge Tracker",
    description: "Monitor cross-chain bridges and detect anomalies.",
    icon: ArrowRightLeft,
    color: "#10b981",
    href: "/tools/bridge-tracker",
  },
];

export function BlockchainToolsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
            Tools
          </span>
          <h2 className="text-3xl font-bold text-gradient mb-4">Advanced Blockchain Tools</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Powerful analytics and monitoring tools for blockchain security and intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link href={tool.href}>
                <div
                  className="floating-card rounded-xl p-6 h-full group cursor-pointer"
                  style={{ borderColor: `${tool.color}20` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                    >
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <ArrowRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: tool.color }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {tool.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
