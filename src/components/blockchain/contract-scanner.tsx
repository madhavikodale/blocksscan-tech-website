"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bug,
  Lock,
  Unlock,
  Clock,
  AlertTriangle,
  FileCode,
  ChevronDown,
  ChevronUp,
  Scan,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Vulnerability {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  line: number;
  confidence: number;
  cwe: string;
}

interface ScanResult {
  address: string;
  contractName: string;
  compiler: string;
  securityScore: number;
  vulnerabilities: Vulnerability[];
  scannedAt: string;
}

const mockResults: Record<string, ScanResult> = {
  "0xE592...2E30": {
    address: "0xE592427f0fEf56b8730c9E5C7B5f3b3b3b3b3b3b",
    contractName: "UniswapV3Pool",
    compiler: "v0.8.19+commit.7dd6d404",
    securityScore: 87,
    scannedAt: "2024-06-23 15:12:33 UTC",
    vulnerabilities: [
      {
        id: "VULN-001",
        name: "Reentrancy Guard Missing",
        severity: "medium",
        description: "Function swap() does not implement reentrancy protection. Consider using OpenZeppelin's ReentrancyGuard.",
        line: 342,
        confidence: 78,
        cwe: "CWE-841",
      },
      {
        id: "VULN-002",
        name: "Unchecked External Call",
        severity: "low",
        description: "Return value of external call is not checked. This may lead to silent failures.",
        line: 128,
        confidence: 65,
        cwe: "CWE-252",
      },
    ],
  },
  "0xA0b8...6C2d": {
    address: "0xA0b8c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c",
    contractName: "FlashLoanVulnerable",
    compiler: "v0.6.12+commit.27d51765",
    securityScore: 34,
    scannedAt: "2024-06-23 14:58:01 UTC",
    vulnerabilities: [
      {
        id: "VULN-101",
        name: "Reentrancy Attack Vector",
        severity: "critical",
        description: "Critical reentrancy vulnerability in withdraw() function. External call is made before state update.",
        line: 89,
        confidence: 95,
        cwe: "CWE-841",
      },
      {
        id: "VULN-102",
        name: "Integer Overflow",
        severity: "high",
        description: "Arithmetic operations may overflow. Using Solidity ^0.8.0 would prevent this.",
        line: 45,
        confidence: 88,
        cwe: "CWE-190",
      },
      {
        id: "VULN-103",
        name: "Access Control Bypass",
        severity: "high",
        description: "Missing access control on sensitive function. Anyone can call admin functions.",
        line: 112,
        confidence: 92,
        cwe: "CWE-284",
      },
      {
        id: "VULN-104",
        name: "Timestamp Dependence",
        severity: "medium",
        description: "Contract uses block.timestamp for critical logic. Miners can manipulate timestamps.",
        line: 156,
        confidence: 72,
        cwe: "CWE-829",
      },
      {
        id: "VULN-105",
        name: "Unchecked External Call",
        severity: "medium",
        description: "Low-level call return value is not verified. May result in unexpected behavior.",
        line: 203,
        confidence: 70,
        cwe: "CWE-252",
      },
      {
        id: "VULN-106",
        name: "Missing Events",
        severity: "low",
        description: "State-changing functions do not emit events. Hard to track off-chain.",
        line: 67,
        confidence: 55,
        cwe: "CWE-778",
      },
    ],
  },
  "0xC0dE...F3a4": {
    address: "0xC0dEf3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    contractName: "SafeVault",
    compiler: "v0.8.23+commit.f704f362",
    securityScore: 96,
    scannedAt: "2024-06-23 15:45:12 UTC",
    vulnerabilities: [
      {
        id: "VULN-201",
        name: "Gas Optimization",
        severity: "info",
        description: "Consider using calldata instead of memory for read-only function parameters.",
        line: 34,
        confidence: 45,
        cwe: "N/A",
      },
    ],
  },
};

