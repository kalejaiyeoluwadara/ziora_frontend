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
      <p className="text-base font-semibold text-white">
        Move up the list
      </p>
      <p className="mt-0.5 text-[14px] text-white/70">
        Invite friends who&apos;d shop here. Every signup climbs your rank.
      </p>

      {/* Link + copy */}
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pl-4 backdrop-blur-sm">
        <span className="flex-1 truncate text-sm font-medium text-white/90">
          {displayUrl}
        </span>
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy referral link"
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-all duration-200 active:scale-95",
            copied
              ? "bg-emerald-500 text-white"
              : "bg-white text-brand-blue hover:bg-white/90 shadow-md shadow-black/5",
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
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-white shadow-lg shadow-[#25D366]/10 transition-all hover:bg-[#20ba59] active:scale-[0.98]"
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
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98] shadow-md shadow-black/5"
        >
          <XTwitter className="h-4 w-4" />
          Post
        </a>
        <button
          type="button"
          onClick={nativeShare}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 text-sm font-semibold text-white transition-all hover:bg-white/15 active:scale-[0.98]"
        >
          <Share className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
