import { ProductsSection } from "@/components/sections/products";

export const metadata = {
  title: "Products | BlocksScan Technology",
  description: "Explore our blockchain products: block explorers, analytics dashboards, transaction monitoring, and enterprise tools.",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Production-ready blockchain infrastructure tools built for developers, enterprises, and the decentralized ecosystem.
          </p>
        </div>
      </div>
      <ProductsSection />
    </div>
  );
}
