"use client";

import React, { useState } from "react";
import { Mail, Check, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setMessage("Thank you for subscribing! Check your inbox for confirmation.");
      setEmail("");

      // Store in localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem("blocksscan-newsletter") || "[]");
      subscribers.push({ email, subscribedAt: new Date().toISOString() });
      localStorage.setItem("blocksscan-newsletter", JSON.stringify(subscribers));
    }, 1500);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <Mail className="w-4 h-4" style={{ color: "var(--primary)" }} />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Newsletter
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Stay Ahead of the{" "}
          <span className="text-gradient">Blockchain Curve</span>
        </h2>

        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          Get weekly insights on Web3 development, smart contract security, and
          blockchain trends delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className="pl-10 h-12"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text-primary)",
                }}
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="h-12 px-6 bg-gradient-primary hover:opacity-90 text-[var(--text-primary)]"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 mt-3 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" />
              {message}
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 mt-3 text-sm text-emerald-500">
              <Check className="w-4 h-4" />
              {message}
            </div>
          )}
        </form>

        <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
          No spam, unsubscribe anytime. Read our{" "}
          <a href="/privacy" className="underline" style={{ color: "var(--link-color)" }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
