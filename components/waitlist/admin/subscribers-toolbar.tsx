import { Calendar, Download, Filter, Search, UserPlus } from "lucide-react";
import type { RoleFilter, SortBy } from "./types";

interface AdminSubscribersToolbarProps {
  searchQuery: string;
  roleFilter: RoleFilter;
  sortBy: SortBy;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: RoleFilter) => void;
  onSortChange: (value: SortBy) => void;
  onExport: () => void;
  onAdd: () => void;
}

const selectClass =
  "h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-800 bg-slate-900/40 pr-8 pl-10 text-xs text-slate-300 transition-all focus:ring-1 focus:ring-brand-blue-light focus:outline-none";

export function AdminSubscribersToolbar({
  searchQuery,
  roleFilter,
  sortBy,
  onSearchChange,
  onRoleFilterChange,
  onSortChange,
  onExport,
  onAdd,
}: AdminSubscribersToolbarProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-slate-900 pb-6 lg:flex-row lg:items-center">
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <div className="relative flex-1 sm:w-64">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name or email..."
            className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/40 pr-4 pl-10 text-xs text-white transition-all placeholder:text-slate-500 focus:ring-1 focus:ring-brand-blue-light focus:outline-none"
          />
        </div>

        <div className="relative sm:w-48">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
            <Filter className="h-4 w-4" />
          </span>
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value as RoleFilter)}
            className={selectClass}
          >
            <option value="all" className="bg-[#0b0e1b]">
              Filter: All Roles
            </option>
            <option value="buyer" className="bg-[#0b0e1b]">
              Filter: Buyers
            </option>
            <option value="vendor" className="bg-[#0b0e1b]">
              Filter: Vendors
            </option>
            <option value="both" className="bg-[#0b0e1b]">
              Filter: Both
            </option>
          </select>
        </div>

        <div className="relative sm:w-48">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
            <Calendar className="h-4 w-4" />
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className={selectClass}
          >
            <option value="position" className="bg-[#0b0e1b]">
              Sort: Rank / Position
            </option>
            <option value="invites" className="bg-[#0b0e1b]">
              Sort: Referral Count
            </option>
            <option value="date" className="bg-[#0b0e1b]">
              Sort: Sign-Up Date
            </option>
          </select>
        </div>
      </div>

      <div className="flex w-full items-center gap-2 self-end sm:w-auto">
        <button
          type="button"
          onClick={onExport}
          className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 px-4 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white sm:flex-initial"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-blue px-4 text-xs font-semibold text-white shadow-md shadow-brand-blue-dark/10 transition-colors hover:bg-brand-blue-light sm:flex-initial"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Add Subscriber
        </button>
      </div>
    </div>
  );
}
