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

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "When does Ziora launch?",
    answer:
      "We're onboarding our first cohort of verified vendors now. Waitlist members get access in waves starting Q3 2026 — the earlier you join, the earlier your wave.",
  },
  {
    question: "Is it free to join the waitlist?",
    answer:
      "Yes. Joining is completely free and takes a few seconds. We'll only email you about your early access — no spam, ever.",
  },
  {
    question: "How do I get early access?",
    answer:
      "Everyone on the waitlist gets an invite when their wave opens. Want in sooner? Invite friends with your referral link to climb the list and unlock earlier waves.",
  },
  {
    question: "What makes Ziora different?",
    answer:
      "Every vendor is manually reviewed before they can sell. Payments are secured by Paystack and held until your order is delivered. It's a marketplace built for trust first.",
  },
  {
    question: "Can I sell on Ziora?",
    answer:
      "Absolutely. Choose \"I want to sell\" when you join and you'll be first in line for vendor onboarding when we open applications.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Your email is used only to contact you about Ziora's launch. We never sell your data, and you can unsubscribe from any email with one click.",
  },
];

export const HOW_IT_WORKS = [
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
