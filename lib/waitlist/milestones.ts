export interface Milestone {
  referrals: number;
  reward: string;
  copy: string;
}

/** Access-wave reward ladder — see WAITLIST_STYLE_GUIDE §5.1. */
export const MILESTONES: Milestone[] = [
  { referrals: 0, reward: "Wave 4 — standard queue", copy: "You're on the list." },
  { referrals: 1, reward: "Move up ~100 positions", copy: "You moved up! One friend down." },
  { referrals: 3, reward: "Wave 3 priority", copy: "Wave 3 unlocked — 1 week earlier access." },
  { referrals: 5, reward: "Wave 2 priority", copy: "You're in Wave 2. Five referrals well spent." },
  { referrals: 10, reward: "Wave 1 + founding badge", copy: "Founding member status. Top 10% of referrers." },
  { referrals: 25, reward: "Vendor fast-track review", copy: "Your vendor application gets priority review." },
];

export interface MilestoneProgress {
  current: number;
  next: Milestone | null;
  remaining: number;
  /** 0–1 progress toward the next milestone. */
  progress: number;
  achieved: Milestone;
}

export function getMilestoneProgress(referralCount: number): MilestoneProgress {
  const sorted = [...MILESTONES].sort((a, b) => a.referrals - b.referrals);

  let achieved = sorted[0];
  let next: Milestone | null = null;

  for (let i = 0; i < sorted.length; i++) {
    if (referralCount >= sorted[i].referrals) {
      achieved = sorted[i];
      next = sorted[i + 1] ?? null;
    } else {
      next = sorted[i];
      break;
    }
  }

  if (!next) {
    return { current: referralCount, next: null, remaining: 0, progress: 1, achieved };
  }

  const span = next.referrals - achieved.referrals || 1;
  const done = referralCount - achieved.referrals;
  return {
    current: referralCount,
    next,
    remaining: next.referrals - referralCount,
    progress: Math.min(Math.max(done / span, 0), 1),
    achieved,
  };
}
