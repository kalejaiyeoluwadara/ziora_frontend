"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Instagram,
  XTwitter,
  ZioraLogo,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { JoinedSession } from "@/lib/api/types";
import { SOCIAL_LINKS } from "@/lib/waitlist/content";
import { readJoinedSession } from "@/lib/waitlist/session";
import { MilestoneProgress } from "./milestone-progress";
import { PositionReveal } from "./position-reveal";
import { ReferralShareCard } from "./referral-share-card";

export function JoinedContent() {
  const [session, setSession] = useState<JoinedSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSession(readJoinedSession());
    setLoaded(true);
  }, []);

  // Direct visit with no signup in this session
  if (loaded && !session) {
    return <EmptyState />;
  }

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Celebration gradient wash, top only */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[320px]"
        style={{
          background:
            "linear-gradient(165deg, #1450E5 0%, #1E5BFF 55%, #EEF3FF 100%)",
        }}
      />

      <header className="mx-auto w-full max-w-2xl px-5 pt-6 sm:px-8">
        <Link href="/" aria-label="Ziora home">
          <ZioraLogo className="h-7 text-white" />
        </Link>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8">
        <div className="rounded-2xl bg-bg-white p-6 shadow-xl shadow-brand-blue-dark/10 sm:p-8">
          {!loaded || !session ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-success/10 text-accent-success">
                  <CheckCircle className="h-8 w-8" />
                </span>
                <h1 className="mt-4 font-display text-2xl font-bold tracking-[-0.01em] text-text-primary">
                  You&apos;re on the list
                </h1>

                <div className="mt-6">
                  <PositionReveal
                    value={session.rank ?? session.position}
                    label={
                      session.rank
                        ? "your current rank for early access"
                        : "in line for early access"
                    }
                  />
                </div>

                <p className="mt-4 max-w-sm text-[15px] leading-6 text-text-secondary">
                  We&apos;ll email{" "}
                  <span className="font-medium text-text-primary">
                    {session.email}
                  </span>{" "}
                  when your wave opens.
                </p>
              </div>

              {/* Premium: referral mechanics */}
              <div className="mt-8 border-t border-black/5 pt-7">
                <ReferralShareCard code={session.referralCode} />
                <MilestoneProgress
                  referralCount={session.referralCount ?? 0}
                  className="mt-5"
                />
                <div className="mt-4 text-center">
                  <Link
                    href="/leaderboard"
                    className="text-sm font-medium text-brand-blue-light hover:text-brand-blue-dark"
                  >
                    See the leaderboard →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Follow CTAs */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/5 bg-bg-white px-5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-card sm:w-auto"
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/5 bg-bg-white px-5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-card sm:w-auto"
          >
            <XTwitter className="h-4 w-4" />
            Follow on X
          </a>
        </div>
      </div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-14 w-14 animate-pulse rounded-full bg-bg-card" />
      <div className="mt-4 h-7 w-48 animate-pulse rounded-lg bg-bg-card" />
      <div className="mt-6 h-16 w-40 animate-pulse rounded-lg bg-bg-card" />
      <div className="mt-4 h-5 w-64 animate-pulse rounded bg-bg-card" />
    </div>
  );
}

function EmptyState() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <ZioraLogo className="h-8 text-brand-blue" />
      <h1 className="mt-8 font-display text-2xl font-bold text-text-primary">
        Your spot is waiting
      </h1>
      <p className="mt-2 max-w-sm text-[15px] text-text-secondary">
        Join the Ziora waitlist to see your position and unlock early access.
      </p>
      <Button asChild size="lg" className="mt-6">
        <Link href="/">Get early access</Link>
      </Button>
    </main>
  );
}