const severityConfig = {
  critical: { color: "#ef4444", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", icon: ShieldAlert },
  high: { color: "#f97316", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", icon: AlertTriangle },
  medium: { color: "#f59e0b", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: Bug },
  low: { color: "#3b82f6", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", icon: Bug },
  info: { color: "#10b981", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: ShieldCheck },
};

export function ContractScanner() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedVuln, setExpandedVuln] = useState<string | null>(null);

  const handleScan = () => {
    setLoading(true);
    setResult(null);
    setExpandedVuln(null);
    setTimeout(() => {
      const key = Object.keys(mockResults).find((k) =>
        address.toLowerCase().includes(k.toLowerCase().replace("...", ""))
      );
      setResult(key ? mockResults[key] : mockResults["0xA0b8...6C2d"]);
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10b981";
    if (score >= 70) return "#3b82f6";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const severityOrder = ["critical", "high", "medium", "low", "info"] as const;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Smart Contract Vulnerability Scanner
        </h2>
        <div className="flex gap-3">
          <Input
            placeholder="Enter contract address (e.g., 0xA0b8...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            className="flex-1"
            style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
          />
          <Button
            onClick={handleScan}
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
              <Scan className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          {Object.keys(mockResults).map((key) => (
            <button
              key={key}
              onClick={() => { setAddress(key); handleScan(); }}
              className="text-xs px-2 py-1 rounded-md border transition-colors hover:bg-[var(--glass-bg)]"
              style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-bg)" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={getScoreColor(result.securityScore)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${result.securityScore * 2.64} 264`}
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{ strokeDasharray: `${result.securityScore * 2.64} 264` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: getScoreColor(result.securityScore) }}>
                      {result.securityScore}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Score</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{result.contractName}</p>
                      <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{result.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Scanned: {result.scannedAt}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Compiler: {result.compiler}</span>
                  </div>
                  <Badge
                    className="text-sm px-3 py-1"
                    style={{
                      backgroundColor: `${getScoreColor(result.securityScore)}20`,
                      color: getScoreColor(result.securityScore),
                      borderColor: `${getScoreColor(result.securityScore)}30`,
                    }}
                  >
                    {getScoreLabel(result.securityScore)} Security Rating
                  </Badge>
                </div>
              </div>
            </div>

            {/* Vulnerability Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {severityOrder.map((sev) => {
                const count = result.vulnerabilities.filter((v) => v.severity === sev).length;
                const config = severityConfig[sev];
                return (
                  <motion.div
                    key={sev}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * severityOrder.indexOf(sev) }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    <config.icon className="w-5 h-5 mx-auto mb-2" style={{ color: config.color }} />
                    <p className="text-2xl font-bold" style={{ color: config.color }}>{count}</p>
                    <p className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>{sev}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Vulnerability List */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Vulnerability Findings
              </h3>
              <div className="space-y-3">
                {result.vulnerabilities.map((vuln, index) => {
                  const config = severityConfig[vuln.severity];
                  const isExpanded = expandedVuln === vuln.id;
                  return (
                    <motion.div
                      key={vuln.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${config.border}`}
                        style={{ backgroundColor: "var(--card-bg)", borderColor: `${config.color}30` }}
                        onClick={() => setExpandedVuln(isExpanded ? null : vuln.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <config.icon className="w-4 h-4" style={{ color: config.color }} />
                            <div>
                              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                {vuln.name}
                              </p>
                              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                                {vuln.id} · Line {vuln.line}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${config.bg} ${config.text} ${config.border}`}>
                              {vuln.severity.toUpperCase()}
                            </Badge>
                            {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: "var(--glass-border)" }}>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{vuln.description}</p>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>CWE: {vuln.cwe}</span>
                                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Confidence: {vuln.confidence}%</span>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Confidence</span>
                                    <span className="text-xs font-medium" style={{ color: config.color }}>{vuln.confidence}%</span>
                                  </div>
                                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--glass-bg)" }}>
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${vuln.confidence}%` }}
                                      transition={{ duration: 0.8 }}
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: config.color }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
