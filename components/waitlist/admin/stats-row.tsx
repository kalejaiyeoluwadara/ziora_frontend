import { Award, Megaphone, Percent, Users } from "lucide-react";
import type { AdminMetrics } from "./utils";

interface AdminStatsRowProps {
  metrics: AdminMetrics;
}

export function AdminStatsRow({ metrics }: AdminStatsRowProps) {
  const cards = [
    {
      label: "Total Subscribers",
      value: metrics.totalSubs,
      sub: "Real-time sync",
      subClass: "text-emerald-400",
      icon: Users,
      iconClass: "text-brand-blue-light",
    },
    {
      label: "Total Referral Invites",
      value: metrics.totalInvites,
      sub: "Across all nodes",
      subClass: "text-slate-400",
      icon: Megaphone,
      iconClass: "text-[#FF8A00]",
    },
    {
      label: "Invite Share Rate",
      value: `${metrics.conversionRate}%`,
      sub: "Conversion factor",
      subClass: "text-[#FF007A]",
      icon: Percent,
      iconClass: "text-[#FF007A]",
    },
    {
      label: "Active / Verified Vendors",
      value: (
        <>
          {metrics.activeVendors}{" "}
          <span className="text-sm font-normal text-slate-600">
            / {metrics.verifiedVendors} verified
          </span>
        </>
      ),
      sub: "Manual audit active",
      subClass: "text-emerald-400",
      icon: Award,
      iconClass: "text-emerald-400",
    },
  ] as const;

  return (
    <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-950/60 p-5"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
              {card.label}
            </span>
            <card.icon className={`h-4 w-4 ${card.iconClass}`} />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              {card.value}
            </span>
            <span className={`mt-1 block font-mono text-xs ${card.subClass}`}>
              {card.sub}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
