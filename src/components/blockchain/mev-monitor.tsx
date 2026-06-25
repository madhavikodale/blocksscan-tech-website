"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Bot,
  Clock,
  DollarSign,
  Sandwich,
  Droplets,
  ArrowRightLeft,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface MEVActivity {
  id: string;
  type: "sandwich" | "arbitrage" | "liquidation" | "frontrun";
  blockNumber: number;
  timestamp: string;
  extractedValue: number;
  extractedValueUSD: number;
  botAddress: string;
  botLabel: string;
  targetTx: string;
  description: string;
}

const botLabels: Record<string, string> = {
  "0x7a25...8f3e": "jaredfromsubway.eth",
  "0x3f8a...2c1d": "MEV Bot Alpha",
  "0x9c2b...7a4f": "Arbitrage King",
  "0x1d5e...6b3a": "Liquidator Pro",
  "0x4a7c...9e2b": "Flashbots Builder",
};

const mockActivities: MEVActivity[] = [
  {
    id: "mev-001",
    type: "sandwich",
    blockNumber: 20184567,
    timestamp: "2 min ago",
    extractedValue: 2.45,
    extractedValueUSD: 5890,
    botAddress: "0x7a25...8f3e",
    botLabel: "jaredfromsubway.eth",
    targetTx: "0xabc...def",
    description: "Sandwich attack on Uniswap V3 swap",
  },
  {
    id: "mev-002",
    type: "arbitrage",
    blockNumber: 20184566,
    timestamp: "3 min ago",
    extractedValue: 0.89,
    extractedValueUSD: 2140,
    botAddress: "0x3f8a...2c1d",
    botLabel: "MEV Bot Alpha",
    targetTx: "0x123...456",
    description: "DEX arbitrage between Uniswap and SushiSwap",
  },
  {
    id: "mev-003",
    type: "liquidation",
    blockNumber: 20184565,
    timestamp: "4 min ago",
    extractedValue: 5.12,
    extractedValueUSD: 12300,
    botAddress: "0x1d5e...6b3a",
    botLabel: "Liquidator Pro",
    targetTx: "0x789...012",
    description: "Aave v3 position liquidation",
  },
  {
    id: "mev-004",
    type: "frontrun",
    blockNumber: 20184564,
    timestamp: "5 min ago",
    extractedValue: 1.23,
    extractedValueUSD: 2960,
    botAddress: "0x4a7c...9e2b",
    botLabel: "Flashbots Builder",
    targetTx: "0x345...678",
    description: "Frontrun on NFT mint",
  },
  {
    id: "mev-005",
    type: "sandwich",
    blockNumber: 20184563,
    timestamp: "6 min ago",
    extractedValue: 3.67,
    extractedValueUSD: 8820,
    botAddress: "0x7a25...8f3e",
    botLabel: "jaredfromsubway.eth",
    targetTx: "0x901...234",
    description: "Sandwich attack on Curve swap",
  },
  {
    id: "mev-006",
    type: "arbitrage",
    blockNumber: 20184562,
    timestamp: "7 min ago",
    extractedValue: 0.34,
    extractedValueUSD: 820,
    botAddress: "0x9c2b...7a4f",
    botLabel: "Arbitrage King",
    targetTx: "0x567...890",
    description: "Stablecoin arbitrage USDC/USDT",
  },
];

const chartData = [
  { block: "20184550", sandwich: 12.5, arbitrage: 8.3, liquidation: 15.2, frontrun: 3.1 },
  { block: "20184555", sandwich: 15.8, arbitrage: 6.7, liquidation: 9.4, frontrun: 4.2 },
  { block: "20184560", sandwich: 9.3, arbitrage: 11.2, liquidation: 18.7, frontrun: 2.8 },
  { block: "20184565", sandwich: 18.4, arbitrage: 7.9, liquidation: 22.1, frontrun: 5.3 },
  { block: "20184570", sandwich: 14.2, arbitrage: 9.5, liquidation: 11.8, frontrun: 3.7 },
];

