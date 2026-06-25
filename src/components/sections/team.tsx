"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, Code2 } from "lucide-react";

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Former Chainalysis engineer. 10+ years in blockchain infrastructure.",
    initials: "AC",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sarah Kim",
    role: "CTO",
    bio: "Ex-Ethereum core developer. Distributed systems expert.",
    initials: "SK",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Security",
    bio: "Smart contract auditor. 500+ audits completed.",
    initials: "MJ",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Emily Zhang",
    role: "Lead Developer",
    bio: "Full-stack Web3 engineer. Open source contributor.",
    initials: "EZ",
    gradient: "from-emerald-500 to-teal-500",
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

export function TeamSection() {
  return (
    <section id="team" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--accent)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-4">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Meet the{" "}
            <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            World-class team with deep expertise in blockchain, security, and distributed systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={itemVariants}>
              <div className="group relative p-6 rounded-2xl floating-card text-center">
                {/* Avatar */}
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">{member.initials}</span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[var(--primary)] mb-3">{member.role}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{member.bio}</p>

                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 rounded-lg bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <Code2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
