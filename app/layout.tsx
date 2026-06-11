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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ziora-frontend-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ziora — Shop verified sellers | Join the waitlist",
  description:
    "Join the Ziora waitlist for early access to Nigeria's trusted multi-vendor marketplace. Secure Paystack payments. Verified vendors.",
  openGraph: {
    title: "I'm on the Ziora waitlist",
    description: "Verified sellers. Secure checkout. Join early access.",
    url: siteUrl,
    siteName: "Ziora",
    images: [{ url: "/og/waitlist-og.png", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I'm on the Ziora waitlist",
    description: "Verified sellers. Secure checkout. Join early access.",
    images: ["/og/waitlist-og.png"],
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
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text-primary bg-bg-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
