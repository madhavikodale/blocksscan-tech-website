"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

const faqs = [
  {
    question: "What blockchain networks do you support?",
    answer:
      "We support all major EVM chains including Ethereum, Polygon, BSC, Arbitrum, Optimism, and Avalanche. We also work with Solana, Cosmos, and can build on custom or private networks.",
  },
  {
    question: "How long does a typical blockchain project take?",
    answer:
      "Project timelines vary based on complexity. A simple smart contract audit might take 1-2 weeks, while a full DApp development can take 2-4 months. We provide detailed timelines during our discovery phase.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages including monitoring, bug fixes, security updates, and feature enhancements. We believe in long-term partnerships.",
  },
  {
    question: "What is your approach to security?",
    answer:
      "Security is embedded in every phase. We follow industry best practices, conduct thorough testing, and partner with leading audit firms for independent verification before mainnet deployment.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Absolutely. We specialize in enterprise integration, connecting blockchain solutions with existing ERP, CRM, and legacy systems through APIs, middleware, and custom connectors.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm text-blue-400 font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about our blockchain services and process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="glass-card border-white/[0.08] overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-medium pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
