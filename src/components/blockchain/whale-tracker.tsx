"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Link2,
  AlertTriangle,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WhaleWallet {
  id: string;
  address: string;
  label: string;
  entity: string;
  balance: number;
  balanceUSD: number;
  change24h: number;
  type: "exchange" | "fund" | "individual" | "contract";
  tags: string[];
  linkedWallets: string[];
  recentTxs: {
    type: "in" | "out";
    amount: number;
    token: string;
    timestamp: string;
    to: string;
  }[];
}

const mockWhales: WhaleWallet[] = [
  {
    id: "whale-001",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    label: "Coinbase Hot Wallet",
    entity: "Coinbase",
    balance: 245678.5,
    balanceUSD: 589000000,
    change24h: -2.3,
    type: "exchange",
    tags: ["CEX", "Hot Wallet", "Institutional"],
    linkedWallets: ["0x8ba1...4c2d", "0x3f5e...7d9a"],
    recentTxs: [
      { type: "out", amount: 5000, token: "ETH", timestamp: "5 min ago", to: "0x742d...8f3a" },
      { type: "in", amount: 12000, token: "ETH", timestamp: "32 min ago", to: "0x9c2b...7a4f" },
      { type: "out", amount: 2500, token: "ETH", timestamp: "1 hr ago", to: "0x1d5e...6b3a" },
    ],
  },
  {
    id: "whale-002",
    address: "0x3f5e7d9a1b2c4e6f8a0b1c2d3e4f5a6b7c8d9e0f",
    label: "Jump Trading",
    entity: "Jump Trading",
    balance: 189234.2,
    balanceUSD: 454000000,
    change24h: 5.7,
    type: "fund",
    tags: ["Market Maker", "Institutional", "High Frequency"],
    linkedWallets: ["0x7a25...8f3e", "0x4a7c...9e2b", "0xC0dE...F3a4"],
    recentTxs: [
      { type: "in", amount: 8000, token: "ETH", timestamp: "12 min ago", to: "0x3f8a...2c1d" },
      { type: "out", amount: 4500, token: "ETH", timestamp: "45 min ago", to: "0x9c2b...7a4f" },
    ],
  },
  {
    id: "whale-003",
    address: "0x8ba1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9",
    label: "Vitalik Buterin",
    entity: "Individual",
    balance: 325000.0,
    balanceUSD: 780000000,
    change24h: 0.1,
    type: "individual",
    tags: ["Founder", "Public Figure", "Long-term Holder"],
    linkedWallets: ["0xAb58...35fA", "0x1Db2...43Ed"],
    recentTxs: [
      { type: "out", amount: 100, token: "ETH", timestamp: "2 hrs ago", to: "0x742d...8f3a" },
      { type: "out", amount: 50, token: "ETH", timestamp: "1 day ago", to: "0x9c2b...7a4f" },
    ],
  },
  {
    id: "whale-004",
    address: "0x1d5e6b3a9c2f7e4d8b0a1c3f5e7d9a2b4c6d8e0f1",
    label: "Aave Treasury",
    entity: "Aave",
    balance: 156789.3,
    balanceUSD: 376000000,
    change24h: -0.8,
    type: "contract",
    tags: ["DeFi", "Treasury", "DAO"],
    linkedWallets: ["0xE592...2E30"],
    recentTxs: [
      { type: "in", amount: 3000, token: "ETH", timestamp: "18 min ago", to: "0x3f8a...2c1d" },
      { type: "out", amount: 1500, token: "ETH", timestamp: "3 hrs ago", to: "0x9c2b...7a4f" },
    ],
  },
  {
    id: "whale-005",
    address: "0x9c2b7a4f1d5e6b3a8c0d9e2f1a4b7c6d3e5f8a0b1",
    label: "Wintermute",
    entity: "Wintermute",
    balance: 98765.4,
    balanceUSD: 237000000,
    change24h: 3.2,
    type: "fund",
    tags: ["Market Maker", "OTC", "Institutional"],
    linkedWallets: ["0x2B8A...4C1D", "0x5E3F...7A9B"],
    recentTxs: [
      { type: "out", amount: 2000, token: "ETH", timestamp: "8 min ago", to: "0x742d...8f3a" },
      { type: "in", amount: 5000, token: "ETH", timestamp: "1 hr ago", to: "0x9c2b...7a4f" },
    ],
  },
];

