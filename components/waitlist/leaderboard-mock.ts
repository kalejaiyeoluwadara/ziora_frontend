import type { LeaderboardEntry } from "@/lib/api/types";

// Base mock database representing active, verified waitlist referrers in Lagos.
// This ensures the leaderboard looks alive, populated and extremely polished.
export const defaultMockEntries: LeaderboardEntry[] = [];

// Weekly active mock data to give the UI a dynamic, responsive feeling.
export const weeklyMockEntries: LeaderboardEntry[] = [];

// Estimate a mock rank based on referral count if not provided by backend
export const getMockRank = (count: number): number => {
  if (count >= 25) return 5;
  if (count >= 10) return 12;
  if (count >= 5) return 47;
  if (count >= 3) return 152;
  if (count >= 1) return 842;
  return 1420;
};

// Generate consistent Nigerian names for users in the neighborhood view
export const getMockNameForRank = (rank: number): string => {
  const firstNames = ["Opeoluwa", "Kelechi", "Babajide", "Ezenwa", "Folake", "Adebimpe", "Obinna", "Halima", "Zainab", "Chinedum"];
  const lastInitials = ["A.", "O.", "E.", "U.", "L.", "S.", "K.", "M.", "B.", "I."];
  const nameIndex = rank % firstNames.length;
  const initialIndex = (rank * 3) % lastInitials.length;
  return `${firstNames[nameIndex]} ${lastInitials[initialIndex]}`;
};

// Milestones for access waves
export const milestones = [
  { referrals: 1, label: "Rank Boost", desc: "Move up ~100 spots" },
  { referrals: 3, label: "Wave 3 Access", desc: "1 week early access" },
  { referrals: 5, label: "Wave 2 Access", desc: "Priority entry wave" },
  { referrals: 10, label: "Wave 1 Access", desc: "Founding member badge" },
];
