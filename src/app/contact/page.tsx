import { ContactSection } from "@/components/sections/contact";
import { FAQSection } from "@/components/sections/faq";

export const metadata = {
  title: "Contact | BlocksScan Technology",
  description: "Get in touch with BlocksScan Technology for blockchain development, consulting, and enterprise solutions.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-16">
      <div className="py-20 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Ready to start your blockchain journey? Contact us for a free consultation and let's discuss your project.
          </p>
        </div>
      </div>
      <ContactSection />
      <FAQSection />
    </div>
  );
}
