import type { Metadata } from "next";
import { FaqAccordion } from "@/components/waitlist/faq-accordion";
import { FinalCta } from "@/components/waitlist/final-cta";
import { HowItWorks } from "@/components/waitlist/how-it-works";
import { ReferralCapture } from "@/components/waitlist/referral-capture";
import { ScrollToTop } from "@/components/waitlist/scroll-to-top";
import { SiteFooter } from "@/components/waitlist/site-footer";
import { SocialProof } from "@/components/waitlist/social-proof";
import { StickyMobileCta } from "@/components/waitlist/sticky-mobile-cta";
import { VendorBenefits } from "@/components/waitlist/vendor-benefits";
import { VendorTrustBento } from "@/components/waitlist/vendor-trust-bento";
import { WaitlistHero } from "@/components/waitlist/waitlist-hero";
import { VENDOR_FAQ_ITEMS, VENDOR_HOW_IT_WORKS } from "@/lib/waitlist/content";

export const metadata: Metadata = {
  title: "Sell on Ziora — Vendor waitlist | Ziora",
  description:
    "Join the Ziora vendor waitlist for early access. Reach trust-first buyers, get secure Paystack payouts",
  openGraph: {
    title: "Sell on Ziora — Join the vendor waitlist",
    description:
      "Reach trust-first buyers. Secure payouts. No upfront fees. Join the vendor waitlist.",
  },
};

export default function VendorWaitlistPage() {
  return (
    <>
      <ReferralCapture />
      <main className="flex-1">
        <WaitlistHero audience="vendor" />
        <div id="hero-sentinel" aria-hidden="true" className="h-px w-full" />
        <VendorTrustBento />
        <HowItWorks
          steps={VENDOR_HOW_IT_WORKS}
          variant="vendor"
          subtitle="Reserve your spot, complete verification, and get ready to sell to trust-first buyers."
        />
        <VendorBenefits />
        <SocialProof />
        <FaqAccordion items={VENDOR_FAQ_ITEMS} />
        <FinalCta audience="vendor" />
      </main>
      <SiteFooter />
      <StickyMobileCta />
      <ScrollToTop />
    </>
  );
}
