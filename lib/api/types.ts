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

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResult {
  token: string;
}

export interface AdminSubscriber {
  _id: string;
  email: string;
  firstName?: string;
  roleInterest: RoleInterest;
  status: SubscriberStatus;
  source?: string;
  signupIp?: string;
  position: number;
  referralCode: string;
  referredBy?: string | { _id: string; email: string };
  referralCount: number;
  rank?: number;
  unsubscribeToken: string;
  invitedAt?: string;
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSubscribers {
  subscribers: AdminSubscriber[];
  total: number;
  page: number;
  pages: number;
}

export interface AdminOverviewMetrics {
  totalSubscribers: number;
  signupsToday: number;
  signups7d: number;
  signups30d: number;
  roleBreakdown: {
    buyer: number;
    vendor: number;
    both: number;
  };
  statusBreakdown: {
    active: number;
    unsubscribed: number;
    invited: number;
    converted: number;
  };
  averageReferrals: number;
  topReferrers: {
    email: string;
    firstName?: string;
    referralCount: number;
    rank?: number;
  }[];
}

export interface BroadcastLogEntry {
  _id: string;
  subject: string;
  message: string;
  sentAt: string;
  recipientCount: number;
  createdAt: string;
  updatedAt: string;
}

