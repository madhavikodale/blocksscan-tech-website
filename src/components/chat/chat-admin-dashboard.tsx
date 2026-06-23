"use client";

import React, { useState, useEffect } from "react";
import { useChat } from "./chat-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageCircle,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Filter,
  RefreshCw,
  MessageSquare,
  User,
  Shield,
  ChevronRight,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export function ChatAdminDashboard() {
  const {
    conversations,
    messages,
    currentConversation,
    agents,
    loadAllConversations,
    loadConversation,
    assignAgent,
    setPriority,
    closeConversation,
    isLoading,
  } = useChat();

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"conversations" | "agents" | "analytics">("conversations");

  useEffect(() => {
    loadAllConversations();
  }, [loadAllConversations]);

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      searchQuery === "" ||
      conv.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || conv.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: conversations.length,
    active: conversations.filter((c) => c.status === "active").length,
    waiting: conversations.filter((c) => c.status === "waiting").length,
    closed: conversations.filter((c) => c.status === "closed").length,
    urgent: conversations.filter((c) => c.priority === "urgent").length,
    high: conversations.filter((c) => c.priority === "high").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
      case "waiting":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "closed":
        return "bg-slate-500/20 text-slate-500 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-500 border-slate-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-slate-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "high":
        return <ArrowUpCircle className="w-4 h-4 text-orange-500" />;
      case "low":
        return <ArrowDownCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Chat Admin Dashboard
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Manage conversations and monitor support activity
            </p>
          </div>
          <Button
            onClick={() => loadAllConversations()}
            variant="outline"
            className="gap-2"
            style={{
              borderColor: "var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Conversations",
              value: stats.total,
              icon: MessageSquare,
              color: "var(--primary)",
            },
            {
              label: "Active Now",
              value: stats.active,
              icon: Activity,
              color: "var(--success)",
            },
            {
              label: "Waiting",
              value: stats.waiting,
              icon: Clock,
              color: "var(--warning)",
            },
            {
              label: "Urgent Priority",
              value: stats.urgent,
              icon: AlertCircle,
              color: "var(--error)",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="glass-card"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {stat.label}
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["conversations", "agents", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === tab ? "var(--primary)" : "var(--glass-bg)",
                color: activeTab === tab ? "white" : "var(--text-secondary)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Conversations Tab */}
        {activeTab === "conversations" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm border"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="waiting">Waiting</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm border"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Conversations Table */}
            <Card
              className="glass-card overflow-hidden"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: "var(--glass-border)" }}>
                      <TableHead style={{ color: "var(--text-muted)" }}>User</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Status</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Priority</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Last Message</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Time</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Agent</TableHead>
                      <TableHead style={{ color: "var(--text-muted)" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConversations.map((conv) => (
                      <TableRow
                        key={conv.id}
                        className="cursor-pointer hover:bg-white/5 transition-colors"
                        style={{ borderColor: "var(--glass-border)" }}
                        onClick={() => {
                          setSelectedConversation(conv.id);
                          loadConversation(conv.id);
                        }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: "var(--badge-bg)" }}
                            >
                              <User className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                            </div>
                            <div>
                              <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                                {conv.user_name || "Anonymous"}
                              </p>
                              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                {conv.user_email || "No email"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(conv.status)}`}
                          >
                            {conv.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getPriorityIcon(conv.priority)}
                            <span className={`text-xs font-medium capitalize ${getPriorityColor(conv.priority)}`}>
                              {conv.priority}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm truncate max-w-[200px]" style={{ color: "var(--text-secondary)" }}>
                            {conv.last_message || "No messages"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {conv.last_message_at
                              ? formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })
                              : "—"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {conv.assigned_agent ? (
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3" style={{ color: "var(--success)" }} />
                              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                Assigned
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                              Unassigned
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                assignAgent(conv.id, agents[0]?.id || "");
                              }}
                            >
                              <Users className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPriority(conv.id, "urgent");
                              }}
                            >
                              <AlertCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                closeConversation(conv.id);
                              }}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === "agents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className="glass-card"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--badge-bg)" }}
                    >
                      <Shield className="w-6 h-6" style={{ color: "var(--primary)" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        {agent.name}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {agent.email}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            agent.status === "online"
                              ? "bg-emerald-500"
                              : agent.status === "away"
                              ? "bg-amber-500"
                              : "bg-slate-500"
                          }`}
                        />
                        <span className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>
                          {agent.status}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {agent.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "var(--text-primary)" }}>
                  Priority Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["urgent", "high", "medium", "low"].map((priority) => {
                    const count = conversations.filter((c) => c.priority === priority).length;
                    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={priority} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize" style={{ color: "var(--text-secondary)" }}>
                            {priority}
                          </span>
                          <span style={{ color: "var(--text-primary)" }}>
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--glass-bg)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor:
                                priority === "urgent"
                                  ? "var(--error)"
                                  : priority === "high"
                                  ? "var(--warning)"
                                  : priority === "medium"
                                  ? "var(--primary)"
                                  : "var(--success)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "var(--text-primary)" }}>
                  Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["active", "waiting", "closed"].map((status) => {
                    const count = conversations.filter((c) => c.status === status).length;
                    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize" style={{ color: "var(--text-secondary)" }}>
                            {status}
                          </span>
                          <span style={{ color: "var(--text-primary)" }}>
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--glass-bg)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor:
                                status === "active"
                                  ? "var(--success)"
                                  : status === "waiting"
                                  ? "var(--warning)"
                                  : "var(--text-muted)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
