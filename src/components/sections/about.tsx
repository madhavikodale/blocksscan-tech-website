"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Zap, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "Pushing the boundaries of what's possible with blockchain technology.",
  },
  {
    icon: Shield,
    title: "Security by Design",
    description: "Every solution built with security as the foundational principle.",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    description: "Optimized for speed, scalability, and real-world impact.",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our success. We're partners, not just vendors.",
  },
];

const teamHighlights = [
  { stat: "50+", label: "Blockchain Experts" },
  { stat: "8+", label: "Years Experience" },
  { stat: "30+", label: "Countries Served" },
  { stat: "100%", label: "Remote-First" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm text-cyan-400 font-medium">About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pioneering the
            <span className="text-gradient"> Blockchain </span>
            Revolution
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            BlocksScan Technology was founded with a singular mission: to make blockchain technology accessible, 
            secure, and scalable for businesses of all sizes. We believe in a decentralized future.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <Card className="glass-card border-white/[0.08]">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                To be the leading force in blockchain adoption, empowering businesses to leverage 
                decentralized technology for transparent, efficient, and trustless operations. We envision 
                a world where blockchain is as ubiquitous as the internet.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/[0.08]">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To deliver enterprise-grade blockchain solutions that solve real-world problems. We combine 
                technical excellence with business acumen to create solutions that drive measurable ROI 
                for our clients.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {teamHighlights.map((item) => (
            <div key={item.label} className="text-center p-6 rounded-2xl glass-card">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">{item.stat}</div>
              <div className="text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-10">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card
                key={value.title}
                className="glass-card border-white/[0.08] hover:border-white/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-blue-400 mb-4 group-hover:bg-blue-500/10 transition-colors">
                    <value.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
