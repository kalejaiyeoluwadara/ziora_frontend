"use client";

import { useState } from "react";
import { Check, Copy, Share, WhatsApp, XTwitter } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  referralUrl,
  shareMessage,
  twitterShareUrl,
  whatsappShareUrl,
} from "@/lib/waitlist/share";

interface ReferralShareCardProps {
  code: string;
  className?: string;
}

export function ReferralShareCard({ code, className }: ReferralShareCardProps) {
  const [copied, setCopied] = useState(false);
  const url = referralUrl(code);
  const displayUrl = url.replace(/^https?:\/\//, "");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older WebViews
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    if (navigator.vibrate) navigator.vibrate(8);
    window.dispatchEvent(new CustomEvent("referral_share"));
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ziora waitlist",
          text: shareMessage(code),
          url,
        });
        window.dispatchEvent(new CustomEvent("referral_share"));
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <p className="text-base font-semibold text-text-primary">
        Move up the list
      </p>
      <p className="mt-0.5 text-[14px] text-text-secondary">
        Invite friends who&apos;d shop here. Every signup climbs your rank.
      </p>

      {/* Link + copy */}
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-black/5 bg-bg-card p-1.5 pl-4">
        <span className="flex-1 truncate text-sm font-medium text-text-primary">
          {displayUrl}
        </span>
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy referral link"
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
            copied
              ? "bg-accent-success text-white"
              : "bg-white text-brand-blue-dark hover:bg-[#E1E9FF]",
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Share buttons — WhatsApp first (Nigeria) */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a
          href={whatsappShareUrl(code)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("referral_share"))
          }
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <WhatsApp className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={twitterShareUrl(code)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("referral_share"))
          }
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-text-primary text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <XTwitter className="h-4 w-4" />
          Post
        </a>
        <button
          type="button"
          onClick={nativeShare}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-bg-card text-sm font-medium text-brand-blue-dark transition-colors hover:bg-[#E1E9FF]"
        >
          <Share className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
