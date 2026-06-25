"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ticket,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  messages: { sender: string; content: string; timestamp: string }[];
}

const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Smart Contract Audit Request",
    description: "Need security audit for our DeFi protocol before mainnet launch.",
    status: "in_progress",
    priority: "high",
    category: "Security",
    createdAt: "2024-06-20T10:00:00Z",
    updatedAt: "2024-06-21T14:30:00Z",
    messages: [
      { sender: "user", content: "Please prioritize the reentrancy checks.", timestamp: "2024-06-21T14:30:00Z" },
    ],
  },
  {
    id: "TKT-002",
    title: "Web3 Integration Support",
    description: "Having issues connecting wallet on mobile browsers.",
    status: "open",
    priority: "medium",
    category: "Integration",
    createdAt: "2024-06-22T08:15:00Z",
    updatedAt: "2024-06-22T08:15:00Z",
    messages: [],
  },
  {
    id: "TKT-003",
    title: "API Rate Limiting Question",
    description: "What are the rate limits for the BlocksScan API?",
    status: "resolved",
    priority: "low",
    category: "API",
    createdAt: "2024-06-18T16:45:00Z",
    updatedAt: "2024-06-19T09:20:00Z",
    messages: [
      { sender: "agent", content: "Rate limits: 1000 req/min for free tier, 10000 req/min for pro.", timestamp: "2024-06-19T09:20:00Z" },
    ],
  },
];

const statusConfig = {
  open: { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/10", label: "Open" },
  in_progress: { icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", label: "In Progress" },
  resolved: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Resolved" },
  closed: { icon: XCircle, color: "text-[var(--text-secondary)]", bg: "bg-slate-400/10", label: "Closed" },
};

const priorityConfig = {
  low: { color: "text-blue-400", label: "Low" },
  medium: { color: "text-yellow-400", label: "Medium" },
  high: { color: "text-orange-400", label: "High" },
  urgent: { color: "text-red-400", label: "Urgent" },
};

export function SupportTicketSystem() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium" as Ticket["priority"],
    category: "General",
  });
  const [submitting, setSubmitting] = useState(false);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter = filter === "all" || ticket.status === filter;
    const matchesSearch =
      search === "" ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description) return;

    setSubmitting(true);
    setTimeout(() => {
      const ticket: Ticket = {
        id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
        ...newTicket,
        status: "open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: "", description: "", priority: "medium", category: "General" });
      setShowCreate(false);
      setSubmitting(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            messages: [
              ...t.messages,
              { sender: "user", content: newMessage, timestamp: new Date().toISOString() },
            ],
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    setTickets(updated);
    setSelectedTicket({
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        { sender: "user", content: newMessage, timestamp: new Date().toISOString() },
      ],
    });
    setNewMessage("");
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Support Tickets
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Manage your support requests and track their status
            </p>
          </div>
          <Button
            onClick={() => setShowCreate(true)}
            className="bg-gradient-primary hover:opacity-90 text-[var(--text-primary)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["all", "open", "in_progress", "resolved"].map((status) => {
            const count = status === "all" ? tickets.length : tickets.filter((t) => t.status === status).length;
            const config = statusConfig[status as keyof typeof statusConfig];
            const Icon = config?.icon || Ticket;
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  filter === status ? "border-primary/50" : ""
                }`}
                style={{
                  backgroundColor: filter === status ? "var(--badge-bg)" : "var(--card-bg)",
                  borderColor: filter === status ? "var(--primary)" : "var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <span className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>
                    {config?.label || "All Tickets"}
                  </span>
                </div>
                <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {count}
                </p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        {/* Ticket List */}
        {!selectedTicket ? (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => {
              const status = statusConfig[ticket.status];
              const StatusIcon = status.icon;
              const priority = priorityConfig[ticket.priority];

              return (
                <Card
                  key={ticket.id}
                  className="glass-card cursor-pointer hover:border-primary/30 transition-all"
                  style={{ backgroundColor: "var(--card-bg)" }}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                            {ticket.id}
                          </span>
                          <span className={`text-xs font-medium ${priority.color}`}>
                            {priority.label}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                          {ticket.title}
                        </h3>
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {ticket.category}
                          </span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {new Date(ticket.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <Ticket className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                <p style={{ color: "var(--text-muted)" }}>No tickets found</p>
              </div>
            )}
          </div>
        ) : (
          /* Ticket Detail */
          <div className="space-y-4">
            <button
              onClick={() => setSelectedTicket(null)}
              className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              ← Back to tickets
            </button>

            <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      {selectedTicket.id}
                    </span>
                    <CardTitle className="text-lg mt-1" style={{ color: "var(--text-primary)" }}>
                      {selectedTicket.title}
                    </CardTitle>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${statusConfig[selectedTicket.status].bg} ${statusConfig[selectedTicket.status].color}`}>
                    {React.createElement(statusConfig[selectedTicket.status].icon, { className: "w-3 h-3" })}
                    {statusConfig[selectedTicket.status].label}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p style={{ color: "var(--text-secondary)" }}>{selectedTicket.description}</p>

                {/* Messages */}
                <div className="space-y-3 border-t pt-4" style={{ borderColor: "var(--glass-border)" }}>
                  <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    Conversation
                  </h4>
                  {selectedTicket.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        msg.sender === "user" ? "ml-4" : "mr-4"
                      }`}
                      style={{
                        backgroundColor: msg.sender === "user" ? "var(--primary)" : "var(--glass-bg)",
                        color: msg.sender === "user" ? "white" : "var(--text-primary)",
                      }}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-[10px] opacity-70 mt-1 block">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  {selectedTicket.messages.length === 0 && (
                    <p className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>
                      No messages yet. Start the conversation below.
                    </p>
                  )}
                </div>

                {/* Reply */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                  <Button onClick={handleSendMessage} className="bg-gradient-primary text-[var(--text-primary)]">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Ticket Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreate(false)} />
            <Card className="relative w-full max-w-lg glass-card" style={{ backgroundColor: "var(--page-bg-secondary)" }}>
              <CardHeader>
                <CardTitle style={{ color: "var(--text-primary)" }}>Create New Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                    Title
                  </label>
                  <Input
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    placeholder="Brief description of the issue"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                    Description
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Detailed description..."
                    rows={4}
                    className="w-full rounded-lg px-3 py-2 text-sm border"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                      Priority
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as Ticket["priority"] })}
                      className="w-full rounded-lg px-3 py-2 text-sm border"
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                      Category
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 text-sm border"
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="General">General</option>
                      <option value="Security">Security</option>
                      <option value="Integration">Integration</option>
                      <option value="API">API</option>
                      <option value="Billing">Billing</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowCreate(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTicket}
                    disabled={submitting || !newTicket.title || !newTicket.description}
                    className="bg-gradient-primary text-[var(--text-primary)]"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Ticket"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
