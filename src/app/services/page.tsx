import { ServicesSection } from "@/components/sections/services";
import { FAQSection } from "@/components/sections/faq";

export const metadata = {
  title: "Services | BlocksScan Technology",
  description: "Comprehensive blockchain services including development, smart contracts, DApps, Web3 integration, and consulting.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            End-to-end blockchain solutions tailored to your business needs, from ideation to deployment and beyond.
          </p>
        </div>
      </div>
      <ServicesSection />
      <FAQSection />
    </div>
  );
}
