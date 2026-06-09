"use client";

import { useEffect } from "react";
import { saveReferralCode } from "@/lib/waitlist/session";

/**
 * Silently captures a `?ref=CODE` query param on the landing page and persists
 * it until signup. No UI — referral attribution happens behind the scenes.
 */
export function ReferralCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) saveReferralCode(ref);
  }, []);

  return null;
}
