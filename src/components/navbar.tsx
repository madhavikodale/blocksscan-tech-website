"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Blocks,
  Search,
  Command,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const toolLinks = [
  { label: "Transaction Tracer", href: "/tools/transaction-tracer" },
  { label: "Contract Scanner", href: "/tools/contract-scanner" },
  { label: "MEV Monitor", href: "/tools/mev-monitor" },
  { label: "Whale Tracker", href: "/tools/whale-tracker" },
  { label: "Bridge Tracker", href: "/tools/bridge-tracker" },
];

const themeIcons = {
  light: Sun,
  dim: Monitor,
  dark: Moon,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    const themes: ("light" | "dim" | "dark")[] = ["light", "dim", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const ThemeIcon = themeIcons[theme] || Monitor;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[var(--glass-border)]"
      style={{
        background: "rgba(12, 14, 20, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-[var(--glow-blue)]">
              <Blocks className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--link-color)] transition-colors">
              BlocksScan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--glass-bg)]"
              >
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--glass-bg)]">
                Tools
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 rounded-xl glass-card p-2 shadow-2xl"
                  >
                    {toolLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)] rounded-lg transition-colors"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg hover:bg-[var(--glass-bg-hover)] transition-colors">
              <Search className="w-4 h-4" />
              <span>Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg hover:bg-[var(--glass-bg-hover)] transition-colors"
              title={`Theme: ${theme}`}
            >
              <ThemeIcon className="w-4 h-4" />
            </button>

            <Link href="/book-demo">
              <Button
                size="sm"
                className="bg-gradient-primary hover:opacity-90 text-[var(--text-primary)] border-0 shadow-lg shadow-[var(--glow-blue)]"
              >
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-card border-t border-[var(--glass-border)]"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[var(--glass-border)]">
                <p className="px-3 py-2 text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  Tools
                </p>
                {toolLinks.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={cycleTheme}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg"
                >
                  <ThemeIcon className="w-4 h-4" />
                  <span className="capitalize">{theme}</span>
                </button>
                <Link href="/book-demo" className="flex-1">
                  <Button className="w-full bg-gradient-primary text-[var(--text-primary)] border-0">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
