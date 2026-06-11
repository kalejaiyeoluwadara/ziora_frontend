"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ZioraLogo } from "@/components/icons";
import { saveReferralCode } from "@/lib/waitlist/session";

interface ReferralRedirectProps {
  code: string;
}

/**
 * Stores the referral code, then redirects to the landing page after a short
 * branded splash. Invalid codes still redirect — never break the funnel.
 */
export function ReferralRedirect({ code }: ReferralRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (code) saveReferralCode(code);
    const timer = setTimeout(
      () => router.replace(`/?ref=${encodeURIComponent(code)}`),
      800
    );
    return () => clearTimeout(timer);
  }, [code, router]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-5 text-center"
      style={{
        background:
          "linear-gradient(165deg, #1450E5 0%, #1E5BFF 55%, #EEF3FF 100%)",
      }}
    >
      <ZioraLogo className="h-8 text-white" />
      <p className="mt-8 font-display text-xl font-semibold text-white">
        You&apos;ve been invited to Ziora
      </p>
      <p className="mt-2 text-sm text-white/85">Taking you to the waitlist…</p>
    </main>
  );
}
