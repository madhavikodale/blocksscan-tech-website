import { BridgeTracker } from "@/components/blockchain/bridge-tracker";

export default function BridgeTrackerPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Bridge Tracker</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Monitor cross-chain bridges and detect anomalies
          </p>
        </div>
        <BridgeTracker />
      </div>
    </div>
  );
}
