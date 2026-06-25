"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Wallet,
  FileCode,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TransactionNode {
  id: string;
  label: string;
  type: "wallet" | "contract" | "exchange" | "mixer";
  address: string;
  amount?: string;
}

interface TransactionFlow {
  hash: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  gasUsed: string;
  gasPrice: string;
  value: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  nodes: TransactionNode[];
  edges: { from: number; to: number; label: string }[];
}

const mockFlows: Record<string, TransactionFlow> = {
  "0x7a8b...c9d2": {
    hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9",
    status: "success",
    timestamp: "2024-06-23 14:32:18 UTC",
    gasUsed: "45,231",
    gasPrice: "12.5 Gwei",
    value: "150.5 ETH",
    riskScore: 25,
    riskLevel: "low",
    nodes: [
      { id: "0", label: "Sender", type: "wallet", address: "0x742d...8f3a", amount: "150.5 ETH" },
      { id: "1", label: "Uniswap V3", type: "contract", address: "0xE592...2E30", amount: "150.5 ETH" },
      { id: "2", label: "Receiver", type: "wallet", address: "0x8ba1...4c2d", amount: "149.8 ETH" },
    ],
    edges: [
      { from: 0, to: 1, label: "150.5 ETH" },
      { from: 1, to: 2, label: "149.8 ETH" },
    ],
  },
  "0x9f2e...b1a3": {
    hash: "0x9f2e1d3c4b5a60798f7e6d5c4b3a2019f8e7d6c5b4a39281706f5e4d3c2b1a09",
    status: "success",
    timestamp: "2024-06-23 13:45:22 UTC",
    gasUsed: "128,456",
    gasPrice: "18.2 Gwei",
    value: "2,450.0 ETH",
    riskScore: 78,
    riskLevel: "high",
    nodes: [
      { id: "0", label: "Unknown Wallet", type: "wallet", address: "0x1a2b...3c4d", amount: "2,450 ETH" },
      { id: "1", label: "Tornado.Cash", type: "mixer", address: "0x9100...bA2b", amount: "2,450 ETH" },
      { id: "2", label: "Binance Hot", type: "exchange", address: "0x3f5e...7d9a", amount: "2,445 ETH" },
      { id: "3", label: "Recipient", type: "wallet", address: "0x9c8d...7e6f", amount: "2,440 ETH" },
    ],
    edges: [
      { from: 0, to: 1, label: "2,450 ETH" },
      { from: 1, to: 2, label: "2,445 ETH" },
      { from: 2, to: 3, label: "2,440 ETH" },
    ],
  },
  "0x3c4d...e5f6": {
    hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    status: "pending",
    timestamp: "2024-06-23 14:58:01 UTC",
    gasUsed: "23,104",
    gasPrice: "9.8 Gwei",
    value: "12.3 ETH",
    riskScore: 45,
    riskLevel: "medium",
    nodes: [
      { id: "0", label: "EOA Wallet", type: "wallet", address: "0xabcd...ef01", amount: "12.3 ETH" },
      { id: "1", label: "Aave V3", type: "contract", address: "0x8787...B2F3", amount: "12.3 ETH" },
    ],
    edges: [
      { from: 0, to: 1, label: "12.3 ETH" },
    ],
  },
};

const nodeColors: Record<string, string> = {
  wallet: "#3b82f6",
  contract: "#8b5cf6",
  exchange: "#10b981",
  mixer: "#ef4444",
};

const nodeIcons: Record<string, React.ReactNode> = {
  wallet: <Wallet className="w-4 h-4" />,
  contract: <FileCode className="w-4 h-4" />,
  exchange: <Activity className="w-4 h-4" />,
  mixer: <AlertTriangle className="w-4 h-4" />,
};

