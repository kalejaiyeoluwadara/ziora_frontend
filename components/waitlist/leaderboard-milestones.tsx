import { Check } from "@/components/icons";
import { milestones } from "./leaderboard-mock";

interface LeaderboardMilestonesProps {
  userCount: number;
}

export function LeaderboardMilestones({ userCount }: LeaderboardMilestonesProps) {
  return (
    <section className="mb-10 bg-[#0a0c1a]/95 border border-slate-900 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 mb-6">
        <span className="flex items-center justify-center w-5 h-5 rounded bg-brand-blue-light/10 border border-brand-blue-light/40 text-[10px] text-[#00F0FF] font-black font-mono">
          ⚡
        </span>
        Early Access Waves
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((m, idx) => {
          const completed = userCount >= m.referrals;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                completed
                  ? "bg-brand-blue-light/5 border-brand-blue-light/40"
                  : "bg-[#0b0e1b]/40 border-slate-900/60"
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    completed
                      ? "bg-brand-blue-light/20 text-[#00F0FF]"
                      : "bg-slate-900 text-slate-500"
                  }`}
                >
                  {m.referrals} {m.referrals === 1 ? "Invite" : "Invites"}
                </span>
                {completed && <Check className="h-3.5 w-3.5 text-emerald-400" />}
              </div>
              <h4
                className={`text-xs font-bold mt-2.5 ${
                  completed ? "text-white" : "text-slate-400"
                }`}
              >
                {m.label}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