const typeConfig = {
  exchange: { color: "#3b82f6", label: "Exchange" },
  fund: { color: "#8b5cf6", label: "Fund" },
  individual: { color: "#10b981", label: "Individual" },
  contract: { color: "#f59e0b", label: "Contract" },
};

export function WhaleTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWhale, setSelectedWhale] = useState<WhaleWallet | null>(null);
  const [alertThreshold, setAlertThreshold] = useState(1000);
  const [alertsEnabled, setAlertsEnabled] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const filteredWhales = mockWhales.filter(
    (w) =>
      w.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAlert = (id: string) => {
    setAlertsEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Whale Wallet Intelligence
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder="Search by address, label, or entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
          />
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
            <Bell className="w-4 h-4" style={{ color: "var(--warning)" }} />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Alert at</span>
            <Input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="w-20 h-7 text-sm"
              style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
            />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>ETH</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Tracked Whales</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{mockWhales.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Total Balance</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            ${(mockWhales.reduce((s, w) => s + w.balanceUSD, 0) / 1e9).toFixed(1)}B
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4" style={{ color: "var(--warning)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Active Alerts</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {Object.values(alertsEnabled).filter(Boolean).length}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4" style={{ color: "var(--success)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Clusters</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>12</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedWhale ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Whale Detail */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedWhale(null)} style={{ color: "var(--text-secondary)" }}>
                  ← Back to list
                </Button>
                <Button
                  size="sm"
                  onClick={() => toggleAlert(selectedWhale.id)}
                  className={alertsEnabled[selectedWhale.id] ? "bg-emerald-500/20 text-emerald-400" : ""}
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <Bell className="w-4 h-4 mr-1" />
                  {alertsEnabled[selectedWhale.id] ? "Alert On" : "Set Alert"}
                </Button>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${typeConfig[selectedWhale.type].color}20` }}>
                  <Wallet className="w-8 h-8" style={{ color: typeConfig[selectedWhale.type].color }} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{selectedWhale.label}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{selectedWhale.address}</span>
                      <button onClick={() => copyAddress(selectedWhale.address)} className="p-1 rounded hover:bg-[var(--glass-bg-hover)]">
                        {copied ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" style={{ color: "var(--text-muted)" }} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedWhale.tags.map((tag) => (
                      <Badge key={tag} className="text-xs" style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)", borderColor: "var(--badge-border)" }}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {selectedWhale.balance.toLocaleString()} ETH
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    ${(selectedWhale.balanceUSD / 1e6).toFixed(1)}M
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {selectedWhale.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs ${selectedWhale.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {selectedWhale.change24h > 0 ? "+" : ""}{selectedWhale.change24h}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linked Wallets */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Cluster Analysis (Linked Wallets)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedWhale.linkedWallets.map((wallet, i) => (
                  <motion.div
                    key={wallet}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >
                    <Link2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    <span className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>{wallet}</span>
                    <Badge className="text-[10px] ml-auto" style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}>
                      Linked
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {selectedWhale.recentTxs.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: i % 2 === 0 ? "var(--card-bg)" : "transparent" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: tx.type === "in" ? "#10b98120" : "#ef444420" }}
                      >
                        {tx.type === "in" ? (
                          <TrendingDown className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {tx.type === "in" ? "Received" : "Sent"} {tx.amount} {tx.token}
                        </p>
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>To: {tx.to}</p>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{tx.timestamp}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {filteredWhales.map((whale, index) => {
              const config = typeConfig[whale.type];
              return (
                <motion.div
                  key={whale.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 cursor-pointer hover:bg-[var(--glass-bg)] transition-all"
                  onClick={() => setSelectedWhale(whale)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <Wallet className="w-5 h-5" style={{ color: config.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{whale.label}</span>
                          <Badge className="text-[10px]" style={{ backgroundColor: `${config.color}15`, color: config.color, borderColor: `${config.color}25` }}>
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{whale.address.slice(0, 20)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {whale.balance.toLocaleString()} ETH
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        {whale.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        )}
                        <span className={`text-xs ${whale.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {whale.change24h > 0 ? "+" : ""}{whale.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
