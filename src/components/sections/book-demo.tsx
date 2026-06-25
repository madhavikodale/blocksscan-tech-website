"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function BookDemoSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
    }
  };

  const [dates, setDates] = useState<{value: string; label: string}[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      return {
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      };
    });
    setDates(generated);
  }, []);

  return (
    <section id="book-demo" className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-4">
            Schedule a Call
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Book a{" "}
            <span className="text-gradient">Demo</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            See how BlocksScan can power your blockchain infrastructure. 
            30-minute personalized walkthrough.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl glass-card p-8"
        >
          {isBooked ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Demo Booked!
              </h3>
              <p className="text-[var(--text-secondary)] mb-2">
                Your demo is scheduled for {selectedDate} at {selectedTime}.
              </p>
              <p className="text-[var(--text-muted)] text-sm">
                A calendar invite has been sent to your email.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[var(--text-primary)]" />
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold">Personalized Demo</h3>
                  <p className="text-sm text-[var(--text-secondary)]">30 minutes with our solutions team</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 rounded-xl text-center text-sm transition-all ${
                        selectedDate === date.value
                          ? "bg-gradient-primary text-[var(--text-primary)] border-0"
                          : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <div className="text-xs uppercase mb-1">
                        {date.label.split(" ")[0]}
                      </div>
                      <div className="font-semibold">
                        {date.label.split(" ")[2]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-8">
                <label className="block text-sm text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Select Time (PST)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        selectedTime === time
                          ? "bg-gradient-primary text-[var(--text-primary)] border-0"
                          : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleBook}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-primary hover:opacity-90 text-[var(--text-primary)] border-0 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