export function TransactionTracer() {
  const [txHash, setTxHash] = useState("");
  const [flow, setFlow] = useState<TransactionFlow | null>(null);
  const [loading, setLoading] = useState(false);
  const [animatedNodes, setAnimatedNodes] = useState<number[]>([]);

  const handleSearch = () => {
    setLoading(true);
    setFlow(null);
    setAnimatedNodes([]);
    setTimeout(() => {
      const key = Object.keys(mockFlows).find((k) =>
        txHash.toLowerCase().includes(k.toLowerCase().replace("...", ""))
      );
      setFlow(key ? mockFlows[key] : mockFlows["0x7a8b...c9d2"]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (flow) {
      flow.nodes.forEach((_, i) => {
        setTimeout(() => {
          setAnimatedNodes((prev) => [...prev, i]);
        }, i * 400);
      });
    }
  }, [flow]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "pending": return <Clock className="w-4 h-4 text-amber-400" />;
      case "failed": return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Transaction Tracer
        </h2>
        <div className="flex gap-3">
          <Input
            placeholder="Enter transaction hash (e.g., 0x7a8b...)"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
            style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gradient-primary hover:opacity-90 text-[var(--text-primary)] border-0"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          {Object.keys(mockFlows).map((key) => (
            <button
              key={key}
              onClick={() => { setTxHash(key); handleSearch(); }}
              className="text-xs px-2 py-1 rounded-md border transition-colors hover:bg-[var(--glass-bg)]"
              style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {flow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Transaction Details */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  Transaction Details
                </h3>
                <Badge className={getRiskColor(flow.riskLevel)}>
                  <Shield className="w-3 h-3 mr-1" />
                  Risk: {flow.riskLevel.toUpperCase()} ({flow.riskScore}/100)
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: "var(--text-muted)" }}>
                    {getStatusIcon(flow.status)}
                    <span className="text-xs">Status</span>
                  </div>
                  <p className="text-sm font-medium capitalize" style={{ color: "var(--text-primary)" }}>
                    {flow.status}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: "var(--text-muted)" }}>
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">Timestamp</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {flow.timestamp}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: "var(--text-muted)" }}>
                    <Fuel className="w-3 h-3" />
                    <span className="text-xs">Gas</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {flow.gasUsed} @ {flow.gasPrice}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: "var(--text-muted)" }}>
                    <Wallet className="w-3 h-3" />
                    <span className="text-xs">Value</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {flow.value}
                  </p>
                </div>
              </div>
              <div className="mt-3 p-2 rounded-lg text-xs font-mono" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-secondary)" }}>
                {flow.hash}
              </div>
            </div>

            {/* Flow Visualization */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
                Transaction Flow
              </h3>
              <div className="flex items-center justify-center overflow-x-auto py-4">
                <div className="flex items-center gap-4 md:gap-8">
                  {flow.nodes.map((node, index) => (
                    <div key={node.id} className="flex items-center gap-4 md:gap-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={animatedNodes.includes(index) ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative"
                      >
                        <div
                          className="w-32 md:w-40 p-4 rounded-xl border-2 flex flex-col items-center gap-2"
                          style={{
                            backgroundColor: "var(--card-bg)",
                            borderColor: nodeColors[node.type],
                            boxShadow: `0 0 20px ${nodeColors[node.type]}20`,
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${nodeColors[node.type]}20`, color: nodeColors[node.type] }}
                          >
                            {nodeIcons[node.type]}
                          </div>
                          <span className="text-xs font-medium text-center" style={{ color: "var(--text-primary)" }}>
                            {node.label}
                          </span>
                          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                            {node.address}
                          </span>
                          {node.amount && (
                            <span className="text-xs font-semibold" style={{ color: nodeColors[node.type] }}>
                              {node.amount}
                            </span>
                          )}
                          {node.type === "mixer" && (
                            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                              <AlertTriangle className="w-2 h-2 mr-1" />
                              High Risk
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                      {index < flow.edges.length && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={animatedNodes.includes(index + 1) ? { opacity: 1, width: "auto" } : {}}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <ArrowRight className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                          <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: "var(--accent)" }}>
                            {flow.edges[index].label}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Risk Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>Transaction Amount</span>
                  </div>
                  <Badge className={flow.value.includes(",") || parseFloat(flow.value) > 100 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}>
                    {flow.value.includes(",") || parseFloat(flow.value) > 100 ? "High" : "Normal"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-3">
                    <FileCode className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>Contract Interaction</span>
                  </div>
                  <Badge className={flow.nodes.some((n) => n.type === "contract") ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}>
                    {flow.nodes.some((n) => n.type === "contract") ? "Verified" : "None"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>Mixer/Tornado Detection</span>
                  </div>
                  <Badge className={flow.nodes.some((n) => n.type === "mixer") ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}>
                    {flow.nodes.some((n) => n.type === "mixer") ? "Detected" : "Clean"}
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Overall Risk Score</span>
                  <span className="text-sm font-semibold" style={{ color: flow.riskScore > 60 ? "#ef4444" : flow.riskScore > 30 ? "#f59e0b" : "#10b981" }}>
                    {flow.riskScore}/100
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--card-bg)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${flow.riskScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: flow.riskScore > 60 ? "#ef4444" : flow.riskScore > 30 ? "#f59e0b" : "#10b981",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
