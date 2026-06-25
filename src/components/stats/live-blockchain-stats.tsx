"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Blocks,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Wallet,
  FileCode,
  Shield,
  Cpu,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlockchainStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}

const mockStats: BlockchainStat[] = [
  {
    label: "Total Transactions (24h)",
    value: "1.24M",
    change: "+8.5%",
    trend: "up",
    icon: Activity,
    color: "#3b82f6",
  },
  {
    label: "Active Wallets",
    value: "452.3K",
    change: "+12.3%",
    trend: "up",
    icon: Wallet,
    color: "#8b5cf6",
  },
  {
    label: "Gas Price (Gwei)",
    value: "24.5",
    change: "-5.2%",
    trend: "down",
    icon: Zap,
    color: "#06b6d4",
  },
  {
    label: "Smart Contracts",
    value: "89.2K",
    change: "+15.7%",
    trend: "up",
    icon: FileCode,
    color: "#10b981",
  },
  {
    label: "Network Hashrate",
    value: "892.4 TH/s",
    change: "+3.1%",
    trend: "up",
    icon: Cpu,
    color: "#f59e0b",
  },
  {
    label: "Security Score",
    value: "98.7%",
    change: "+0.3%",
    trend: "up",
    icon: Shield,
    color: "#ec4899",
  },
];

const recentBlocks = [
  { number: 18429301, hash: "0x7a3f...9e2d", txs: 142, time: "2.4s ago", size: "45.2 KB" },
  { number: 18429300, hash: "0x8b2e...1c4a", txs: 98, time: "14.8s ago", size: "32.1 KB" },
  { number: 18429299, hash: "0x9c1d...3b5e", txs: 203, time: "27.2s ago", size: "67.8 KB" },
  { number: 18429298, hash: "0x1a4f...7d8c", txs: 76, time: "39.5s ago", size: "28.4 KB" },
  { number: 18429297, hash: "0x2b5e...6a9f", txs: 156, time: "52.1s ago", size: "51.3 KB" },
];

const networkHealth = [
  { label: "Node Uptime", value: 99.98, color: "#10b981" },
  { label: "Block Propagation", value: 98.5, color: "#3b82f6" },
  { label: "Peer Connectivity", value: 97.2, color: "#8b5cf6" },
  { label: "Sync Status", value: 100, color: "#06b6d4" },
];

export function LiveBlockchainStats() {
  const [stats, setStats] = useState(mockStats);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);

  const refreshStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.value.includes("M")
            ? `${(parseFloat(stat.value) + (Math.random() - 0.5) * 0.1).toFixed(2)}M`
            : stat.value.includes("K")
            ? `${(parseFloat(stat.value) + (Math.random() - 0.5) * 10).toFixed(1)}K`
            : stat.value,
        }))
      );
      setLastUpdate(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{
              backgroundColor: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
            }}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Live Network Data
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Blockchain <span className="text-gradient">Network Stats</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Real-time metrics from the BlocksScan network monitoring infrastructure
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Last updated: {mounted && lastUpdate ? lastUpdate : "--:--:--"}
            </span>
            <button
              onClick={refreshStats}
              className={`p-1.5 rounded-lg transition-colors hover:bg-[var(--glass-bg)] ${isRefreshing ? "animate-spin" : ""}`}
              style={{ color: "var(--text-muted)" }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="glass-card"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                      }`}
                      style={{
                        backgroundColor:
                          stat.trend === "up"
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                      }}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Blocks */}
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                <Blocks className="w-5 h-5" style={{ color: "var(--primary)" }} />
                Recent Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBlocks.map((block) => (
                  <div
                    key={block.number}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: "var(--glass-bg)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "var(--badge-bg)" }}
                      >
                        <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>
                          B
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          #{block.number.toLocaleString()}
                        </p>
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                          {block.hash}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {block.txs} txs
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {block.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Network Health */}
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                <Shield className="w-5 h-5" style={{ color: "var(--primary)" }} />
                Network Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkHealth.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--text-secondary)" }}>
                        {item.label}
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {item.value}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--glass-bg)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      Network Status
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      All systems operational • 24 nodes active
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-500">
                      Healthy
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
