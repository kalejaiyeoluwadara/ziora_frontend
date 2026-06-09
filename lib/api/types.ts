export type RoleInterest = "buyer" | "vendor" | "both";

export type SubscriberStatus =
  | "active"
  | "unsubscribed"
  | "invited"
  | "converted";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface SubscribePayload {
  email: string;
  firstName?: string;
  roleInterest?: RoleInterest;
  source?: string;
  ref?: string;
  /** Honeypot — must stay empty for real humans. */
  company?: string;
}

export interface SubscribeResult {
  position: number;
  referralCode: string;
  rank?: number;
  referralCount?: number;
}

export interface WaitlistStats {
  totalSubscribers: number;
  signupsToday: number;
}

export interface LeaderboardEntry {
  rank: number;
  displayName: string;
  referralCount: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[];
  total: number;
}

/** Locally-held signup result, persisted to sessionStorage for /joined. */
export interface JoinedSession {
  email: string;
  position: number;
  referralCode: string;
  rank?: number;
  referralCount?: number;
  firstName?: string;
}

/** Known API error codes from the backend contract. */
export const API_ERROR_CODES = {
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
  RATE_LIMITED: "RATE_LIMITED",
  INVALID_INPUT: "INVALID_INPUT",
} as const;
