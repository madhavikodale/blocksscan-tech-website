"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Video,
  MapPin,
  Globe,
  User,
  Mail,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingForm {
  name: string;
  email: string;
  company: string;
  topic: string;
  notes: string;
}

const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "04:00 PM", available: true },
];

const topics = [
  "Smart Contract Audit",
  "Web3 Integration",
  "Blockchain Consulting",
  "Product Demo",
  "Custom Development",
  "Partnership Inquiry",
];

export function DemoBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    company: "",
    topic: "",
    notes: "",
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setSelectedTime(null);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !form.name || !form.email || !form.topic) return;

    // Store booking
    const bookings = JSON.parse(localStorage.getItem("blocksscan-bookings") || "[]");
    bookings.push({
      ...form,
      date: selectedDate.toISOString(),
      time: selectedTime,
      bookedAt: new Date().toISOString(),
    });
    localStorage.setItem("blocksscan-bookings", JSON.stringify(bookings));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--page-bg)" }}>
        <Card className="glass-card max-w-md w-full text-center" style={{ backgroundColor: "var(--card-bg)" }}>
          <CardContent className="p-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Booking Confirmed!
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Your demo is scheduled for{" "}
              <span className="font-semibold" style={{ color: "var(--primary)" }}>
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {selectedTime}
              </span>
            </p>
            <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
              A calendar invite has been sent to {form.email}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-primary text-white"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Book a{" "}<span className="text-gradient">Demo</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Schedule a personalized demo with our blockchain experts
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {["Select Date", "Choose Time", "Your Details"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > i + 1
                    ? "bg-emerald-500 text-white"
                    : step === i + 1
                    ? "bg-gradient-primary text-white"
                    : "border"
                }`}
                style={
                  step <= i + 1 && step !== i + 1
                    ? { borderColor: "var(--glass-border)", color: "var(--text-muted)" }
                    : {}
                }
              >
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm hidden sm:inline" style={{ color: step === i + 1 ? "var(--text-primary)" : "var(--text-muted)" }}>
                {s}
              </span>
              {i < 2 && <div className="w-8 h-px" style={{ backgroundColor: "var(--glass-border)" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Calendar className="w-5 h-5" style={{ color: "var(--primary)" }} />
                Select a Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                </button>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-white/5">
                  <ChevronRight className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-medium py-2" style={{ color: "var(--text-muted)" }}>
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((day, index) => {
                  if (!day) return <div key={`empty-${index}`} />;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isPast = date < new Date(today.setHours(0, 0, 0, 0));
                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && handleDateSelect(day)}
                      disabled={isPast}
                      className={`h-10 rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-gradient-primary text-white"
                          : isPast
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-white/5"
                      }`}
                      style={
                        !isSelected && !isPast
                          ? { color: "var(--text-primary)" }
                          : {}
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => selectedDate && setStep(2)}
                  disabled={!selectedDate}
                  className="bg-gradient-primary text-white"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Clock className="w-5 h-5" style={{ color: "var(--primary)" }} />
                Choose a Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedTime === slot.time
                        ? "border-primary/50"
                        : slot.available
                        ? "hover:bg-white/5"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                    style={{
                      backgroundColor: selectedTime === slot.time ? "var(--badge-bg)" : "var(--glass-bg)",
                      borderColor: selectedTime === slot.time ? "var(--primary)" : "var(--glass-border)",
                      color: slot.available ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => selectedTime && setStep(3)}
                  disabled={!selectedTime}
                  className="bg-gradient-primary text-white"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="glass-card" style={{ backgroundColor: "var(--card-bg)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: "var(--glass-bg)" }}>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedTime}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                    <User className="w-3 h-3 inline mr-1" /> Name *
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                    <Mail className="w-3 h-3 inline mr-1" /> Email *
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                  <Briefcase className="w-3 h-3 inline mr-1" /> Company
                </label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company name"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                  <MessageSquare className="w-3 h-3 inline mr-1" /> Topic *
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setForm({ ...form, topic })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        form.topic === topic ? "border-primary/50" : "hover:bg-white/5"
                      }`}
                      style={{
                        backgroundColor: form.topic === topic ? "var(--badge-bg)" : "var(--glass-bg)",
                        borderColor: form.topic === topic ? "var(--primary)" : "var(--glass-border)",
                        color: form.topic === topic ? "var(--primary)" : "var(--text-secondary)",
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any specific questions or requirements..."
                  rows={3}
                  className="w-full rounded-lg px-3 py-2 text-sm border"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.topic}
                  className="bg-gradient-primary text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
