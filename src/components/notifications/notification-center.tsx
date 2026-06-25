"use client";

import React, { useState } from "react";
import { useNotifications } from "./notification-context";
import {
  Bell,
  Check,
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const typeConfig = {
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-400/10" },
  success: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-400/10" },
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" },
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification, clearAll } =
    useNotifications();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg transition-colors hover:bg-[var(--glass-bg)]"
        style={{ color: "var(--text-secondary)" }}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[var(--text-primary)] text-xs flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-12 w-80 sm:w-96 rounded-xl border shadow-2xl z-50 overflow-hidden animate-scale-in"
            style={{
              backgroundColor: "var(--page-bg-secondary)",
              borderColor: "var(--glass-border)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "var(--glass-border)" }}
            >
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                Notifications
              </h3>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="p-1.5 rounded-lg transition-colors hover:bg-[var(--glass-bg)]"
                    style={{ color: "var(--text-muted)" }}
                    title="Mark all as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="p-1.5 rounded-lg transition-colors hover:bg-[var(--glass-bg)]"
                  style={{ color: "var(--text-muted)" }}
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-[var(--glass-bg)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    No notifications
                  </p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const config = typeConfig[notification.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`flex gap-3 px-4 py-3 border-b transition-colors cursor-pointer ${
                        notification.read ? "opacity-60" : "hover:bg-[var(--glass-bg)]"
                      }`}
                      style={{ borderColor: "var(--glass-border)" }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {notification.title}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            {typeof window !== "undefined"
                              ? formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })
                              : new Date(notification.timestamp).toLocaleDateString()}
                          </span>
                          {notification.link && (
                            <a
                              href={notification.link}
                              className="text-[10px] flex items-center gap-0.5"
                              style={{ color: "var(--primary)" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              View
                            </a>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                        className="p-1 rounded-lg transition-colors hover:bg-[var(--glass-bg)] flex-shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
