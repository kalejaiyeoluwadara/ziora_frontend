import type { Metadata } from "next";
import { LeaderboardView } from "@/components/waitlist/leaderboard-view";
import { SiteFooter } from "@/components/waitlist/site-footer";

export const metadata: Metadata = {
  title: "Waitlist leaderboard | Ziora",
  description:
    "See the top referrers on the Ziora waitlist. Climb the ranks to unlock earlier access.",
};

export default function LeaderboardPage() {
  return (
    <>
      <LeaderboardView />
      <SiteFooter />
    </>
  );
}
