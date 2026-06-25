"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Zap, Shield, BarChart3, Layers } from "lucide-react";

const products = [
  {
    name: "Block Explorer Solutions",
    description: "Real-time multi-chain block explorers with advanced search and analytics.",
    status: "Live",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tags: ["Real-time", "Multi-chain", "API"],
    icon: Layers,
    href: "/products",
  },
  {
    name: "Blockchain Analytics Dashboard",
    description: "Comprehensive on-chain analytics with custom metrics and reporting.",
    status: "Live",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tags: ["Dashboards", "Metrics", "Reports"],
    icon: BarChart3,
    href: "/products",
  },
  {
    name: "Transaction Monitoring Platform",
    description: "Real-time transaction monitoring with alerts and compliance tools.",
    status: "Beta",
    statusColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    tags: ["Alerts", "Compliance", "ML"],
    icon: Zap,
    href: "/products",
  },
  {
    name: "Enterprise Blockchain Tools",
    description: "Private and consortium blockchain solutions for B2B applications.",
    status: "Live",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tags: ["Private", "Consortium", "B2B"],
    icon: Shield,
    href: "/products",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProductsSection() {
  return (
    <section id="products" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-4">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Built for the{" "}
            <span className="text-gradient">Decentralized Future</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Production-ready platforms powering the next generation of blockchain applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-4"
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={itemVariants}>
              <Link href={product.href}>
                <div className="group relative h-full p-6 rounded-2xl floating-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-[var(--text-primary)]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${product.statusColor}`}>
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--accent)] group-hover:text-[var(--link-hover)] transition-colors flex items-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors flex items-center">
                      Learn More
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
