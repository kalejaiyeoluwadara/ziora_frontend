import type { RoleInterest } from "@/lib/api/types";

export type AdminTab = "list" | "broadcast";

export type RoleFilter = "all" | RoleInterest;

export type SortBy = "position" | "invites" | "date";

export const ADMIN_PAGE_SIZE = 10;
