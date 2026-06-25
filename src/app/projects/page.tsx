import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";

export const metadata = {
  title: "Projects | BlocksScan Technology",
  description: "Explore our blockchain case studies and successful project implementations across DeFi, enterprise, and Web3.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real-world blockchain solutions that have delivered measurable impact for our clients across industries.
          </p>
        </div>
      </div>
      <ProjectsSection />
      <TestimonialsSection />
    </div>
  );
}
