import { Trophy } from "@/components/icons";
import type { LeaderboardEntry } from "@/lib/api/types";

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardPodium({ entries }: LeaderboardPodiumProps) {
  // Ensure we fall back if some entries are missing
  const rank1 = entries.find(e => e.rank === 1) || entries[0] || { rank: 1, displayName: "-", referralCount: 0 };
  const rank2 = entries.find(e => e.rank === 2) || entries[1] || { rank: 2, displayName: "-", referralCount: 0 };
  const rank3 = entries.find(e => e.rank === 3) || entries[2] || { rank: 3, displayName: "-", referralCount: 0 };

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 items-end pt-4">
      {/* Rank 2 - Silver podium */}
      <div className="relative bg-[#080b18]/90 border border-brand-blue-light/20 rounded-2xl p-3 md:p-5 text-center flex flex-col items-center h-[180px] md:h-[220px] justify-between transition-all hover:translate-y-[-2px] duration-200">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black font-mono">
          2
        </div>
        <div className="mt-2">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-500 flex items-center justify-center font-bold text-slate-200 text-sm md:text-lg">
            {rank2.displayName.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xs md:text-sm text-slate-200 truncate max-w-[80px] md:max-w-none">
            {rank2.isCurrentUser ? "You" : rank2.displayName}
          </h3>
          <span className="text-[10px] md:text-xs text-slate-500 uppercase font-mono mt-0.5 block">
            {rank2.referralCount} invites
          </span>
        </div>
        <span className="hidden md:inline-block rounded-full bg-slate-900/60 border border-slate-800 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
          Wave 2 Early
        </span>
      </div>

      {/* Rank 1 - Champion podium (glowing neon orange/gold) */}
      <div className="relative bg-[#0e101d]/90 border border-[#FF8A00]/30 rounded-2xl p-3 md:p-6 text-center flex flex-col items-center h-[200px] md:h-[250px] justify-between animate-glow-orange transition-all hover:translate-y-[-4px] duration-200 z-10 scale-105">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-black font-mono border border-[#ff8a00]/40">
          👑
        </div>
        <div className="mt-2 relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] opacity-40 blur-sm animate-pulse" />
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#1c1106] border-2 border-[#FF8A00] flex items-center justify-center font-bold text-white text-base md:text-xl">
            {rank1.displayName.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-xs md:text-base text-white truncate max-w-[80px] md:max-w-none">
            {rank1.isCurrentUser ? "You" : rank1.displayName}
          </h3>
          <span className="text-xs md:text-sm text-[#FF8A00] uppercase font-mono font-bold mt-0.5 block">
            {rank1.referralCount} invites
          </span>
        </div>
        <span className="rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/45 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-[#FF8A00] uppercase">
          Founding Insider
        </span>
      </div>

      {/* Rank 3 - Bronze podium */}
      <div className="relative bg-[#080b18]/90 border border-pink-500/20 rounded-2xl p-3 md:p-5 text-center flex flex-col items-center h-[170px] md:h-[210px] justify-between transition-all hover:translate-y-[-2px] duration-200">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3c1d28] border border-pink-900/40 text-pink-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black font-mono">
          3
        </div>
        <div className="mt-2">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#FF007A]/10 to-slate-900 border-2 border-pink-500/40 flex items-center justify-center font-bold text-pink-300 text-sm md:text-lg">
            {rank3.displayName.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xs md:text-sm text-slate-200 truncate max-w-[80px] md:max-w-none">
            {rank3.isCurrentUser ? "You" : rank3.displayName}
          </h3>
          <span className="text-[10px] md:text-xs text-slate-500 uppercase font-mono mt-0.5 block">
            {rank3.referralCount} invites
          </span>
        </div>
        <span className="hidden md:inline-block rounded-full bg-slate-900/60 border border-slate-800 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
          Wave 3 Priority
        </span>
      </div>
    </div>
  );
}
