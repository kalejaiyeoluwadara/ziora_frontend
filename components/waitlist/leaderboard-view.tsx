"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trophy, ZioraLogo, ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useLeaderboard, useWaitlistStats } from "@/lib/api/hooks";
import { LeaderboardTable } from "./leaderboard-table";
import { LeaderboardPodium } from "./leaderboard-podium";
import { LeaderboardMilestones } from "./leaderboard-milestones";
import { readJoinedSession } from "@/lib/waitlist/session";
import type { JoinedSession, LeaderboardEntry } from "@/lib/api/types";
import {
  defaultMockEntries,
  weeklyMockEntries,
  getMockRank,
  getMockNameForRank,
} from "./leaderboard-mock";

export function LeaderboardView() {
  const { data, isLoading } = useLeaderboard(1, 10);
  const { data: statsData, isLoading: statsLoading } = useWaitlistStats();
  const [currentUser, setCurrentUser] = useState<JoinedSession | null>(null);
  const [activeTab, setActiveTab] = useState<"all-time" | "weekly">("all-time");

  useEffect(() => {
    setCurrentUser(readJoinedSession());
  }, []);

  const userCount = currentUser?.referralCount || 0;
  const userRank = currentUser?.rank || getMockRank(userCount);
  const userName = currentUser?.firstName ? `${currentUser.firstName} (You)` : "You";

  // Build the list based on selection and backend data availability
  const baseEntries = data?.entries && data.entries.length > 0
    ? data.entries
    : activeTab === "all-time" ? defaultMockEntries : weeklyMockEntries;

  // Insert user into top 10 if their rank qualified
  let resolvedEntries = [...baseEntries];
  const userInTop10 = resolvedEntries.some(
    (e) => e.displayName.toLowerCase().includes("you") || e.isCurrentUser
  );

  if (currentUser && !userInTop10 && userRank <= 10) {
    resolvedEntries[userRank - 1] = {
      rank: userRank,
      displayName: userName,
      referralCount: userCount,
      isCurrentUser: true,
    };
  }

  // Yu-kai Chou neighbourhood view: 2 above, user, 2 below
  const generateNeighbourhood = (): LeaderboardEntry[] => {
    if (!currentUser || userRank <= 10) return [];
    return [
      {
        rank: userRank - 2,
        displayName: getMockNameForRank(userRank - 2),
        referralCount: userCount + 2,
      },
      {
        rank: userRank - 1,
        displayName: getMockNameForRank(userRank - 1),
        referralCount: userCount + 1,
      },
      {
        rank: userRank,
        displayName: userName,
        referralCount: userCount,
        isCurrentUser: true,
      },
      {
        rank: userRank + 1,
        displayName: getMockNameForRank(userRank + 1),
        referralCount: Math.max(0, userCount - 1),
      },
      {
        rank: userRank + 2,
        displayName: getMockNameForRank(userRank + 2),
        referralCount: Math.max(0, userCount - 2),
      },
    ];
  };

  const podiumEntries = resolvedEntries.slice(0, 3);
  const tableEntries = resolvedEntries.slice(3);
  const neighbourhoodEntries = generateNeighbourhood();

  return (
    <main className="flex-1 bg-[#060814] text-slate-100 relative overflow-hidden min-h-screen py-6">
      {/* Self-contained CSS for high-end glowing animations */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(30, 91, 255, 0.2); }
          50% { border-color: rgba(30, 91, 255, 0.45); }
        }
        @keyframes glow-orange {
          0%, 100% { border-color: rgba(255, 107, 0, 0.3); }
          50% { border-color: rgba(255, 107, 0, 0.65); }
        }
        .animate-border-glow {
          animation: border-glow 4s infinite ease-in-out;
        }
        .animate-glow-orange {
          animation: glow-orange 4s infinite ease-in-out;
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E5BFF 1px, transparent 1px), linear-gradient(to bottom, #1E5BFF 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Cyber Scanline effect */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue-light/25 to-transparent pointer-events-none -z-10 opacity-30"
        style={{
          animation: "scanline 12s linear infinite",
        }}
      />

      {/* Ambient Neon Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue-light/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#FF007A]/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header navigation */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-900/80">
          <Link href="/" aria-label="Ziora home" className="group">
            <ZioraLogo className="h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-200 group-hover:scale-[1.02]" />
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full bg-emerald-400"
              style={{ animation: "pulse-dot 2s infinite" }}
            />
            <span className="text-[11px] font-mono tracking-widest text-emerald-400/90 uppercase font-semibold">
              Live updates
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center pt-10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-light/35 bg-brand-blue-light/10 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#00F0FF]">
            <Trophy className="h-4 w-4 text-[#FFC700]" />
            Waitlist leaderboard
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Early access goes to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light via-cyan-400 to-[#FF007A] font-black">
              top referrers first
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400 leading-relaxed">
            The more friends you invite, the higher you climb — and the sooner
            you get access when Ziora launches in Lagos.
          </p>
        </section>

        {/* Dashboard Tabs & Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Quick HUD metric 1 */}
          <div className="bg-[#0b0e1b]/80 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Total waiting
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-sans tracking-tight text-white">
                {statsLoading ? "…" : (statsData?.totalSubscribers ?? 0).toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-medium">
                +{statsLoading ? 0 : (statsData?.signupsToday ?? 0).toLocaleString()} today
              </span>
            </div>
          </div>

          {/* Quick HUD metric 2 */}
          <div className="bg-[#0b0e1b]/80 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Active Referrers
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-sans tracking-tight text-white">
                {statsLoading ? "…" : Math.max(1, Math.round((statsData?.totalSubscribers ?? 0) * 0.28)).toLocaleString()}
              </span>
              <span className="text-[11px] text-brand-blue-light font-mono font-medium">
                28% engagement
              </span>
            </div>
          </div>

          {/* Quick HUD metric 3 - Current User Rank */}
          {currentUser ? (
            <div className="bg-[#0b0e1b]/80 border border-brand-blue-light/30 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-brand-blue-light/10 rounded-full blur-xl" />
              <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider">
                Your Status
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">
                    #{userRank}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    {userCount} {userCount === 1 ? "invite" : "invites"}
                  </span>
                </div>
                <span className="rounded-full bg-brand-blue-light/10 border border-brand-blue-light/40 px-2 py-0.5 text-[10px] font-medium text-brand-blue-light">
                  {userCount >= 10 ? "Wave 1" : userCount >= 5 ? "Wave 2" : userCount >= 3 ? "Wave 3" : "Wave 4"}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#0b0e1b]/80 border border-dashed border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Your Position
              </span>
              <div className="mt-1">
                <Link
                  href="/"
                  className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 font-medium"
                >
                  Join the waitlist to climb <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Gamified Podium Showcase */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
              Top 3 Leaders
            </h2>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-0.5 flex gap-1">
              <button
                onClick={() => setActiveTab("all-time")}
                className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                  activeTab === "all-time"
                    ? "bg-brand-blue-light text-white font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                All-Time
              </button>
              <button
                onClick={() => setActiveTab("weekly")}
                className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                  activeTab === "weekly"
                    ? "bg-brand-blue-light text-white font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Weekly Sprint
              </button>
            </div>
          </div>

          <LeaderboardPodium entries={podiumEntries} />
        </section>

        {/* Leaderboard Table (Ranks 4-10) */}
        <section className="mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
              Challenger Rankings
            </h2>
            <span className="text-[10px] font-mono text-slate-500">
              Verified signups only
            </span>
          </div>

          {isLoading ? (
            <div className="bg-[#0b0e1b]/80 border border-slate-900/80 rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-6 w-8 bg-slate-800 rounded" />
                  <div className="h-6 w-32 bg-slate-800 rounded" />
                  <div className="h-6 w-12 bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <LeaderboardTable entries={tableEntries} highlightRank={currentUser ? userRank : undefined} />
          )}
        </section>

        {/* Neighborhood View HUD (If current user is logged in and not in Top 10) */}
        {currentUser && userRank > 10 && neighbourhoodEntries.length > 0 && (
          <section className="mb-10 p-[1px] bg-gradient-to-r from-brand-blue-light/30 via-cyan-400/20 to-brand-blue-light/35 rounded-2xl">
            <div className="bg-[#070914] rounded-2xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    Your Neighborhood
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    You are currently at Rank #{userRank}. Share your link to overtake!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    Invite code:
                  </span>
                  <span className="font-mono text-[11px] font-bold bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg text-cyan-400">
                    {currentUser.referralCode}
                  </span>
                </div>
              </div>

              {/* Neighborhood micro-table */}
              <div className="overflow-hidden rounded-xl border border-slate-900/70 bg-[#0a0c1a]">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {neighbourhoodEntries.map((entry) => {
                      const isMe = entry.isCurrentUser;
                      return (
                        <tr
                          key={entry.rank}
                          className={`border-b border-slate-900 last:border-0 transition-colors ${
                            isMe
                              ? "bg-brand-blue-light/10 text-[#00F0FF]"
                              : "hover:bg-slate-900/30"
                          }`}
                        >
                          <td className="px-4 py-3 text-xs font-bold font-mono">
                            #{entry.rank}
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold">
                            {entry.displayName}
                            {isMe && (
                              <span className="ml-1.5 rounded bg-cyan-400/10 border border-cyan-400/30 px-1 py-0.5 text-[9px] font-mono">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-xs font-bold font-mono">
                            {entry.referralCount}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Milestone Access Waves Guide */}
        <LeaderboardMilestones userCount={userCount} />

        {/* Back and CTA action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              {currentUser ? "Share Your Referral Link" : "Join the Waitlist"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 font-mono tracking-wider uppercase transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
