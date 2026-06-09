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
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Signature deep-blue gradient — hero match */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#0B36B0]"
        style={{
          background:
            "linear-gradient(180deg, #0B36B0 0%, #1450E5 50%, #1E5BFF 100%)",
        }}
      />
      {/* Top-center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      {/* Soft dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <header className="mx-auto w-full max-w-2xl px-5 pt-8 sm:px-8 flex items-center justify-between">
        <Link href="/" aria-label="Ziora home">
          <ZioraLogo className="h-7 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
        </Link>
        <Link
          href="/leaderboard"
          className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold text-white/90 backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white"
        >
          Leaderboard
        </Link>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 flex flex-col justify-center">
        <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/[0.08] p-6 shadow-[0_24px_60px_rgba(8,28,92,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[32px] sm:p-8 supports-[backdrop-filter]:bg-white/[0.07]">
          {/* Ambient halo behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[40px] bg-white/[0.05] blur-2xl sm:-inset-6"
          />
          
          {/* Specular top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
          {/* Soft inner vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/[0.04]"
          />

          {!loaded || !session ? (
            <LoadingSkeleton />
          ) : (
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <span className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                  <CheckCircle className="h-9 w-9" />
                </div>
                
                <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] sm:text-4xl">
                  You&apos;re on the list
                </h1>

                <div className="mt-7 w-full">
                  <PositionReveal
                    value={session.rank ?? session.position}
                    label={
                      session.rank
                        ? "your current rank for early access"
                        : "in line for early access"
                    }
                  />
                </div>

                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/85">
                  We&apos;ll email{" "}
                  <span className="font-semibold text-white underline decoration-brand-blue-light decoration-2 underline-offset-4">
                    {session.email}
                  </span>{" "}
                  when your wave opens.
                </p>
              </div>

              {/* Premium: referral mechanics */}
              <div className="mt-8 border-t border-white/10 pt-7 space-y-6">
                <ReferralShareCard code={session.referralCode} />
                <MilestoneProgress
                  referralCount={session.referralCount ?? 0}
                  className="mt-5"
                />
                <div className="mt-5 text-center">
                  <Link
                    href="/leaderboard"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-wide uppercase text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                  >
                    <span>View Live Leaderboard</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Follow CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 active:scale-[0.98] sm:w-auto"
          >
            <Instagram className="h-5 w-5 text-white/80" />
            Follow on Instagram
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 active:scale-[0.98] sm:w-auto"
          >
            <XTwitter className="h-4 w-4 text-white/80" />
            Follow on X
          </a>
        </div>
      </div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="h-16 w-16 animate-pulse rounded-full bg-white/10" />
      <div className="mt-6 h-8 w-48 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-6 h-16 w-40 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-4 h-6 w-64 animate-pulse rounded bg-white/10" />
    </div>
  );
}

function EmptyState() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center overflow-hidden">
      {/* Signature deep-blue gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#0B36B0]"
        style={{
          background:
            "linear-gradient(180deg, #0B36B0 0%, #1450E5 40%, #1E5BFF 100%)",
        }}
      />
      {/* Top-center radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      {/* Soft dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/[0.08] p-8 shadow-[0_24px_60px_rgba(8,28,92,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl backdrop-saturate-150 max-w-md w-full">
        {/* Ambient halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[40px] bg-white/[0.05] blur-2xl sm:-inset-6"
        />
        <div className="relative flex justify-center">
          <ZioraLogo className="h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white relative">
          Your spot is waiting
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-white/80 relative">
          Join the Ziora waitlist to see your position and unlock early access.
        </p>
        <Button asChild size="lg" className="mt-6 w-full bg-white text-brand-blue hover:bg-white/90 active:scale-[0.98] transition-transform font-semibold">
          <Link href="/">Get early access</Link>
        </Button>
      </div>
    </main>
  );
}
