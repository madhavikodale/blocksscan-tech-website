"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-16">
      <div
        className={`text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-8xl sm:text-9xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium text-white bg-gradient-primary hover:opacity-90 transition-opacity">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
