import { Award, Check, Trash2 } from "lucide-react";
import type { AdminSubscriber } from "@/lib/waitlist/admin-store";

interface AdminSubscribersTableProps {
  subscribers: AdminSubscriber[];
  onDelete: (email: string) => void;
  onToggleVerify: (email: string) => void;
}

export function AdminSubscribersTable({
  subscribers,
  onDelete,
  onToggleVerify,
}: AdminSubscribersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="h-10 border-b border-slate-900 font-semibold tracking-wider text-slate-500 uppercase">
            <th className="px-4 pb-3">Position</th>
            <th className="px-4 pb-3">Name</th>
            <th className="px-4 pb-3">Email</th>
            <th className="px-4 pb-3">Role</th>
            <th className="px-4 pb-3 text-center">Invites</th>
            <th className="px-4 pb-3">Joined Date</th>
            <th className="px-4 pb-3">Status</th>
            <th className="px-4 pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60">
          {subscribers.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-500">
                No subscribers found matching the query filters.
              </td>
            </tr>
          ) : (
            subscribers.map((sub) => (
              <tr
                key={sub.email}
                className="h-12 transition-colors hover:bg-slate-900/20"
              >
                <td className="px-4 font-mono font-bold text-slate-400">
                  #{sub.position}
                </td>
                <td className="px-4 font-semibold text-white">{sub.firstName}</td>
                <td className="px-4 font-mono text-slate-300">{sub.email}</td>
                <td className="px-4 font-medium text-slate-400 capitalize">
                  {sub.roleInterest}
                </td>
                <td className="px-4 text-center font-mono font-bold text-[#FF8A00]">
                  {sub.referralCount}
                </td>
                <td className="px-4 text-slate-400">
                  {new Date(sub.joinedDate).toLocaleDateString()}
                </td>
                <td className="px-4">
                  {sub.status === "verified_vendor" ? (
                    <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase">
                      <Check className="h-3 w-3" /> Verified Vendor
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded border border-slate-800 bg-slate-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-400 uppercase">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {(sub.roleInterest === "vendor" ||
                      sub.roleInterest === "both") && (
                      <button
                        type="button"
                        onClick={() => onToggleVerify(sub.email)}
                        className={`rounded border p-1.5 transition-colors ${
                          sub.status === "verified_vendor"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                        title={
                          sub.status === "verified_vendor"
                            ? "Unverify Vendor"
                            : "Verify Vendor Store"
                        }
                      >
                        <Award className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete(sub.email)}
                      className="rounded border border-slate-800 bg-slate-900/60 p-1.5 text-slate-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                      title="Delete Participant"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
