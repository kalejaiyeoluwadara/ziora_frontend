import { apiRequest } from "./client";
import { API_ROUTES } from "./ApiRoutes";
import type {
  LeaderboardResult,
  SubscribePayload,
  SubscribeResult,
  VerifyEmailResult,
  WaitlistStats,
  AdminLoginPayload,
  AdminLoginResult,
  PaginatedSubscribers,
  AdminSubscriber,
  AdminOverviewMetrics,
  BroadcastLogEntry,
} from "./types";

// Helper to retrieve token from sessionStorage
function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem("ziora_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ==========================================
// Waitlist Public API Client Functions
// ==========================================

export function subscribeToWaitlist(payload: SubscribePayload) {
  return apiRequest<SubscribeResult>(API_ROUTES.WAITLIST.SUBSCRIBE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getWaitlistStats() {
  return apiRequest<WaitlistStats>(API_ROUTES.WAITLIST.STATS, {
    method: "GET",
  });
}

export function getLeaderboard(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return apiRequest<LeaderboardResult>(
    `${API_ROUTES.WAITLIST.LEADERBOARD}${qs ? `?${qs}` : ""}`,
    {
      method: "GET",
    },
  );
}

export function verifyEmail(email: string) {
  const query = new URLSearchParams();
  query.set("email", email);
  return apiRequest<VerifyEmailResult>(
    `${API_ROUTES.WAITLIST.VERIFY}?${query.toString()}`,
    {
      method: "GET",
    },
  );
}

export function unsubscribeWaitlist(token: string) {
  return apiRequest<{ message: string }>(API_ROUTES.WAITLIST.UNSUBSCRIBE, {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

// ==========================================
// Waitlist Admin API Client Functions
// ==========================================

export function adminLogin(payload: AdminLoginPayload) {
  return apiRequest<AdminLoginResult>(API_ROUTES.ADMIN.LOGIN, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAdminOverview() {
  return apiRequest<AdminOverviewMetrics>(API_ROUTES.ADMIN.OVERVIEW, {
    method: "GET",
    headers: getAuthHeaders(),
  });
}

export function getAdminSubscribers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
}) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.role) query.set("role", params.role);
  if (params?.status) query.set("status", params.status);
  if (params?.sortBy) query.set("sortBy", params.sortBy);

  const qs = query.toString();
  return apiRequest<PaginatedSubscribers>(
    `${API_ROUTES.ADMIN.SUBSCRIBERS}${qs ? `?${qs}` : ""}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    },
  );
}

export function adminAddSubscriber(payload: {
  email: string;
  firstName?: string;
  roleInterest: "buyer" | "vendor" | "both";
  status?: string;
}) {
  return apiRequest<AdminSubscriber>(API_ROUTES.ADMIN.SUBSCRIBERS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminPatchSubscriber(
  id: string,
  payload: {
    firstName?: string;
    roleInterest?: "buyer" | "vendor" | "both";
    status?: string;
    referralCount?: number;
  },
) {
  return apiRequest<AdminSubscriber>(API_ROUTES.ADMIN.SUBSCRIBER(id), {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminDeleteSubscriber(id: string) {
  return apiRequest<{ message: string }>(API_ROUTES.ADMIN.SUBSCRIBER(id), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}

export function adminSendBroadcast(payload: { subject: string; message: string }) {
  return apiRequest<BroadcastLogEntry>(API_ROUTES.ADMIN.BROADCAST, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminGetBroadcastLogs() {
  return apiRequest<BroadcastLogEntry[]>(API_ROUTES.ADMIN.BROADCAST_LOGS, {
    method: "GET",
    headers: getAuthHeaders(),
  });
}

/**
 * Downloads waitlist subscriber table as CSV.
 * Uses client-side token authorization and anchors download link triggers dynamically.
 */
export async function downloadSubscribersCSV(): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api/v1";
  const url = `${baseUrl}${API_ROUTES.ADMIN.EXPORT}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`CSV download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `ziora_subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Failed to download CSV:", error);
    alert("An error occurred during CSV download. Please check your credentials.");
  }
}
