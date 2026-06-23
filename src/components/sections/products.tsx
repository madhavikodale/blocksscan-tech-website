"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BarChart3,
  Activity,
  Briefcase,
  ArrowRight,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: Search,
    title: "Block Explorer Solutions",
    description:
      "Real-time blockchain explorer with advanced search, transaction tracing, and address analytics. Support for EVM and non-EVM chains.",
    tags: ["Real-time", "Multi-chain", "API"],
    status: "Live",
    color: "blue",
    accent: "#3b82f6",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: BarChart3,
    title: "Blockchain Analytics Dashboard",
    description:
      "Enterprise-grade analytics platform with custom dashboards, on-chain metrics, and portfolio tracking across multiple networks.",
    tags: ["Dashboards", "Metrics", "Reports"],
    status: "Live",
    color: "purple",
    accent: "#8b5cf6",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Activity,
    title: "Transaction Monitoring Platform",
    description:
      "Real-time transaction monitoring with alerting, anomaly detection, and compliance reporting for financial institutions.",
    tags: ["Alerts", "Compliance", "ML"],
    status: "Beta",
    color: "cyan",
    accent: "#06b6d4",
    gradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: Briefcase,
    title: "Enterprise Blockchain Tools",
    description:
      "Private blockchain deployment, consortium management, and enterprise integration tools for B2B use cases.",
    tags: ["Private", "Consortium", "B2B"],
    status: "Live",
    color: "emerald",
    accent: "#10b981",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
];

export function ProductsSection() {
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
      id="products"
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
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">
              Our Products
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Built for the
            <span className="text-gradient"> Decentralized</span> Future
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Production-ready tools that power blockchain infrastructure for
            enterprises and developers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={product.title}
                className={`group glass-card overflow-hidden transition-all duration-500 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  borderColor: isHovered
                    ? product.accent + "40"
                    : "var(--glass-border)",
                  transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="relative p-0">
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300"
                        style={{
                          backgroundColor: isHovered
                            ? product.accent + "20"
                            : product.accent + "10",
                          color: product.accent,
                        }}
                      >
                        <product.icon className="w-7 h-7" />
                      </div>
                      <Badge
                        variant="outline"
                        className="transition-all duration-300"
                        style={{
                          backgroundColor:
                            product.status === "Live"
                              ? isHovered
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(16, 185, 129, 0.1)"
                              : isHovered
                                ? "rgba(245, 158, 11, 0.2)"
                                : "rgba(245, 158, 11, 0.1)",
                          color:
                            product.status === "Live"
                              ? "#10b981"
                              : "#f59e0b",
                          borderColor:
                            product.status === "Live"
                              ? "rgba(16, 185, 129, 0.3)"
                              : "rgba(245, 158, 11, 0.3)",
                        }}
                      >
                        <span className="relative flex h-1.5 w-1.5 mr-1.5">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{
                              backgroundColor:
                                product.status === "Live"
                                  ? "#10b981"
                                  : "#f59e0b",
                            }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-full w-full"
                            style={{
                              backgroundColor:
                                product.status === "Live"
                                  ? "#10b981"
                                  : "#f59e0b",
                            }}
                          />
                        </span>
                        {product.status}
                      </Badge>
                    </div>

                    <h3
                      className="text-xl lg:text-2xl font-semibold mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {product.title}
                    </h3>
                    <p
                      className="leading-relaxed mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isHovered
                              ? product.accent + "15"
                              : "var(--glass-bg)",
                            color: isHovered
                              ? product.accent
                              : "var(--text-secondary)",
                            border: `1px solid ${
                              isHovered
                                ? product.accent + "30"
                                : "var(--glass-border)"
                            }`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-sm font-medium transition-colors group/link"
                        style={{ color: product.accent }}
                      >
                        Get Started
                        <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/products"
                        className="inline-flex items-center text-sm font-medium transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-secondary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-muted)")
                        }
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
