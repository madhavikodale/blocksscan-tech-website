"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Globe,
  Zap,
  Network,
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
} from "recharts";

interface BridgeInfo {
  id: string;
  name: string;
  icon: string;
  volume24h: number;
  volume7d: number;
  tvl: number;
  status: "active" | "warning" | "down";
  supportedChains: string[];
  anomaly?: {
    type: "spike" | "stuck" | "outage";
    description: string;
    severity: "low" | "medium" | "high";
  };
}

interface BridgeTx {
  id: string;
  bridge: string;
  fromChain: string;
  toChain: string;
  amount: number;
  token: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  duration: string;
}

const mockBridges: BridgeInfo[] = [
  {
    id: "wormhole",
    name: "Wormhole",
    icon: "🌪️",
    volume24h: 456000000,
    volume7d: 3120000000,
    tvl: 890000000,
    status: "active",
    supportedChains: ["Ethereum", "Solana", "BSC", "Avalanche", "Polygon"],
  },
  {
    id: "layerzero",
    name: "LayerZero",
    icon: "⬡",
    volume24h: 234000000,
    volume7d: 1650000000,
    tvl: 520000000,
    status: "active",
    supportedChains: ["Ethereum", "Arbitrum", "Optimism", "BSC", "Base"],
  },
  {
    id: "axelar",
    name: "Axelar",
    icon: "🔷",
    volume24h: 89000000,
    volume7d: 623000000,
    tvl: 210000000,
    status: "warning",
    supportedChains: ["Ethereum", "Cosmos", "Avalanche", "Polygon"],
    anomaly: {
      type: "spike",
      description: "Unusual 340% volume increase in last 2 hours",
      severity: "medium",
    },
  },
  {
    id: "across",
    name: "Across",
    icon: "⚡",
    volume24h: 156000000,
    volume7d: 1090000000,
    tvl: 340000000,
    status: "active",
    supportedChains: ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon"],
  },
  {
    id: "stargate",
    name: "Stargate",
    icon: "⭐",
    volume24h: 312000000,
    volume7d: 2180000000,
    tvl: 670000000,
    status: "active",
    supportedChains: ["Ethereum", "BSC", "Avalanche", "Polygon", "Arbitrum"],
  },
  {
    id: "synapse",
    name: "Synapse",
    icon: "🔗",
    volume24h: 45000000,
    volume7d: 312000000,
    tvl: 120000000,
    status: "down",
    supportedChains: ["Ethereum", "BSC", "Avalanche"],
    anomaly: {
      type: "outage",
      description: "Bridge paused due to security incident investigation",
      severity: "high",
    },
  },
];

const mockTransactions: BridgeTx[] = [
  {
    id: "tx-001",
    bridge: "Wormhole",
    fromChain: "Ethereum",
    toChain: "Solana",
    amount: 125000,
    token: "USDC",
    status: "completed",
    timestamp: "2 min ago",
    duration: "12 min",
  },
  {
    id: "tx-002",
    bridge: "LayerZero",
    fromChain: "Arbitrum",
    toChain: "Optimism",
    amount: 45000,
    token: "ETH",
    status: "pending",
    timestamp: "5 min ago",
    duration: "18 min",
  },
  {
    id: "tx-003",
    bridge: "Across",
    fromChain: "Ethereum",
    toChain: "Base",
    amount: 89000,
    token: "USDC",
    status: "completed",
    timestamp: "8 min ago",
    duration: "6 min",
  },
  {
    id: "tx-004",
    bridge: "Stargate",
    fromChain: "BSC",
    toChain: "Avalanche",
    amount: 230000,
    token: "USDT",
    status: "failed",
    timestamp: "12 min ago",
    duration: "45 min",
  },
  {
    id: "tx-005",
    bridge: "Axelar",
    fromChain: "Ethereum",
    toChain: "Cosmos",
    amount: 67000,
    token: "ATOM",
    status: "completed",
    timestamp: "15 min ago",
    duration: "22 min",
  },
];

const volumeChartData = [
  { time: "00:00", wormhole: 12, layerzero: 8, axelar: 3, across: 5, stargate: 9 },
  { time: "04:00", wormhole: 15, layerzero: 10, axelar: 4, across: 7, stargate: 11 },
  { time: "08:00", wormhole: 22, layerzero: 14, axelar: 5, across: 9, stargate: 16 },
  { time: "12:00", wormhole: 28, layerzero: 18, axelar: 7, across: 12, stargate: 20 },
  { time: "16:00", wormhole: 35, layerzero: 22, axelar: 45, across: 15, stargate: 25 },
  { time: "20:00", wormhole: 42, layerzero: 26, axelar: 12, across: 18, stargate: 30 },
  { time: "23:59", wormhole: 38, layerzero: 24, axelar: 10, across: 16, stargate: 28 },
];

