import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYSHA TRANSPORT | Premium Logistics & Transportation UAE & GCC",
  description: "Reliable Transportation & Logistics Solutions Across the UAE & GCC. Delivering safe, efficient, and technology-driven transportation services since 2014.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <Navbar />
        <main>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
