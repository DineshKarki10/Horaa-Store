import type { Metadata } from "next";
import { Inter, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "HORRA STORE — Gaming Gear & Custom PCs | Kathmandu, Nepal",
    template: "%s | HORRA STORE",
  },
  description:
    "Premium gaming hardware, custom PC builds, cables, headphones, splitters, and esports merchandise in Kathmandu, Nepal.",
  keywords: [
    "gaming PC Kathmandu",
    "buy gaming gear Nepal",
    "HORRA STORE",
    "custom PC builder Nepal",
    "gaming headphones Kathmandu",
    "audio splitter Nepal",
    "esports merchandise Nepal",
  ],
  openGraph: {
    title: "HORRA STORE — Gaming Gear & Custom PCs",
    description: "Premium gaming hardware and custom PC builds in Kathmandu, Nepal.",
    type: "website",
    locale: "en_NP",
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
      className={`${inter.variable} ${rajdhani.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
