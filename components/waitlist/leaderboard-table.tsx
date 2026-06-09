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
    className: "bg-gradient-to-r from-accent-orange to-accent-deal text-white",
  },
  2: {
    label: "Early Access",
    className: "bg-brand-blue-light text-white",
  },
  3: {
    label: "Priority Member",
    className: "border border-brand-blue-light/30 bg-bg-card text-brand-blue-dark",
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
        "overflow-hidden rounded-2xl border border-black/5 bg-bg-white",
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Top Ziora waitlist referrers</caption>
        <thead>
          <tr className="border-b border-black/5 text-[12px] uppercase tracking-[0.08em] text-text-muted">
            <th scope="col" className="px-4 py-3 font-medium sm:px-6">
              Rank
            </th>
            <th scope="col" className="px-4 py-3 font-medium sm:px-6">
              Member
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">
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
                  "border-b border-black/5 last:border-0 transition-colors",
                  highlighted ? "bg-bg-card" : "hover:bg-bg-section/60",
                )}
              >
                <td className="px-4 py-3.5 sm:px-6">
                  <span
                    className={cn(
                      "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-bold tabular-nums",
                      entry.rank <= 3
                        ? "bg-brand-blue text-white"
                        : "bg-bg-section text-text-secondary",
                    )}
                  >
                    {entry.rank}
                  </span>
                </td>
                <td className="px-4 py-3.5 sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">
                      {entry.isCurrentUser ? "You" : entry.displayName}
                    </span>
                    {entry.rank === 1 && (
                      <Trophy className="h-4 w-4 text-accent-orange" />
                    )}
                    {badge && (
                      <span
                        className={cn(
                          "hidden rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline",
                          badge.className,
                        )}
                      >
                        {badge.label}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right sm:px-6">
                  <span className="font-semibold tabular-nums text-text-primary">
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
