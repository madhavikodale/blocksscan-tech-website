"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "BlocksScan transformed our blockchain infrastructure. Their real-time indexing reduced our data latency from minutes to sub-second. Game-changer for our DeFi platform.",
    author: "Sarah Chen",
    role: "CTO, Nexus Finance",
    rating: 5,
    metric: "Latency reduced by 99%",
  },
  {
    quote: "The multi-chain explorer they built handles 10M+ daily transactions without breaking a sweat. Enterprise-grade reliability with startup-level agility.",
    author: "Marcus Johnson",
    role: "Head of Engineering, ChainVault",
    rating: 5,
    metric: "10M+ daily transactions",
  },
  {
    quote: "We evaluated 6 blockchain infrastructure providers. BlocksScan was the only one that could handle our custom rollup architecture out of the box.",
    author: "Dr. Aisha Patel",
    role: "Lead Architect, zkSync Labs",
    rating: 5,
    metric: "Custom L2 support",
  },
  {
    quote: "Their security audit process caught vulnerabilities that two other firms missed. The depth of their smart contract expertise is unmatched.",
    author: "James Wilson",
    role: "Security Lead, DeFi Shield",
    rating: 5,
    metric: "200+ audits completed",
  },
  {
    quote: "From prototype to production in 8 weeks. BlocksScan's team moves fast without cutting corners. Exactly what we needed for our NFT marketplace launch.",
    author: "Elena Rodriguez",
    role: "Founder, ArtBlock Studios",
    rating: 5,
    metric: "8 weeks to production",
  },
  {
    quote: "The analytics dashboard they built gives us insights we didn't know we needed. Our traders now make decisions 3x faster with real-time on-chain data.",
    author: "David Kim",
    role: "VP Product, TradeFlow",
    rating: 5,
    metric: "3x faster decisions",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium" style={{ color: "var(--link-color)" }}>
              Client Stories
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Trusted by{" "}
            <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            See how teams are building faster and scaling further with BlocksScan infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={index}
                className={`group glass-card transition-all duration-500 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: isHovered
                    ? "rgba(139, 92, 246, 0.3)"
                    : "var(--glass-border)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-purple-400/30 mb-4" />

                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {testimonial.author}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                    <div
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        color: "#8b5cf6",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                      }}
                    >
                      {testimonial.metric}
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
