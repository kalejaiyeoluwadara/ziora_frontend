import type { Metadata } from "next";
import { JoinedContent } from "@/components/waitlist/joined-content";

export const metadata: Metadata = {
  title: "You're on the list | Ziora",
  description:
    "You've joined the Ziora waitlist. Share your link to move up and unlock earlier access.",
  robots: { index: false, follow: false },
};

export default function JoinedPage() {
  return <JoinedContent />;
}
