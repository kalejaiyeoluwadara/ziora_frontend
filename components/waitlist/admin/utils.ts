import type { AdminSubscriber } from "@/lib/waitlist/admin-store";
import type { RoleFilter, SortBy } from "./types";

export interface AdminMetrics {
  totalSubs: number;
  totalInvites: number;
  activeVendors: number;
  verifiedVendors: number;
  conversionRate: number;
}

export function computeAdminMetrics(
  subscribers: AdminSubscriber[],
): AdminMetrics {
  const totalSubs = subscribers.length;
  const totalInvites = subscribers.reduce((acc, s) => acc + s.referralCount, 0);
  const activeVendors = subscribers.filter(
    (s) => s.roleInterest === "vendor" || s.roleInterest === "both",
  ).length;
  const verifiedVendors = subscribers.filter(
    (s) => s.status === "verified_vendor",
  ).length;
  const conversionRate =
    totalSubs > 0
      ? Math.round(
          (subscribers.filter((s) => s.referralCount > 0).length / totalSubs) *
            100,
        )
      : 0;

  return {
    totalSubs,
    totalInvites,
    activeVendors,
    verifiedVendors,
    conversionRate,
  };
}

export function filterAndSortSubscribers(
  subscribers: AdminSubscriber[],
  searchQuery: string,
  roleFilter: RoleFilter,
  sortBy: SortBy,
): AdminSubscriber[] {
  const query = searchQuery.toLowerCase();

  return subscribers
    .filter((sub) => {
      const matchSearch =
        sub.email.toLowerCase().includes(query) ||
        sub.firstName.toLowerCase().includes(query);
      const matchRole = roleFilter === "all" || sub.roleInterest === roleFilter;
      return matchSearch && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === "position") return a.position - b.position;
      if (sortBy === "invites") return b.referralCount - a.referralCount;
      return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    });
}

export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage: safePage,
    totalPages,
    totalItems: items.length,
    startIndex: items.length === 0 ? 0 : start + 1,
    endIndex: Math.min(start + pageSize, items.length),
  };
}

export function exportSubscribersCSV(subscribers: AdminSubscriber[]) {
  const headers = [
    "Rank/Position",
    "First Name",
    "Email",
    "Role",
    "Invites",
    "Joined Date",
    "Status",
  ];
  const rows = subscribers.map((sub) => [
    sub.position,
    sub.firstName,
    sub.email,
    sub.roleInterest,
    sub.referralCount,
    new Date(sub.joinedDate).toLocaleDateString(),
    sub.status,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `ziora_waitlist_subscribers_${Date.now()}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
