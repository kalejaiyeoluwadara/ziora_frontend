import { SITE_URL } from "@/lib/api/client";

export function referralUrl(code: string): string {
  return `${SITE_URL.replace(/\/$/, "")}/join?ref=${code}`;
}

const SHARE_MESSAGE =
  "I just joined the Ziora waitlist — verified sellers, secure Paystack checkout, delivery across Lagos. Join here and we'll both move up:";

export function whatsappShareUrl(code: string): string {
  const text = `${SHARE_MESSAGE} ${referralUrl(code)}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function twitterShareUrl(code: string): string {
  const text =
    "I just joined the @ziora waitlist — verified sellers, secure checkout, Lagos-first delivery. Join early access:";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(referralUrl(code))}`;
}

export function shareMessage(code: string): string {
  return `${SHARE_MESSAGE} ${referralUrl(code)}`;
}
