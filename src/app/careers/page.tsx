import { CareersSection } from "@/components/sections/careers";

export const metadata = {
  title: "Careers | BlocksScan Technology",
  description: "Join BlocksScan Technology. Open positions in blockchain development, security, and engineering. Remote-first culture.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Join Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Build the future of blockchain with a passionate, remote-first team. Competitive compensation, equity, and growth opportunities.
          </p>
        </div>
      </div>
      <CareersSection />
    </div>
  );
}
