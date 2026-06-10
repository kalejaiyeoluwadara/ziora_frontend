import type { AdminTab } from "./types";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export function AdminPageHeader({ activeTab, onTabChange }: AdminPageHeaderProps) {
  return (
    <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Waitlist Control Panel
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Analyze waitlist performance, manage participants, and broadcast launch
          announcements.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {(["list", "broadcast"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold transition-all",
              activeTab === tab
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue-dark/20"
                : "border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white",
            )}
          >
            {tab === "list" ? "Participants" : "Launch Broadcasts"}
          </button>
        ))}
      </div>
    </section>
  );
}
