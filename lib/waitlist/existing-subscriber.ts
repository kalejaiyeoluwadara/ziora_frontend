import { verifyEmail } from "@/lib/api/ApClients";
import type { JoinedSession } from "@/lib/api/types";
import { saveJoinedSession } from "./session";

export function joinedPathForEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return `/joined?email=${encodeURIComponent(normalized)}`;
}

/** Loads an existing waitlist member and persists them for /joined. */
export async function loadExistingSubscriberSession(
  email: string,
): Promise<JoinedSession | null> {
  const normalized = email.trim().toLowerCase();
  const details = await verifyEmail(normalized);

  if (!details.exists || !details.referralCode) {
    return null;
  }

  const session: JoinedSession = {
    email: details.email ?? normalized,
    position: details.position ?? 0,
    referralCode: details.referralCode,
    rank: details.rank,
    referralCount: details.referralCount ?? 0,
    firstName: details.firstName,
  };

  saveJoinedSession(session);
  return session;
}
