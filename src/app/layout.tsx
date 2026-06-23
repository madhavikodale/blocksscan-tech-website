import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n/i18n-context";
import { ChatProvider } from "@/components/chat/chat-context";
import { ChatWidget } from "@/components/chat/chat-widget";
import { GlobalSearch } from "@/components/search/global-search";
import { NotificationProvider } from "@/components/notifications/notification-context";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { UserProfileMenu } from "@/components/user/user-profile-menu";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-primary)' }}>
        <I18nProvider>
          <NotificationProvider>
            <ThemeProvider>
              <ChatProvider>
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                  <GlobalSearch />
                  <NotificationCenter />
                  <UserProfileMenu />
                </div>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatWidget />
              </ChatProvider>
            </ThemeProvider>
          </NotificationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
