import type { LeaderboardEntry } from "@/lib/api/types";

// Base mock database representing active, verified waitlist referrers in Lagos.
// This ensures the leaderboard looks alive, populated and extremely polished.
export const defaultMockEntries: LeaderboardEntry[] = [
  { rank: 1, displayName: "Oluwaseun A.", referralCount: 84 },
  { rank: 2, displayName: "Chinedu E.", referralCount: 62 },
  { rank: 3, displayName: "Fatima Y.", referralCount: 51 },
  { rank: 4, displayName: "Damilola O.", referralCount: 38 },
  { rank: 5, displayName: "Ngozi A.", referralCount: 29 },
  { rank: 6, displayName: "Adebayo S.", referralCount: 22 },
  { rank: 7, displayName: "Chioma N.", referralCount: 17 },
  { rank: 8, displayName: "Emeka K.", referralCount: 14 },
  { rank: 9, displayName: "Funmi L.", referralCount: 11 },
  { rank: 10, displayName: "Tunde O.", referralCount: 8 },
];

// Weekly active mock data to give the UI a dynamic, responsive feeling.
export const weeklyMockEntries: LeaderboardEntry[] = [
  { rank: 1, displayName: "Chinedu E.", referralCount: 18 },
  { rank: 2, displayName: "Oluwaseun A.", referralCount: 15 },
  { rank: 3, displayName: "Adebayo S.", referralCount: 12 },
  { rank: 4, displayName: "Ngozi A.", referralCount: 9 },
  { rank: 5, displayName: "Fatima Y.", referralCount: 8 },
  { rank: 6, displayName: "Damilola O.", referralCount: 6 },
  { rank: 7, displayName: "Tunde O.", referralCount: 5 },
  { rank: 8, displayName: "Chioma N.", referralCount: 4 },
  { rank: 9, displayName: "Emeka K.", referralCount: 3 },
  { rank: 10, displayName: "Funmi L.", referralCount: 2 },
];

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
