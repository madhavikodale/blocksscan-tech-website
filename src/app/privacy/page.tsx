export const metadata = {
  title: "Privacy Policy | BlocksScan Technology",
  description: "Privacy policy for BlocksScan Technology blockchain and Web3 services.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Last updated: June 20, 2026
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Introduction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              BlocksScan Technology ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blockchain development services, websites, and related technologies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Information We Collect</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
              <li>Personal data (name, email, company) provided voluntarily</li>
              <li>Blockchain wallet addresses for project integration</li>
              <li>Usage data and analytics from our platforms</li>
              <li>Technical data (IP address, browser type, device info)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. How We Use Your Information</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We use the information we collect to provide and improve our services, communicate with you about projects, ensure security of blockchain solutions, and comply with legal obligations. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Data Security</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We implement industry-standard security measures including encryption, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Contact Us</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at privacy@blocksscan.tech or through our <a href="/contact" className="text-blue-400 hover:text-blue-300">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
