"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Bell,
  Moon,
  Sun,
  Monitor,
  Globe,
  Wallet,
  Activity,
  History,
  Bookmark,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useI18n, availableLocales } from "@/components/i18n/i18n-context";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "user" | "admin" | "developer";
  walletAddress: string | null;
  joinedAt: string;
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
    newsletter: boolean;
  };
}

const defaultUser: UserProfile = {
  id: "user-1",
  name: "Alex Chen",
  email: "alex@blocksscan.tech",
  avatar: null,
  role: "developer",
  walletAddress: "0x7a3f...9e2d",
  joinedAt: "2024-01-15",
  preferences: {
    theme: "dark",
    language: "en",
    notifications: true,
    newsletter: true,
  },
};

export function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useI18n();

  useEffect(() => {
    const stored = localStorage.getItem("blocksscan-user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser((prev) => ({ ...prev, ...parsed }));
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  const saveUser = (data: UserProfile) => {
    setUser(data);
    localStorage.setItem("blocksscan-user", JSON.stringify(data));
  };

  const handleSave = () => {
    saveUser(formData);
    setEditMode(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-500/20 text-purple-400";
      case "developer": return "bg-blue-500/20 text-blue-400";
      default: return "bg-emerald-500/20 text-emerald-400";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-12 w-80 rounded-xl border shadow-2xl z-50 overflow-hidden animate-scale-in"
            style={{
              backgroundColor: "var(--page-bg-secondary)",
              borderColor: "var(--glass-border)",
            }}
          >
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: "var(--glass-border)" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {user.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {user.email}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${getRoleColor(user.role)}`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </span>
                </div>
              </div>
              {user.walletAddress && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--glass-bg)" }}>
                  <Wallet className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                    {user.walletAddress}
                  </span>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => { router.push("/profile"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <User className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Profile
              </button>
              <button
                onClick={() => { router.push("/dashboard"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <Activity className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Analytics Dashboard
              </button>
              <button
                onClick={() => { router.push("/bookmarks"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <Bookmark className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Saved Items
              </button>
              <button
                onClick={() => { router.push("/history"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <History className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Activity History
              </button>

              <div className="my-2 border-t" style={{ borderColor: "var(--glass-border)" }} />

              {/* Theme Toggle */}
              <div className="px-4 py-2">
                <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                  Theme
                </p>
                <div className="flex gap-2">
                  {[
                    { value: "light", icon: Sun, label: "Light" },
                    { value: "dim", icon: Monitor, label: "Dim" },
                    { value: "dark", icon: Moon, label: "Dark" },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = theme === t.value;
                    return (
                      <button
                        key={t.value}
                        onClick={() => setTheme(t.value as "light" | "dim" | "dark")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all border ${
                          isActive ? "border-primary/50" : "border-transparent hover:bg-white/5"
                        }`}
                        style={{
                          backgroundColor: isActive ? "var(--badge-bg)" : "transparent",
                          color: isActive ? "var(--primary)" : "var(--text-muted)",
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language */}
              <div className="px-4 py-2">
                <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                  Language
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {availableLocales.map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => setLocale(loc.value)}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                        locale === loc.value ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                      style={{
                        color: locale === loc.value ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      <span>{loc.flag}</span>
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-2 border-t" style={{ borderColor: "var(--glass-border)" }} />

              <button
                onClick={() => { router.push("/settings"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <Settings className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Settings
              </button>
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--error)" }}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