const botStats = [
  { name: "jaredfromsubway.eth", value: 45.2, color: "#ef4444" },
  { name: "MEV Bot Alpha", value: 23.8, color: "#3b82f6" },
  { name: "Arbitrage King", value: 18.4, color: "#8b5cf6" },
  { name: "Liquidator Pro", value: 12.6, color: "#f59e0b" },
];

const typeConfig = {
  sandwich: { icon: Sandwich, color: "#ef4444", label: "Sandwich" },
  arbitrage: { icon: ArrowRightLeft, color: "#3b82f6", label: "Arbitrage" },
  liquidation: { icon: Droplets, color: "#f59e0b", label: "Liquidation" },
  frontrun: { icon: Zap, color: "#8b5cf6", label: "Frontrun" },
};

export function MEVMonitor() {
  const [activities, setActivities] = useState<MEVActivity[]>(mockActivities);
  const [totalExtracted, setTotalExtracted] = useState(0);
  const [liveActivity, setLiveActivity] = useState<MEVActivity | null>(null);

  useEffect(() => {
    const total = activities.reduce((sum, a) => sum + a.extractedValueUSD, 0);
    setTotalExtracted(total);
  }, [activities]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["sandwich", "arbitrage", "liquidation", "frontrun"] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      const bots = Object.entries(botLabels);
      const [botAddr, botLabel] = bots[Math.floor(Math.random() * bots.length)];
      const newActivity: MEVActivity = {
        id: `mev-${Date.now()}`,
        type,
        blockNumber: 20184567 + Math.floor(Math.random() * 100),
        timestamp: "Just now",
        extractedValue: Math.random() * 5 + 0.5,
        extractedValueUSD: Math.floor(Math.random() * 10000 + 1000),
        botAddress: botAddr,
        botLabel,
        targetTx: `0x${Math.random().toString(16).slice(2, 8)}...`,
        description: `New ${type} detected`,
      };
      setLiveActivity(newActivity);
      setTimeout(() => {
        setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        setLiveActivity(null);
      }, 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Total Extracted (24h)</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            ${totalExtracted.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: "var(--success)" }}>+12.4% vs yesterday</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>MEV Events (24h)</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>1,247</p>
          <p className="text-xs" style={{ color: "var(--success)" }}>+8.2% vs yesterday</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4" style={{ color: "var(--warning)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Active Bots</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>42</p>
          <p className="text-xs" style={{ color: "var(--error)" }}>+3 new today</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4" style={{ color: "#ef4444" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Top Extracted</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>45.2 ETH</p>
          <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>jaredfromsubway.eth</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            MEV Value by Block
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis dataKey="block" tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                }}
              />
              <Area type="monotone" dataKey="sandwich" stackId="1" stroke="#ef4444" fill="#ef444420" />
              <Area type="monotone" dataKey="arbitrage" stackId="1" stroke="#3b82f6" fill="#3b82f620" />
              <Area type="monotone" dataKey="liquidation" stackId="1" stroke="#f59e0b" fill="#f59e0b20" />
              <Area type="monotone" dataKey="frontrun" stackId="1" stroke="#8b5cf6" fill="#8b5cf620" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Top MEV Bots
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={botStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {botStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Feed */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Live MEV Feed
          </h3>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Live</span>
          </div>
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {liveActivity && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg border border-dashed"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--accent)" }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 animate-pulse" style={{ color: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                    New {liveActivity.type} detected!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {activities.map((activity, index) => {
            const config = typeConfig[activity.type];
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--glass-bg)] transition-colors"
                style={{ backgroundColor: index % 2 === 0 ? "var(--card-bg)" : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    <config.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {config.label}
                      </span>
                      <Badge
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          backgroundColor: `${config.color}15`,
                          color: config.color,
                          borderColor: `${config.color}25`,
                        }}
                      >
                        Block {activity.blockNumber}
                      </Badge>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: config.color }}>
                    {activity.extractedValue} ETH
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    ${activity.extractedValueUSD.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                    {activity.botLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
