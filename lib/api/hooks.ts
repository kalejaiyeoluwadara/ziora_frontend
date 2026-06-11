"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getWaitlistStats } from "./ApClients";

export function useWaitlistStats() {
  return useQuery({
    queryKey: ["waitlist", "stats"],
    queryFn: getWaitlistStats,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    retry: 1,
  });
}

export function useLeaderboard(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["waitlist", "leaderboard", page, limit],
    queryFn: () => getLeaderboard({ page, limit }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 1,
  });
}
