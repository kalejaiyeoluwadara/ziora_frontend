"use client";

import Link from "next/link";
import { Trophy, ZioraLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useLeaderboard } from "@/lib/api/hooks";
import { LeaderboardTable } from "./leaderboard-table";

export function LeaderboardView() {
  const { data, isLoading, isError } = useLeaderboard(1, 10);

  return (
    <main className="flex-1 bg-bg-section">
      {/* Hero strip */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(165deg, #1450E5 0%, #1E5BFF 60%, #0D3FC7 100%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-6 sm:px-8">
          <header>
            <Link href="/" aria-label="Ziora home">
              <ZioraLogo className="h-7 text-white" />
            </Link>
          </header>
          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm">
              <Trophy className="h-4 w-4" />
              Waitlist leaderboard
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Early access goes to top referrers first
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-white/85">
              The more friends you bring, the higher you climb — and the sooner
              you get in when Ziora launches.
            </p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="mx-auto -mt-8 max-w-3xl px-5 pb-20 sm:px-8">
        {isLoading ? (
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-bg-white">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-black/5 px-6 py-4 last:border-0"
              >
                <div className="h-8 w-8 animate-pulse rounded-full bg-bg-card" />
                <div className="h-4 flex-1 animate-pulse rounded bg-bg-card" />
                <div className="h-4 w-10 animate-pulse rounded bg-bg-card" />
              </div>
            ))}
          </div>
        ) : isError || !data || data.entries.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-bg-white p-10 text-center">
            <p className="font-display text-lg font-semibold text-text-primary">
              The race is just getting started
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[15px] text-text-secondary">
              Be the first to climb the leaderboard. Join the waitlist and start
              inviting friends.
            </p>
          </div>
        ) : (
          <>
            <LeaderboardTable entries={data.entries} />
            <p className="mt-3 text-center text-[13px] text-text-muted">
              Verified signups only · Updated every minute
            </p>
          </>
        )}

        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/">Join the waitlist</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
