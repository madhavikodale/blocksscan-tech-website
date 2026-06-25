import { MEVMonitor } from "@/components/blockchain/mev-monitor";

export default function MEVMonitorPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">MEV Monitor</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Real-time MEV activity monitoring and analysis
          </p>
        </div>
        <MEVMonitor />
      </div>
    </div>
  );
}
