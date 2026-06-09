import type { Metadata } from "next";
import { LegalPage } from "@/components/waitlist/legal-page";

export const metadata: Metadata = {
  title: "Terms | Ziora Waitlist",
  description: "Terms for participating in the Ziora waitlist.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Waitlist Terms" updated="June 2026">
      <p>
        By joining the Ziora waitlist you agree to these lightweight terms. They
        apply to the pre-launch waitlist only.
      </p>

      <Section title="The waitlist">
        <p>
          Joining the waitlist reserves your place in line for early access. It
          is not a purchase, a guarantee of access on a specific date, or a
          contract to buy or sell anything.
        </p>
      </Section>

      <Section title="Referrals & ranking">
        <p>
          You may share your referral link to climb the waitlist. Referral credit
          only counts for genuine signups. We may remove credit or entries that
          come from fake, duplicate, or abusive signups to keep the leaderboard
          fair.
        </p>
      </Section>

      <Section title="Early access waves">
        <p>
          Access is granted in waves. Your wave depends on when you joined and how
          many friends you referred. We may adjust wave timing and rewards before
          launch.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms or the waitlist mechanics as we get closer to
          launch. Continued participation means you accept any updates.
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
