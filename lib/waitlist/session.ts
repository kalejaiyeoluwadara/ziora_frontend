import type { JoinedSession } from "@/lib/api/types";

const KEY = "ziora_joined";
const REF_KEY = "ziora_ref";

export function saveJoinedSession(session: JoinedSession) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable (private mode) — confirmation falls back gracefully */
  }
}

export function readJoinedSession(): JoinedSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as JoinedSession) : null;
  } catch {
    return null;
  }
}

export function clearJoinedSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* no-op */
  }
}

/** Referral code captured from /r/[code], persisted until signup. */
export function saveReferralCode(code: string) {
  try {
    localStorage.setItem(REF_KEY, code);
  } catch {
    /* no-op */
  }
}

export function readReferralCode(): string | null {
  try {
    return localStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
}

export function clearReferralCode() {
  try {
    localStorage.removeItem(REF_KEY);
  } catch {
    /* no-op */
  }
}
