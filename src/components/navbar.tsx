"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Blocks } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b shadow-lg"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
        borderColor: isScrolled ? 'var(--nav-border)' : 'transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-primary">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span style={{ color: 'var(--text-primary)' }}>Blocks</span>
              <span className="text-gradient">Scan</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(link.href)
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
                style={{
                  color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact">
              <Button
                size="sm"
                className="bg-gradient-primary hover:opacity-90 text-white border-0"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden" style={{ color: 'var(--text-primary)' }}>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] p-0"
                style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--nav-border)' }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--nav-border)' }}>
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
                        <Blocks className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold">
                        <span style={{ color: 'var(--text-primary)' }}>Blocks</span>
                        <span className="text-gradient">Scan</span>
                      </span>
                    </Link>
                  </div>
                  <nav className="flex flex-col p-4 gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive(link.href)
                            ? "bg-white/10"
                            : "hover:bg-white/5"
                        }`}
                        style={{
                          color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t" style={{ borderColor: 'var(--nav-border)' }}>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-primary hover:opacity-90 text-white border-0">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
