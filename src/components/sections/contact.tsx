"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
  MessageSquare,
  Share2,
  AlertCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@blocksscan.tech",
    href: "mailto:hello@blocksscan.tech",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Blockchain Blvd, San Francisco, CA 94105",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM PST",
    href: "#",
  },
];

const socialLinks = [
  { icon: Globe, href: "https://blocksscan.tech", label: "Website" },
  { icon: MessageSquare, href: "https://discord.gg/blocksscan", label: "Discord" },
  { icon: Share2, href: "https://t.me/blocksscan", label: "Telegram" },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm text-blue-400 font-medium">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Build{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to start your blockchain journey? Get in touch with our team
            for a free consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <Card
                  key={info.label}
                  className="glass-card border-white/[0.08] hover:border-white/20 transition-all"
                >
                  <CardContent className="p-5">
                    <a href={info.href} className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-400 mb-1">
                          {info.label}
                        </div>
                        <div className="text-white text-sm">{info.value}</div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08] bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Need Urgent Help?
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  For enterprise inquiries and urgent support, schedule a call with our team.
                </p>
                <a
                  href="https://calendly.com/blocksscan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Schedule a Call →
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="glass-card border-white/[0.08]">
            <CardContent className="p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 ${
                          errors.name ? "border-red-500/50" : ""
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 ${
                          errors.email ? "border-red-500/50" : ""
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Company
                      </label>
                      <Input
                        name="company"
                        placeholder="Your Company"
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="subject"
                        placeholder="Project Inquiry"
                        className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 ${
                          errors.subject ? "border-red-500/50" : ""
                        }`}
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 resize-none ${
                        errors.message ? "border-red-500/50" : ""
                      }`}
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-medium disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
