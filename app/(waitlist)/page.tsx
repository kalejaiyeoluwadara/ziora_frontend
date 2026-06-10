import { BuyerBenefits } from "@/components/waitlist/buyer-benefits";
import { FaqAccordion } from "@/components/waitlist/faq-accordion";
import { FinalCta } from "@/components/waitlist/final-cta";
import { HowItWorks } from "@/components/waitlist/how-it-works";
import { ReferralCapture } from "@/components/waitlist/referral-capture";
import { SiteFooter } from "@/components/waitlist/site-footer";
import { SocialProof } from "@/components/waitlist/social-proof";
import { StickyMobileCta } from "@/components/waitlist/sticky-mobile-cta";
import { TrustBento } from "@/components/waitlist/trust-bento";
import { WaitlistHero } from "@/components/waitlist/waitlist-hero";
import { ScrollToTop } from "@/components/waitlist/scroll-to-top";

export default function WaitlistLandingPage() {
  return (
    <>
      <ReferralCapture />
      <main className="flex-1">
        <WaitlistHero />
        {/* Sentinel: sticky mobile CTA appears once this scrolls out of view */}
        <div id="hero-sentinel" aria-hidden="true" className="h-px w-full" />
        <TrustBento />
        <HowItWorks />
        <BuyerBenefits />
        <SocialProof />
        <FaqAccordion />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyMobileCta />
      <ScrollToTop />
    </>
  );
}
