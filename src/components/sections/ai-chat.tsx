"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const demoResponses: Record<string, string> = {
  "what is blocksscan": "BlocksScan is a comprehensive blockchain infrastructure platform providing real-time explorers, analytics, and monitoring tools for Web3 applications.",
  "services": "We offer Blockchain Development, Smart Contract Development, DApp Development, Node Infrastructure, Security Audits, and Blockchain Analytics.",
  "products": "Our products include Block Explorer Solutions, Blockchain Analytics Dashboard, Transaction Monitoring Platform, and Enterprise Blockchain Tools.",
  "pricing": "We offer flexible pricing tiers starting from $99/month for startups to enterprise custom plans. Contact us for detailed pricing.",
  "contact": "You can reach us at contact@blocksscan.io or use the contact form on our website. We're also available on Discord and Twitter.",
  "demo": "I'd be happy to schedule a demo! Please visit /book-demo or share your email and our team will reach out within 24 hours.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(demoResponses)) {
    if (lower.includes(key)) return response;
  }
  return "I can help you learn about BlocksScan's services, products, pricing, or schedule a demo. What would you like to know?";
}

export function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the BlocksScan AI assistant. I can help you explore our blockchain solutions, services, and products. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-chat" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            AI Assistant
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Ask Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              AI Chat
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get instant answers about our blockchain solutions, pricing, and services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-[var(--glass-border)] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
        >
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[var(--glass-border)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
            <div>
              <h3 className="text-[var(--text-primary)] font-semibold">BlocksScan AI</h3>
              <p className="text-xs text-[var(--text-secondary)]">Online — Ready to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-gradient-primary text-[var(--text-primary)]"
                      : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)]"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-[var(--glass-bg-hover)] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-[var(--text-primary)]" />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-[var(--glass-border)]">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services, products, or pricing..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-[var(--text-primary)] border-0 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
