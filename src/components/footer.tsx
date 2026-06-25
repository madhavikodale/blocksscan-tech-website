"use client";

import Link from "next/link";
import { Blocks, Globe, MessageSquare, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Blockchain Development", href: "/services" },
    { label: "Smart Contracts", href: "/services" },
    { label: "DApp Development", href: "/services" },
    { label: "Web3 Integration", href: "/services" },
  ],
  products: [
    { label: "Block Explorer", href: "/products" },
    { label: "Analytics Dashboard", href: "/products" },
    { label: "Transaction Monitor", href: "/products" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "https://blocksscan.tech", label: "Website" },
  { icon: MessageSquare, href: "https://discord.gg/blocksscan", label: "Discord" },
  { icon: Mail, href: "mailto:hello@blocksscan.tech", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)]" style={{ backgroundColor: "var(--footer-bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-primary">
                <Blocks className="w-5 h-5 text-[var(--text-primary)]" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[var(--text-primary)]">Blocks</span>
                <span className="text-gradient">Scan</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs mb-6 text-[var(--text-secondary)]">
              Building the infrastructure that powers blockchain visibility.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-hover)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} BlocksScan Technology. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Built for the decentralized future.
          </p>
        </div>
      </div>
    </footer>
  );
}
