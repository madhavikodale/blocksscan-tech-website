import { ContractScanner } from "@/components/blockchain/contract-scanner";

export default function ContractScannerPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Contract Scanner</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Scan smart contracts for vulnerabilities and security issues
          </p>
        </div>
        <ContractScanner />
      </div>
    </div>
  );
}
