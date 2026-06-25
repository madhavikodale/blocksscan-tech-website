import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n/i18n-context";
import { ChatProvider } from "@/components/chat/chat-context";
import { ChatWidget } from "@/components/chat/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlocksScan Technology | Blockchain & Web3 Solutions",
  description: "Building secure, scalable, and future-ready blockchain solutions for startups and enterprises. Smart contracts, DApps, Web3 integration, and enterprise blockchain tools.",
  keywords: ["blockchain", "web3", "smart contracts", "dapp", "ethereum", "defi", "nft", "blockchain development"],
  authors: [{ name: "BlocksScan Technology" }],
  openGraph: {
    title: "BlocksScan Technology | Blockchain & Web3 Solutions",
    description: "Building secure, scalable, and future-ready blockchain solutions for startups and enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <ThemeProvider>
            <ChatProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ChatWidget />
            </ChatProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
