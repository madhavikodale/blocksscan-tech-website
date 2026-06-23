"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Blocks,
  FileCode,
  Layout,
  Plug,
  Server,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Blocks,
    title: "Blockchain Development",
    description:
      "End-to-end blockchain solutions using Ethereum, Polygon, BSC, and other leading networks. Custom chain development and protocol engineering.",
    features: ["Layer 1 & Layer 2", "Custom Protocols", "Cross-chain Bridges"],
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accent: "#3b82f6",
  },
  {
    icon: FileCode,
    title: "Smart Contract Development",
    description:
      "Secure, audited smart contracts for DeFi, NFTs, DAOs, and enterprise use cases. Solidity, Rust, and Move language expertise.",
    features: ["Solidity/Rust", "Security Audits", "Gas Optimization"],
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "#8b5cf6",
  },
  {
    icon: Layout,
    title: "DApp Development",
    description:
      "Full-stack decentralized applications with intuitive UX. From concept to deployment with modern frontend frameworks.",
    features: ["React/Next.js", "Wallet Integration", "IPFS Storage"],
    color: "cyan",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "#06b6d4",
  },
  {
    icon: Plug,
    title: "Web3 Integration",
    description:
      "Seamless Web3 integration for existing applications. Wallet connectivity, token gating, and blockchain data indexing.",
    features: ["WalletConnect", "SIWE Auth", "The Graph"],
    color: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "#10b981",
  },
  {
    icon: Server,
    title: "Node Infrastructure",
    description:
      "Enterprise-grade node deployment and management. RPC endpoints, validators, and network monitoring solutions.",
    features: ["RPC Nodes", "Validators", "Monitoring"],
    color: "orange",
    gradient: "from-orange-500/20 to-amber-500/20",
    accent: "#f59e0b",
  },
  {
    icon: Lightbulb,
    title: "Blockchain Consulting",
    description:
      "Strategic advisory for blockchain adoption. Tokenomics design, regulatory guidance, and technical architecture planning.",
    features: ["Tokenomics", "Compliance", "Architecture"],
    color: "pink",
    gradient: "from-pink-500/20 to-rose-500/20",
    accent: "#ec4899",
  },
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
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
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--link-color)" }}
            >
              Our Services
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Comprehensive Blockchain
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From ideation to deployment, we provide full-stack blockchain
            services tailored to your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={service.title}
                className={`group glass-card transition-all duration-500 cursor-pointer overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: isHovered
                    ? service.accent + "40"
                    : "var(--glass-border)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="relative p-6">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300"
                    style={{
                      backgroundColor: isHovered
                        ? service.accent + "20"
                        : service.accent + "10",
                      color: service.accent,
                    }}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>

                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isHovered
                            ? service.accent + "15"
                            : "var(--glass-bg)",
                          color: isHovered
                            ? service.accent
                            : "var(--text-secondary)",
                          border: `1px solid ${
                            isHovered
                              ? service.accent + "30"
                              : "var(--glass-border)"
                          }`,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-medium transition-colors group/link"
                    style={{ color: "var(--link-color)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--link-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--link-color)")
                    }
                  >
                    View All Services
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
