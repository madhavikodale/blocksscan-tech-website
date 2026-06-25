"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    name: "DeFi Pulse Explorer",
    description: "Real-time DeFi protocol tracking and analytics dashboard.",
    tags: ["DeFi", "Analytics", "Ethereum"],
    image: "gradient-1",
    href: "/projects",
  },
  {
    name: "NFT Marketplace Indexer",
    description: "Cross-chain NFT marketplace data aggregation and search.",
    tags: ["NFT", "Indexing", "Multi-chain"],
    image: "gradient-2",
    href: "/projects",
  },
  {
    name: "Cross-Chain Bridge Monitor",
    description: "Bridge transaction monitoring and anomaly detection system.",
    tags: ["Bridge", "Security", "Monitoring"],
    image: "gradient-3",
    href: "/projects",
  },
];

const gradientMap: Record<string, string> = {
  "gradient-1": "from-blue-500 to-cyan-500",
  "gradient-2": "from-purple-500 to-pink-500",
  "gradient-3": "from-orange-500 to-red-500",
};

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

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--primary)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Featured{" "}
            <span className="text-gradient">Deployments</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real-world blockchain solutions we've built for enterprises and protocols.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-4"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={itemVariants}>
              <Link href={project.href}>
                <div className="group relative h-full rounded-2xl floating-card overflow-hidden">
                  {/* Image placeholder with gradient */}
                  <div className={`h-48 bg-gradient-to-br ${gradientMap[project.image]} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[var(--primary)] group-hover:text-[var(--link-hover)] transition-colors flex items-center">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors flex items-center">
                      <Code2 className="w-4 h-4 mr-1" />
                      Code
                    </span>
                    </div>
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
