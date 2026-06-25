"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import {
  Search,
  Home,
  Info,
  Briefcase,
  Box,
  FolderGit2,
  Users,
  Mail,
  FileText,
  Shield,
  BarChart3,
  Ticket,
  Calendar,
  Newspaper,
  Bell,
  User,
  Settings,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const searchItems = [
  { title: "Home", href: "/", icon: Home, category: "Pages" },
  { title: "About Us", href: "/about", icon: Info, category: "Pages" },
  { title: "Services", href: "/services", icon: Briefcase, category: "Pages" },
  { title: "Products", href: "/products", icon: Box, category: "Pages" },
  { title: "Projects", href: "/projects", icon: FolderGit2, category: "Pages" },
  { title: "Careers", href: "/careers", icon: Users, category: "Pages" },
  { title: "Contact", href: "/contact", icon: Mail, category: "Pages" },
  { title: "Privacy Policy", href: "/privacy", icon: Shield, category: "Legal" },
  { title: "Terms of Service", href: "/terms", icon: FileText, category: "Legal" },
  { title: "Analytics Dashboard", href: "/dashboard", icon: BarChart3, category: "Features" },
  { title: "Support Tickets", href: "/support", icon: Ticket, category: "Features" },
  { title: "Book a Demo", href: "/book-demo", icon: Calendar, category: "Features" },
  { title: "Blog & News", href: "/blog", icon: Newspaper, category: "Features" },
  { title: "Notifications", href: "/notifications", icon: Bell, category: "Features" },
  { title: "User Profile", href: "/profile", icon: User, category: "Features" },
  { title: "Admin Chat", href: "/admin/chat", icon: Settings, category: "Admin" },
];

const themeActions = [
  { title: "Light Theme", value: "light", icon: Sun },
  { title: "Dim Theme", value: "dim", icon: Monitor },
  { title: "Dark Theme", value: "dark", icon: Moon },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleThemeChange = useCallback(
    (value: string) => {
      setOpen(false);
      setTheme(value as "light" | "dim" | "dark");
    },
    [setTheme]
  );

  const grouped = searchItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof searchItems>);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors hover:bg-[var(--glass-bg)]"
        style={{
          backgroundColor: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          color: "var(--text-muted)",
        }}
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search...</span>
        <kbd
          className="px-1.5 py-0.5 rounded text-[10px] font-mono border"
          style={{
            borderColor: "var(--glass-border)",
            backgroundColor: "var(--input-bg)",
          }}
        >
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div
          className="rounded-xl overflow-hidden border"
          style={{
            backgroundColor: "var(--page-bg-secondary)",
            borderColor: "var(--glass-border)",
          }}
        >
          <CommandInput
            placeholder="Type a command or search..."
            className="border-none focus:ring-0"
            style={{
              backgroundColor: "transparent",
              color: "var(--text-primary)",
            }}
          />
          <CommandList className="max-h-[60vh] overflow-y-auto">
            <CommandEmpty
              className="py-6 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No results found.
            </CommandEmpty>

            {Object.entries(grouped).map(([category, items]) => (
              <CommandGroup
                key={category}
                heading={category}
                className="px-2 py-1"
              >
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      onSelect={() => handleSelect(item.href)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--glass-bg)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm">{item.title}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}

            <CommandSeparator />

            <CommandGroup heading="Theme" className="px-2 py-1">
              {themeActions.map((action) => {
                const Icon = action.icon;
                const isActive = theme === action.value;
                return (
                  <CommandItem
                    key={action.value}
                    onSelect={() => handleThemeChange(action.value)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--glass-bg)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm">{action.title}</span>
                    {isActive && (
                      <span
                        className="ml-auto text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "var(--badge-bg)",
                          color: "var(--primary)",
                        }}
                      >
                        Active
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
