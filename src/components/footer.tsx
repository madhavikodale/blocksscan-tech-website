"use client";

import Link from "next/link";
import { Blocks, Globe, MessageSquare, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <footer className="border-t" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--footer-border)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-primary">
                <Blocks className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span style={{ color: 'var(--text-primary)' }}>Blocks</span>
                <span className="text-gradient">Scan</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
              Building secure, scalable, and future-ready blockchain solutions for the decentralized world.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--glass-border-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: 'var(--separator)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} BlocksScan Technology. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Empowering Blockchain Innovation Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
