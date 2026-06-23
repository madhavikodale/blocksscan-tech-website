import { AboutSection } from "@/components/sections/about";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats";

export const metadata = {
  title: "About Us | BlocksScan Technology",
  description: "Learn about BlocksScan Technology's mission, vision, and the team behind our blockchain solutions.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="text-gradient">BlocksScan</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We're a team of blockchain enthusiasts, engineers, and visionaries committed to building the decentralized future.
          </p>
        </div>
      </div>
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}
