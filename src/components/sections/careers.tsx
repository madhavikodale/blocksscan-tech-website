"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  ArrowRight,
  Users,
  Coffee,
  Globe,
  Heart,
  Zap,
  X,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

const positions = [
  {
    id: "senior-blockchain-dev",
    title: "Senior Blockchain Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120k - $180k",
    description:
      "Lead blockchain protocol development, smart contract architecture, and cross-chain integration projects.",
    requirements: [
      "Deep expertise in Solidity, Rust, or Move",
      "Experience with Layer 2 solutions (Arbitrum, Optimism)",
      "Strong understanding of DeFi protocols",
      "Security-first mindset with audit experience",
    ],
  },
  {
    id: "smart-contract-auditor",
    title: "Smart Contract Auditor",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$100k - $150k",
    description:
      "Conduct comprehensive security audits of smart contracts, identify vulnerabilities, and provide remediation guidance.",
    requirements: [
      "Proven track record in smart contract auditing",
      "Familiarity with tools like Slither, Mythril, Echidna",
      "Understanding of common attack vectors (reentrancy, overflow, etc.)",
      "Published audit reports or bug bounties",
    ],
  },
  {
    id: "web3-frontend-engineer",
    title: "Web3 Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$90k - $140k",
    description:
      "Build intuitive DApp interfaces with React/Next.js, Web3 integration, and wallet connectivity.",
    requirements: [
      "Expert in React/Next.js and TypeScript",
      "Experience with wagmi, viem, ethers.js",
      "Strong UI/UX sensibility",
      "Understanding of Web3 auth patterns (SIWE, WalletConnect)",
    ],
  },
  {
    id: "solutions-architect",
    title: "Blockchain Solutions Architect",
    department: "Solutions",
    location: "Remote",
    type: "Full-time",
    experience: "7+ years",
    salary: "$150k - $220k",
    description:
      "Design enterprise blockchain architectures, lead client engagements, and drive technical strategy.",
    requirements: [
      "Deep knowledge of enterprise blockchain (Hyperledger, R3 Corda)",
      "Client-facing experience with C-level stakeholders",
      "Cross-functional team leadership",
      "Tokenomics and governance design experience",
    ],
  },
  {
    id: "devops-blockchain",
    title: "DevOps Engineer - Blockchain",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    salary: "$110k - $160k",
    description:
      "Manage blockchain node infrastructure, CI/CD pipelines, and cloud deployments across multiple networks.",
    requirements: [
      "Experience with Kubernetes and Docker",
      "Blockchain node deployment (Geth, Erigon, Besu)",
      "Cloud platforms (AWS, GCP, Azure)",
      "Monitoring and observability (Prometheus, Grafana)",
    ],
  },
];

const benefits = [
  { icon: DollarSign, title: "Competitive Salary", description: "Top-tier compensation with equity options" },
  { icon: Globe, title: "Fully Remote", description: "Work from anywhere in the world" },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage" },
  { icon: Zap, title: "Learning Budget", description: "$5,000 annual learning and development budget" },
  { icon: Coffee, title: "Flexible Hours", description: "Async-friendly with core collaboration hours" },
  { icon: Users, title: "Team Retreats", description: "Annual team gatherings in exciting locations" },
];

export function CareersSection() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedPosition = positions.find((p) => p.id === selectedJob);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setFormData({ name: "", email: "", portfolio: "", coverLetter: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="careers" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm text-pink-400 font-medium">Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Build the Future of{" "}
            <span className="text-gradient">Blockchain</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join a team of passionate engineers, designers, and visionaries shaping the decentralized future.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="glass-card border-white/[0.08] hover:border-white/20 transition-all"
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-blue-400 mb-4">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Open Positions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-8">
            Open Positions ({positions.length})
          </h3>
          <div className="space-y-4">
            {positions.map((position) => (
              <Card
                key={position.id}
                className="glass-card border-white/[0.08] hover:border-white/20 transition-all group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h4 className="text-lg font-semibold text-white">
                          {position.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                        >
                          {position.department}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 max-w-2xl">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {position.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {position.salary}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedJob(position.id)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 group/btn shrink-0"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && selectedPosition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Apply for {selectedPosition.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{selectedPosition.department} · {selectedPosition.location} · {selectedPosition.salary}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {selectedPosition.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span> {req}
                    </li>
                  ))}
                </ul>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Application Submitted!</h4>
                  <p className="text-slate-400">We'll review your application and get back to you within 5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-1 block">Full Name <span className="text-red-400">*</span></label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.name ? "border-red-500/50" : ""}`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-1 block">Email <span className="text-red-400">*</span></label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.email ? "border-red-500/50" : ""}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-1 block">Portfolio / GitHub / LinkedIn</label>
                    <Input
                      name="portfolio"
                      placeholder="https://github.com/johndoe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-1 block">Cover Letter <span className="text-red-400">*</span></label>
                    <Textarea
                      name="coverLetter"
                      placeholder="Tell us why you're a great fit for this role..."
                      rows={4}
                      className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none ${errors.coverLetter ? "border-red-500/50" : ""}`}
                      value={formData.coverLetter}
                      onChange={handleChange}
                    />
                    {errors.coverLetter && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.coverLetter}</p>}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedJob(null)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-gradient-primary hover:opacity-90 text-white border-0 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
