import type { AdminSubscriber } from "@/lib/waitlist/admin-store";
import { AdminPagination } from "./pagination";
import { AdminSubscribersTable } from "./subscribers-table";
import { AdminSubscribersToolbar } from "./subscribers-toolbar";
import type { RoleFilter, SortBy } from "./types";

interface AdminSubscribersPanelProps {
  subscribers: AdminSubscriber[];
  searchQuery: string;
  roleFilter: RoleFilter;
  sortBy: SortBy;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: RoleFilter) => void;
  onSortChange: (value: SortBy) => void;
  onPageChange: (page: number) => void;
  onExport: () => void;
  onAdd: () => void;
  onDelete: (email: string) => void;
  onToggleVerify: (email: string) => void;
}

export function AdminSubscribersPanel({
  subscribers,
  searchQuery,
  roleFilter,
  sortBy,
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onSearchChange,
  onRoleFilterChange,
  onSortChange,
  onPageChange,
  onExport,
  onAdd,
  onDelete,
  onToggleVerify,
}: AdminSubscribersPanelProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/40 p-5 md:p-6">
      <AdminSubscribersToolbar
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        sortBy={sortBy}
        onSearchChange={onSearchChange}
        onRoleFilterChange={onRoleFilterChange}
        onSortChange={onSortChange}
        onExport={onExport}
        onAdd={onAdd}
      />

      <AdminSubscribersTable
        subscribers={subscribers}
        onDelete={onDelete}
        onToggleVerify={onToggleVerify}
      />

      <AdminPagination
        className="mt-4"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={onPageChange}
      />
    </section>
  );
}
