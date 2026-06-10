const MEMOJI_CDN = "https://cdn.jsdelivr.net/gh/alohe/avatars/png";

export interface SocialMember {
  name: string;
  avatar: string;
}

/** Placeholder early members — full names, memoji faces. Swap for live data later. */
export const HERO_SOCIAL_MEMBERS: SocialMember[] = [
  { name: "Chioma Adeyemi", avatar: `${MEMOJI_CDN}/memo_3.png` },
  { name: "Tunde Bakare", avatar: `${MEMOJI_CDN}/memo_7.png` },
  { name: "Amina Hassan", avatar: `${MEMOJI_CDN}/memo_12.png` },
  { name: "Kemi Ogundimu", avatar: `${MEMOJI_CDN}/memo_18.png` },
  { name: "Opeoluwa Lawson", avatar: `${MEMOJI_CDN}/memo_22.png` },
  { name: "Ngozi Eze", avatar: `${MEMOJI_CDN}/memo_9.png` },
  { name: "Emeka Nwosu", avatar: `${MEMOJI_CDN}/memo_15.png` },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/ziora",
  twitter: "https://x.com/ziora",
  contactEmail: "maplinknigeria@gmail.com",
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUYER_FAQ_ITEMS: FaqItem[] = [
  {
    question: "When does Ziora launch?",
    answer:
      "We're opening access in waves starting Q3 2026. Waitlist members get invites as each wave opens — the earlier you join, the earlier your wave.",
  },
  {
    question: "Is it free to join the waitlist?",
    answer:
      "Yes. Joining is completely free and takes a few seconds. We'll only email you about your early access, no spam, ever.",
  },
  {
    question: "How do I get early access?",
    answer:
      "Everyone on the waitlist gets an invite when their wave opens. Want in sooner? Invite friends with your referral link to climb the list and unlock earlier waves.",
  },
  {
    question: "What makes Ziora different?",
    answer:
      "Every seller is manually reviewed before they can list. Payments are secured by Paystack and held until your order is delivered. It's a marketplace built for trust first.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Your email is used only to contact you about Ziora's launch. We never sell your data, and you can unsubscribe from any email with one click.",
  },
];

export const VENDOR_FAQ_ITEMS: FaqItem[] = [
  {
    question: "When can I start selling?",
    answer:
      "We're onboarding our first cohort of verified vendors now. Vendor waitlist members get application invites in waves starting Q3 2026 — join early to be first in line.",
  },
  {
    question: "What are the fees?",
    answer:
      "Ziora charges a 5% commission per completed sale. There are no signup fees, no listing fees, and no monthly subscriptions at launch.",
  },
  {
    question: "How does vendor verification work?",
    answer:
      "Every seller is manually reviewed before they can list. We verify your identity and business details so buyers know they're shopping from real, trusted vendors.",
  },
  {
    question: "How do payouts work?",
    answer:
      "Buyer payments are held in escrow via Paystack and released to you 48–72 hours after delivery is confirmed. Weekly batch payouts every Monday.",
  },
  {
    question: "Do I need to be in Lagos?",
    answer:
      "We're Lagos-first at launch with same-day delivery via Kwik. Vendors outside Lagos can still apply — nationwide shipping via GIG Logistics opens at launch.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Your email is used only to contact you about vendor onboarding and Ziora's launch. We never sell your data, and you can unsubscribe from any email with one click.",
  },
];

/** @deprecated Use BUYER_FAQ_ITEMS or VENDOR_FAQ_ITEMS */
export const FAQ_ITEMS = BUYER_FAQ_ITEMS;

export const BUYER_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Join the list",
    body: "Drop your email and reserve your spot. Free, no commitment.",
  },
  {
    step: 2,
    title: "Climb your wave",
    body: "Invite friends to move up the queue and unlock earlier access.",
  },
  {
    step: 3,
    title: "Shop verified sellers",
    body: "Get your invite, set up your account, and start buying with confidence.",
  },
];

export const VENDOR_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Join the vendor list",
    body: "Reserve your spot on the vendor waitlist. Free, no upfront fees.",
  },
  {
    step: 2,
    title: "Get verified",
    body: "Complete a quick review so buyers know your storefront is trusted from day one.",
  },
  {
    step: 3,
    title: "Start selling",
    body: "List products, fulfil orders with Kwik or GIG, and get paid reliably after every delivery.",
  },
];

/** @deprecated Use BUYER_HOW_IT_WORKS or VENDOR_HOW_IT_WORKS */
export const HOW_IT_WORKS = BUYER_HOW_IT_WORKS;
