import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { VisualEditsWrapper } from "@/components/layout/VisualEditsWrapper";
import { StructuredData } from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYSHA Transport | Logistics & Transportation UAE",
  description: "Leading transportation company in Dubai, UAE. Reliable logistics services across GCC since 2023. 105+ trucks, cross-border transport, heavy cargo specialists.",
  keywords: "transportation, logistics, Dubai, UAE, GCC, cargo, freight, shipping, trucks, cross-border, heavy cargo",
  authors: [{ name: "MYSHA Transport LLC" }],
  creator: "MYSHA Transport LLC",
  publisher: "MYSHA Transport LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mysha-transport.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MYSHA Transport | Logistics & Transportation UAE",
    description: "Leading transportation company in Dubai, UAE. Reliable logistics services across GCC since 2023.",
    url: "https://mysha-transport.vercel.app",
    siteName: "MYSHA Transport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/GALLERY/favicon_io (2)/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "MYSHA Transport Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MYSHA Transport | Logistics & Transportation UAE",
    description: "Leading transportation company in Dubai, UAE. Reliable logistics services across GCC since 2023.",
    images: ["/GALLERY/favicon_io (2)/apple-touch-icon.png"],
  },
  icons: {
    icon: [
      { url: "/GALLERY/favicon_io (2)/favicon.ico", sizes: "any" },
      { url: "/GALLERY/favicon_io (2)/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/GALLERY/favicon_io (2)/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/GALLERY/favicon_io (2)/favicon.ico",
    apple: [
      { url: "/GALLERY/favicon_io (2)/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/GALLERY/favicon_io (2)/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
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