const statusConfig = {
  active: { color: "#10b981", bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Active" },
  warning: { color: "#f59e0b", bg: "bg-amber-500/10", text: "text-amber-400", label: "Warning" },
  down: { color: "#ef4444", bg: "bg-red-500/10", text: "text-red-400", label: "Down" },
};

const txStatusConfig = {
  completed: { icon: CheckCircle, color: "#10b981" },
  pending: { icon: Clock, color: "#f59e0b" },
  failed: { icon: XCircle, color: "#ef4444" },
};

const anomalyConfig = {
  spike: { icon: TrendingUp, color: "#f59e0b" },
  stuck: { icon: Clock, color: "#3b82f6" },
  outage: { icon: AlertTriangle, color: "#ef4444" },
};

export function BridgeTracker() {
  const [selectedBridge, setSelectedBridge] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBridges = filterStatus === "all" ? mockBridges : mockBridges.filter((b) => b.status === filterStatus);

  const totalVolume24h = mockBridges.reduce((s, b) => s + b.volume24h, 0);
  const totalTVL = mockBridges.reduce((s, b) => s + b.tvl, 0);
  const activeBridges = mockBridges.filter((b) => b.status === "active").length;
  const anomalies = mockBridges.filter((b) => b.anomaly).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>24h Volume</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            ${(totalVolume24h / 1e9).toFixed(2)}B
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Total TVL</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            ${(totalTVL / 1e9).toFixed(2)}B
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4" style={{ color: "var(--success)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Active Bridges</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {activeBridges}/{mockBridges.length}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" style={{ color: "var(--warning)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Anomalies</span>
          </div>
          <p className="text-xl font-bold" style={{ color: anomalies > 0 ? "var(--error)" : "var(--success)" }}>
            {anomalies}
          </p>
        </motion.div>
      </div>

      {/* Volume Chart */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Cross-Chain Volume (24h)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={volumeChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
            <XAxis dataKey="time" tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "8px",
                color: "var(--text-primary)",
              }}
            />
            <Area type="monotone" dataKey="wormhole" stackId="1" stroke="#ef4444" fill="#ef444420" />
            <Area type="monotone" dataKey="layerzero" stackId="1" stroke="#3b82f6" fill="#3b82f620" />
            <Area type="monotone" dataKey="axelar" stackId="1" stroke="#f59e0b" fill="#f59e0b20" />
            <Area type="monotone" dataKey="across" stackId="1" stroke="#10b981" fill="#10b98120" />
            <Area type="monotone" dataKey="stargate" stackId="1" stroke="#8b5cf6" fill="#8b5cf620" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bridge Cards */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Bridge Status
          </h3>
          <div className="flex gap-2">
            {["all", "active", "warning", "down"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                  filterStatus === status ? "bg-[var(--glass-bg-hover)]" : "hover:bg-[var(--glass-bg)]"
                }`}
                style={{
                  borderColor: "var(--glass-border)",
                  color: filterStatus === status ? "var(--text-primary)" : "var(--text-muted)",
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBridges.map((bridge, index) => {
            const status = statusConfig[bridge.status];
            return (
              <motion.div
                key={bridge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl border cursor-pointer hover:bg-[var(--glass-bg)] transition-all"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: bridge.anomaly ? `${anomalyConfig[bridge.anomaly.type].color}30` : "var(--glass-border)",
                }}
                onClick={() => setSelectedBridge(selectedBridge === bridge.id ? null : bridge.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{bridge.icon}</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {bridge.name}
                    </span>
                  </div>
                  <Badge className={`${status.bg} ${status.text} text-[10px]`}>
                    {status.label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>24h Volume</span>
                    <span style={{ color: "var(--text-primary)" }}>
                      ${(bridge.volume24h / 1e6).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>TVL</span>
                    <span style={{ color: "var(--text-primary)" }}>
                      ${(bridge.tvl / 1e6).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {bridge.supportedChains.map((chain) => (
                      <span
                        key={chain}
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: "var(--glass-bg)", color: "var(--text-muted)" }}
                      >
                        {chain}
                      </span>
                    ))}
                  </div>
                </div>
                {bridge.anomaly && (
                  <div
                    className="mt-3 p-2 rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: `${anomalyConfig[bridge.anomaly.type].color}10` }}
                  >
                    <AlertTriangle className="w-3 h-3" style={{ color: anomalyConfig[bridge.anomaly.type].color }} />
                    <span className="text-xs" style={{ color: anomalyConfig[bridge.anomaly.type].color }}>
                      {bridge.anomaly.description}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Recent Cross-Chain Transactions
        </h3>
        <div className="space-y-3">
          {mockTransactions.map((tx, index) => {
            const status = txStatusConfig[tx.status];
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: index % 2 === 0 ? "var(--card-bg)" : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${status.color}20` }}
                  >
                    <status.icon className="w-4 h-4" style={{ color: status.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {tx.amount.toLocaleString()} {tx.token}
                      </span>
                      <Badge className="text-[10px]" style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}>
                        {tx.bridge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span>{tx.fromChain}</span>
                      <ArrowRightLeft className="w-3 h-3" />
                      <span>{tx.toChain}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tx.timestamp}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tx.duration}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
