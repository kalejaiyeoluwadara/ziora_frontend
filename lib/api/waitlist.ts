import { apiRequest } from "./client";
import type {
  LeaderboardResult,
  SubscribePayload,
  SubscribeResult,
  WaitlistStats,
} from "./types";

export function subscribeToWaitlist(payload: SubscribePayload) {
  return apiRequest<SubscribeResult>("/waitlist/subscribe", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getWaitlistStats() {
  return apiRequest<WaitlistStats>("/waitlist/stats", {
    method: "GET",
  });
}

export function getLeaderboard(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return apiRequest<LeaderboardResult>(
    `/waitlist/leaderboard${qs ? `?${qs}` : ""}`,
    { method: "GET" },
  );
}
