"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockAnalytics = {
  visitors: {
    total: 125420,
    change: 12.5,
    trend: "up",
    data: [4200, 3800, 5100, 4800, 6200, 5800, 7100],
  },
  pageViews: {
    total: 342890,
    change: 8.2,
    trend: "up",
    data: [12000, 11500, 14200, 13800, 16500, 15200, 18900],
  },
  avgSession: {
    total: "4m 32s",
    change: -2.1,
    trend: "down",
    data: [280, 295, 310, 290, 325, 340, 315],
  },
  bounceRate: {
    total: "42.3%",
    change: -5.4,
    trend: "up",
    data: [48, 46, 45, 44, 43, 42, 42.3],
  },
};

const topPages = [
  { path: "/", views: 45200, change: 15.2 },
  { path: "/services", views: 28100, change: 8.7 },
  { path: "/products", views: 22400, change: -3.2 },
  { path: "/contact", views: 18900, change: 22.1 },
  { path: "/about", views: 15600, change: 5.4 },
];

const trafficSources = [
  { source: "Organic Search", percentage: 45, color: "#3b82f6" },
  { source: "Direct", percentage: 25, color: "#8b5cf6" },
  { source: "Social Media", percentage: 15, color: "#06b6d4" },
  { source: "Referral", percentage: 10, color: "#10b981" },
  { source: "Email", percentage: 5, color: "#f59e0b" },
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const router = useRouter();

  const StatCard = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
  }: {
    title: string;
    value: string;
    change: number;
    trend: string;
    icon: React.ElementType;
  }) => (
    <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--badge-bg)" }}
          >
            <Icon className="w-5 h-5" style={{ color: "var(--primary)" }} />
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trend === "up" ? "text-emerald-500" : "text-red-500"
            }`}
            style={{
              backgroundColor:
                trend === "up"
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
            }}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          {value}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {title}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Analytics Dashboard
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Real-time insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  timeRange === range
                    ? "border-primary/50"
                    : "border-transparent hover:bg-white/5"
                }`}
                style={{
                  backgroundColor: timeRange === range ? "var(--badge-bg)" : "transparent",
                  color: timeRange === range ? "var(--primary)" : "var(--text-muted)",
                }}
              >
                {range === "24h" ? "Last 24h" : range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
            <button
              className="p-2 rounded-lg border transition-colors hover:bg-white/5"
              style={{ borderColor: "var(--glass-border)", color: "var(--text-muted)" }}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Visitors"
            value={mockAnalytics.visitors.total.toLocaleString()}
            change={mockAnalytics.visitors.change}
            trend={mockAnalytics.visitors.trend}
            icon={Users}
          />
          <StatCard
            title="Page Views"
            value={mockAnalytics.pageViews.total.toLocaleString()}
            change={mockAnalytics.pageViews.change}
            trend={mockAnalytics.pageViews.trend}
            icon={Activity}
          />
          <StatCard
            title="Avg. Session"
            value={mockAnalytics.avgSession.total}
            change={mockAnalytics.avgSession.change}
            trend={mockAnalytics.avgSession.trend}
            icon={Clock}
          />
          <StatCard
            title="Bounce Rate"
            value={mockAnalytics.bounceRate.total}
            change={mockAnalytics.bounceRate.change}
            trend={mockAnalytics.bounceRate.trend}
            icon={Globe}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Traffic Sources */}
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "var(--text-primary)" }}>
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--text-secondary)" }}>{source.source}</span>
                      <span style={{ color: "var(--text-primary)" }}>{source.percentage}%</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--glass-bg)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${source.percentage}%`,
                          backgroundColor: source.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "var(--text-primary)" }}>
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPages.map((page, index) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: "var(--glass-bg)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: "var(--badge-bg)",
                          color: "var(--primary)",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                        {page.path}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {page.views.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          page.change > 0 ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {page.change > 0 ? "+" : ""}
                        {page.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Activity */}
        <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: "var(--text-primary)" }}>
              Blockchain Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Transactions (24h)", value: "1.2M", change: "+8.5%", icon: Activity },
                { label: "Active Wallets", value: "452K", change: "+12.3%", icon: Users },
                { label: "Gas Spent (ETH)", value: "245.8", change: "-3.2%", icon: DollarSign },
                { label: "Smart Contracts", value: "89.2K", change: "+15.7%", icon: BarChart3 },
              ].map((stat) => {
                const Icon = stat.icon;
                const isPositive = stat.change.startsWith("+");
                return (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: "var(--glass-bg)",
                      borderColor: "var(--glass-border)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {stat.value}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
