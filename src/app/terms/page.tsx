export const metadata = {
  title: "Terms of Service | BlocksScan Technology",
  description: "Terms of service for BlocksScan Technology blockchain and Web3 solutions.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Last updated: June 20, 2026
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Agreement to Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              By accessing or using BlocksScan Technology's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Services</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              BlocksScan Technology provides blockchain development, smart contract auditing, DApp development, and consulting services. All services are subject to separate engagement agreements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. Intellectual Property</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              All code, designs, and deliverables created by BlocksScan Technology remain our intellectual property until full payment is received and rights are formally transferred per the engagement agreement. Open-source components remain under their respective licenses.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Limitation of Liability</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Blockchain technology involves inherent risks. While we employ best practices for security, we cannot guarantee that smart contracts or blockchain solutions will be completely free from vulnerabilities. Clients are responsible for obtaining independent audits for production deployments.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Contact</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              For questions about these Terms, please contact us at legal@blocksscan.tech or through our <a href="/contact" className="text-blue-400 hover:text-blue-300">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
