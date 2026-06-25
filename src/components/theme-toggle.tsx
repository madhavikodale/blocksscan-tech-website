"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer border-0 bg-transparent" style={{ color: 'var(--text-secondary)' }}>
        {theme === "light" && <Sun className="w-4 h-4" />}
        {theme === "dim" && <Laptop className="w-4 h-4" />}
        {theme === "dark" && <Moon className="w-4 h-4" />}
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-[var(--glass-border)]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${theme === "light" ? "bg-[var(--glass-bg-hover)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
        >
          <Sun className="w-4 h-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dim")}
          className={`cursor-pointer ${theme === "dim" ? "bg-[var(--glass-bg-hover)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
        >
          <Laptop className="w-4 h-4 mr-2" />
          Dim
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${theme === "dark" ? "bg-[var(--glass-bg-hover)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
        >
          <Moon className="w-4 h-4 mr-2" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
