import { Megaphone } from "lucide-react";
import type { BroadcastLog } from "@/lib/waitlist/admin-store";

interface AdminBroadcastHistoryProps {
  broadcasts: BroadcastLog[];
}

export function AdminBroadcastHistory({ broadcasts }: AdminBroadcastHistoryProps) {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-900 bg-slate-950/40 p-6">
      <h3 className="mb-4 border-b border-slate-900 pb-3 font-mono text-sm font-bold tracking-wider text-white uppercase">
        Broadcast History ({broadcasts.length})
      </h3>

      <div className="max-h-[360px] flex-1 space-y-4 overflow-y-auto pr-1">
        {broadcasts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-slate-600">
            <Megaphone className="h-8 w-8 opacity-40" />
            <span className="text-xs">No notifications broadcasted yet.</span>
          </div>
        ) : (
          broadcasts.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-slate-900 bg-slate-900/20 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="flex-1 truncate text-xs font-bold text-white">
                  {log.subject}
                </h4>
                <span className="shrink-0 rounded border border-brand-blue-light/30 bg-brand-blue/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-brand-blue-light uppercase">
                  Sent
                </span>
              </div>
              <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-slate-400">
                {log.message}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-900/60 pt-2 font-mono text-[9px] text-slate-500">
                <span>
                  Recipients:{" "}
                  <strong className="text-white">{log.recipientCount}</strong>
                </span>
                <span>{new Date(log.sentAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
