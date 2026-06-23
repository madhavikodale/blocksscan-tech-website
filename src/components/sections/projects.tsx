"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Shield,
  Wallet,
  Vote,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    icon: Layers,
    title: "DeFi Lending Protocol",
    category: "DeFi",
    description:
      "A decentralized lending platform enabling collateralized loans, flash loans, and yield farming across multiple chains.",
    stack: ["Solidity", "React", "The Graph", "Chainlink"],
    metrics: "$50M+ TVL",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Supply Chain Traceability",
    category: "Enterprise",
    description:
      "End-to-end supply chain tracking solution for a Fortune 500 manufacturer, ensuring product authenticity and compliance.",
    stack: ["Hyperledger", "Node.js", "IPFS", "React"],
    metrics: "1M+ Products",
    color: "emerald",
  },
  {
    icon: Wallet,
    title: "Multi-Chain Wallet",
    category: "Infrastructure",
    description:
      "Non-custodial wallet supporting 15+ chains with built-in swap, staking, and NFT management features.",
    stack: ["React Native", "Web3.js", "WalletConnect", "Rust"],
    metrics: "100K+ Users",
    color: "purple",
  },
  {
    icon: Vote,
    title: "DAO Governance Platform",
    category: "Governance",
    description:
      "On-chain governance solution with delegated voting, proposal execution, and treasury management for DAOs.",
    stack: ["Solidity", "Next.js", "Snapshot", "Tenderly"],
    metrics: "25 DAOs",
    color: "cyan",
  },
  {
    icon: Gamepad2,
    title: "Play-to-Earn Gaming",
    category: "Gaming",
    description:
      "Blockchain-based gaming ecosystem with NFT assets, in-game marketplace, and token rewards system.",
    stack: ["Unity", "Solidity", "Polygon", "Firebase"],
    metrics: "50K+ Players",
    color: "orange",
  },
  {
    icon: Layers,
    title: "Cross-Chain Bridge",
    category: "Infrastructure",
    description:
      "Secure cross-chain asset bridge with multi-sig validation, liquidity pools, and slashing mechanisms.",
    stack: ["Rust", "Cosmos SDK", "TypeScript", "Redis"],
    metrics: "$10M+ Bridged",
    color: "pink",
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
};

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm text-emerald-400 font-medium">Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real-world blockchain solutions that have delivered measurable impact for our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = colorMap[project.color];
            return (
              <Card
                key={project.title}
                className="group glass-card border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text}`}
                    >
                      <project.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={colors.badge}>
                      {project.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-sm font-semibold text-white">
                      {project.metrics}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      Start Similar Project
                      <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
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
