import { HeroSection } from "@/components/sections/hero";
import { LiveStatsSection } from "@/components/sections/stats";
import { ServicesSection } from "@/components/sections/services";
import { ProductsSection } from "@/components/sections/products";
import { ProjectsSection } from "@/components/sections/projects";
import { TeamSection } from "@/components/sections/team";
import { AIChatSection } from "@/components/sections/ai-chat";
import { ContactSection } from "@/components/sections/contact";
import { BookDemoSection } from "@/components/sections/book-demo";
import { BlockchainToolsSection } from "@/components/sections/blockchain-tools";

export default function HomePage() {
  return (
    <div className="flex flex-col relative">
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <HeroSection />
      <div className="relative z-10">
        <LiveStatsSection />
      </div>
      <div className="relative z-10">
        <BlockchainToolsSection />
      </div>
      <div className="relative z-10">
        <ServicesSection />
      </div>
      <div className="relative z-10">
        <ProductsSection />
      </div>
      <div className="relative z-10">
        <ProjectsSection />
      </div>
      <div className="relative z-10">
        <TeamSection />
      </div>
      <div className="relative z-10">
        <AIChatSection />
      </div>
      <div className="relative z-10">
        <ContactSection />
      </div>
      <div className="relative z-10">
        <BookDemoSection />
      </div>
    </div>
  );
}
