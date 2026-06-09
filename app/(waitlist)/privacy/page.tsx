import type { Metadata } from "next";
import { LegalPage } from "@/components/waitlist/legal-page";
import { SOCIAL_LINKS } from "@/lib/waitlist/content";

export const metadata: Metadata = {
  title: "Privacy | Ziora Waitlist",
  description: "How Ziora handles your data on the waitlist.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Waitlist Privacy" updated="June 2026">
      <p>
        This notice explains how Ziora handles the information you share when you
        join our pre-launch waitlist. It covers the waitlist only — a full
        privacy policy will apply when the marketplace launches.
      </p>

      <Section title="What we collect">
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Your email address (required to reserve your spot).</li>
          <li>Your first name and whether you want to buy or sell (optional).</li>
          <li>
            Basic technical signals (such as how you found us) to protect against
            spam and measure interest.
          </li>
        </ul>
      </Section>

      <Section title="How we use it">
        <p>
          We use your information only to manage the waitlist and tell you when
          your early-access wave opens. If you share a referral link, we track
          successful signups so we can rank your position.
        </p>
      </Section>

      <Section title="What we never do">
        <p>
          We never sell your data, and we never send spam. You can leave the
          waitlist at any time using the unsubscribe link in any email we send.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about your data? Email us at{" "}
          <a
            href={`mailto:${SOCIAL_LINKS.contactEmail}`}
            className="font-medium text-brand-blue-light hover:text-brand-blue-dark"
          >
            {SOCIAL_LINKS.contactEmail}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-text-primary">
        {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
