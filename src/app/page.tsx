import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { ServicesSection } from "@/components/sections/services";
import { ProductsSection } from "@/components/sections/products";
import { FeaturesSection } from "@/components/sections/features";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { LiveBlockchainStats } from "@/components/stats/live-blockchain-stats";
import { NewsletterSubscription } from "@/components/newsletter/newsletter-subscription";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <LiveBlockchainStats />
      <ServicesSection />
      <FeaturesSection />
      <ProductsSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <NewsletterSubscription />
    </div>
  );
}
