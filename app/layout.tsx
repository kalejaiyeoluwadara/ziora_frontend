import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziora — Shop verified sellers in Lagos | Join the waitlist",
  description:
    "Join the Ziora waitlist for early access to Nigeria's trusted multi-vendor marketplace. Secure Paystack payments. Verified vendors. Lagos-first delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text-primary bg-bg-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
