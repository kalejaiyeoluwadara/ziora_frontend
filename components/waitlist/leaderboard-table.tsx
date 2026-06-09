import { Trophy } from "@/components/icons";
import type { LeaderboardEntry } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  highlightRank?: number;
  className?: string;
}

const TOP_BADGE: Record<number, { label: string; className: string }> = {
  1: {
    label: "Founding Insider",
    className: "bg-gradient-to-r from-accent-orange to-accent-deal text-white shadow-[0_0_10px_rgba(255,107,0,0.25)]",
  },
  2: {
    label: "Early Access",
    className: "bg-brand-blue-light text-white shadow-[0_0_10px_rgba(30,91,255,0.25)]",
  },
  3: {
    label: "Priority Member",
    className: "border border-brand-blue-light/30 bg-brand-blue-light/10 text-[#00F0FF]",
  },
};

export function LeaderboardTable({
  entries,
  highlightRank,
  className,
}: LeaderboardTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-900/80 bg-[#080b18]/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Top Ziora waitlist referrers</caption>
        <thead>
          <tr className="border-b border-slate-900 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500">
            <th scope="col" className="px-4 py-3.5 font-bold sm:px-6">
              Rank
            </th>
            <th scope="col" className="px-4 py-3.5 font-bold sm:px-6">
              Member
            </th>
            <th scope="col" className="px-4 py-3.5 text-right font-bold sm:px-6">
              Referrals
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const badge = TOP_BADGE[entry.rank];
            const highlighted =
              entry.isCurrentUser || entry.rank === highlightRank;
            return (
              <tr
                key={entry.rank}
                className={cn(
                  "border-b border-slate-900 last:border-0 transition-all duration-150",
                  highlighted
                    ? "bg-brand-blue-light/10 border-l-2 border-l-cyan-400"
                    : "hover:bg-slate-900/30",
                )}
              >
                <td className="px-4 py-3.5 sm:px-6">
                  <span
                    className={cn(
                      "inline-flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 text-xs font-bold font-mono tracking-tight",
                      entry.rank === 1
                        ? "bg-[#FF8A00] text-white shadow-[0_0_10px_rgba(255,138,0,0.3)]"
                        : entry.rank === 2
                        ? "bg-slate-300 text-slate-950"
                        : entry.rank === 3
                        ? "bg-[#cd7f32] text-white"
                        : "bg-slate-900/90 border border-slate-800 text-slate-400",
                    )}
                  >
                    {entry.rank}
                  </span>
                </td>
                <td className="px-4 py-3.5 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        highlighted ? "text-[#00F0FF] font-bold" : "text-slate-200",
                      )}
                    >
                      {entry.isCurrentUser ? "You" : entry.displayName}
                    </span>
                    {entry.isCurrentUser && (
                      <span className="rounded bg-cyan-400/10 border border-cyan-400/35 px-1 py-0.5 text-[9px] font-bold font-mono text-cyan-400">
                        YOU
                      </span>
                    )}
                    {entry.rank === 1 && (
                      <Trophy className="h-3.5 w-3.5 text-[#FF8A00]" />
                    )}
                    {badge && (
                      <span
                        className={cn(
                          "hidden rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:inline",
                          badge.className,
                        )}
                      >
                        {badge.label}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right sm:px-6">
                  <span
                    className={cn(
                      "font-bold font-mono tracking-tight text-xs",
                      highlighted ? "text-[#00F0FF]" : "text-slate-300",
                    )}
                  >
                    {entry.referralCount.toLocaleString()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
