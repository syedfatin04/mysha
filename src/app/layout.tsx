import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { VisualEditsWrapper } from "@/components/layout/VisualEditsWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYSHA TRANSPORT | Premium Logistics & Transportation UAE & GCC",
  description: "Reliable Transportation & Logistics Solutions Across the UAE & GCC. Delivering safe, efficient, and technology-driven transportation services since 2023.",
  icons: {
    icon: "/GALLERY/favicon_io (2)/favicon.ico",
    shortcut: "/GALLERY/favicon_io (2)/favicon.ico",
    apple: "/GALLERY/favicon_io (2)/apple-touch-icon.png",
  },
  manifest: "/GALLERY/favicon_io (2)/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden`}
      >
          <Navbar />
          <main>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <WhatsAppWidget />
          <Footer />
        <VisualEditsWrapper />
      </body>
    </html>
  );
}
