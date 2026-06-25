"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Blocks,
  FileCode,
  Globe,
  Server,
  Shield,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Blocks,
    title: "Blockchain Development",
    description:
      "Custom blockchain solutions tailored to your business needs. From consensus mechanisms to network architecture.",
    color: "from-blue-500 to-blue-600",
    href: "/services",
  },
  {
    icon: FileCode,
    title: "Smart Contract Development",
    description:
      "Secure, audited smart contracts for DeFi, NFTs, and enterprise applications. Multi-chain deployment support.",
    color: "from-purple-500 to-purple-600",
    href: "/services",
  },
  {
    icon: Globe,
    title: "DApp Development",
    description:
      "Full-stack decentralized applications with intuitive UX. React, Vue, and mobile-native frameworks.",
    color: "from-cyan-500 to-cyan-600",
    href: "/services",
  },
  {
    icon: Server,
    title: "Node Infrastructure",
    description:
      "Enterprise-grade node deployment and management. 99.99% uptime with global edge distribution.",
    color: "from-emerald-500 to-emerald-600",
    href: "/services",
  },
  {
    icon: Shield,
    title: "Security Audits",
    description:
      "Comprehensive smart contract and protocol audits. Automated scanning + manual expert review.",
    color: "from-orange-500 to-orange-600",
    href: "/services",
  },
  {
    icon: BarChart3,
    title: "Blockchain Analytics",
    description:
      "Real-time on-chain data analysis and visualization. Custom dashboards and alerting systems.",
    color: "from-pink-500 to-pink-600",
    href: "/services",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Comprehensive{" "}
            <span className="text-gradient">Blockchain Solutions</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            End-to-end services for building, deploying, and scaling blockchain
            infrastructure.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link href={service.href}>
                <div className="group relative h-full p-6 rounded-2xl floating-card">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-6 h-6 text-[var(--text-primary)]" />
                  </div>

                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center text-sm text-[var(--link-color)] group-hover:text-[var(--link-hover)] transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
