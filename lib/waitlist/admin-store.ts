import type { RoleInterest } from "@/lib/api/types";

export interface AdminSubscriber {
  email: string;
  firstName: string;
  roleInterest: RoleInterest;
  referralCode: string;
  referralCount: number;
  position: number;
  joinedDate: string;
  status: "active" | "unsubscribed" | "verified_vendor";
}

export interface BroadcastLog {
  id: string;
  subject: string;
  message: string;
  sentAt: string;
  recipientCount: number;
}

const STORAGE_KEY = "ziora_waitlist_subscribers";
const BROADCAST_KEY = "ziora_broadcast_logs";

const SEED_SUBSCRIBERS: AdminSubscriber[] = [
  {
    email: "kemi.adebayo@gmail.com",
    firstName: "Kemi",
    roleInterest: "buyer",
    referralCode: "ZRKEMI1",
    referralCount: 12,
    position: 1481,
    joinedDate: "2026-05-24T10:30:00Z",
    status: "active",
  },
  {
    email: "chinedu.okafor@ziora.app",
    firstName: "Chinedu",
    roleInterest: "vendor",
    referralCode: "ZRCHINE",
    referralCount: 8,
    position: 1485,
    joinedDate: "2026-05-28T14:15:00Z",
    status: "verified_vendor",
  },
  {
    email: "tunde.bakare@yahoo.com",
    firstName: "Tunde",
    roleInterest: "both",
    referralCode: "ZRTUNDE",
    referralCount: 4,
    position: 1492,
    joinedDate: "2026-05-29T09:45:00Z",
    status: "active",
  },
  {
    email: "funmi.alao@outlook.com",
    firstName: "Funmi",
    roleInterest: "buyer",
    referralCode: "ZRFUNMI",
    referralCount: 0,
    position: 1510,
    joinedDate: "2026-05-30T17:20:00Z",
    status: "active",
  },
  {
    email: "emeka.obi@gmail.com",
    firstName: "Emeka",
    roleInterest: "vendor",
    referralCode: "ZREMEKA",
    referralCount: 15,
    position: 1475,
    joinedDate: "2026-06-01T11:10:00Z",
    status: "active",
  },
  {
    email: "amara.eke@ziora.app",
    firstName: "Amara",
    roleInterest: "buyer",
    referralCode: "ZRAMARA",
    referralCount: 2,
    position: 1502,
    joinedDate: "2026-06-03T08:05:00Z",
    status: "active",
  },
  {
    email: "yusuf.musa@gmail.com",
    firstName: "Yusuf",
    roleInterest: "both",
    referralCode: "ZRYUSUF",
    referralCount: 1,
    position: 1507,
    joinedDate: "2026-06-04T13:30:00Z",
    status: "active",
  },
  {
    email: "chioma.nze@vendor.com",
    firstName: "Chioma",
    roleInterest: "vendor",
    referralCode: "ZRCHIOM",
    referralCount: 6,
    position: 1489,
    joinedDate: "2026-06-05T16:00:00Z",
    status: "verified_vendor",
  },
  {
    email: "olumide.lawson@gmail.com",
    firstName: "Olumide",
    roleInterest: "buyer",
    referralCode: "ZROLUMI",
    referralCount: 3,
    position: 1498,
    joinedDate: "2026-06-06T10:12:00Z",
    status: "active",
  },
  {
    email: "zainab.bello@gmail.com",
    firstName: "Zainab",
    roleInterest: "buyer",
    referralCode: "ZRZAINA",
    referralCount: 0,
    position: 1530,
    joinedDate: "2026-06-07T14:40:00Z",
    status: "active",
  },
  {
    email: "dami.balogun@ziora.app",
    firstName: "Dami",
    roleInterest: "both",
    referralCode: "ZRDAMIB",
    referralCount: 10,
    position: 1480,
    joinedDate: "2026-06-08T09:22:00Z",
    status: "active",
  },
  {
    email: "uche.johnson@ziora.app",
    firstName: "Uche",
    roleInterest: "vendor",
    referralCode: "ZRUCHEJ",
    referralCount: 0,
    position: 1550,
    joinedDate: "2026-06-09T08:15:00Z",
    status: "active",
  },
];

export function getSubscribers(): AdminSubscriber[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SUBSCRIBERS));
      return SEED_SUBSCRIBERS;
    }
    return JSON.parse(raw) as AdminSubscriber[];
  } catch {
    return SEED_SUBSCRIBERS;
  }
}

export function saveSubscribers(subs: AdminSubscriber[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch {
    // no-op
  }
}

export function addSubscriber(sub: Omit<AdminSubscriber, "position" | "referralCode" | "referralCount" | "joinedDate">): AdminSubscriber {
  const subs = getSubscribers();
  const emailLower = sub.email.trim().toLowerCase();
  
  if (subs.some(s => s.email.toLowerCase() === emailLower)) {
    throw new Error("A subscriber with this email already exists.");
  }
  
  // Random unused positions
  const maxPosition = subs.reduce((max, s) => Math.max(max, s.position), 1550);
  const newPosition = maxPosition + Math.floor(Math.random() * 5) + 1;
  const randHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const referralCode = `ZR${randHex}`;

  const newSub: AdminSubscriber = {
    ...sub,
    email: emailLower,
    position: newPosition,
    referralCode,
    referralCount: 0,
    joinedDate: new Date().toISOString(),
  };

  subs.push(newSub);
  saveSubscribers(subs);
  return newSub;
}

export function appendExistingSessionToAdmin(session: {
  email: string;
  position: number;
  referralCode: string;
  firstName?: string;
  roleInterest?: RoleInterest;
}) {
  const subs = getSubscribers();
  const emailLower = session.email.trim().toLowerCase();

  // If already exists, just return it
  if (subs.some(s => s.email.toLowerCase() === emailLower)) {
    return;
  }

  const newSub: AdminSubscriber = {
    email: emailLower,
    firstName: session.firstName || "Subscriber",
    roleInterest: session.roleInterest || "buyer",
    referralCode: session.referralCode,
    referralCount: 0,
    position: session.position,
    joinedDate: new Date().toISOString(),
    status: "active",
  };

  subs.push(newSub);
  saveSubscribers(subs);
}

export function deleteSubscriber(email: string): AdminSubscriber[] {
  const subs = getSubscribers();
  const filtered = subs.filter(s => s.email.toLowerCase() !== email.toLowerCase());
  saveSubscribers(filtered);
  return filtered;
}

export function toggleVerifyVendor(email: string): AdminSubscriber[] {
  const subs = getSubscribers();
  const updated = subs.map(s => {
    if (s.email.toLowerCase() === email.toLowerCase()) {
      const newStatus: AdminSubscriber["status"] = s.status === "verified_vendor" ? "active" : "verified_vendor";
      return { ...s, status: newStatus };
    }
    return s;
  });
  saveSubscribers(updated);
  return updated;
}

export function getBroadcastLogs(): BroadcastLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BROADCAST_KEY);
    return raw ? (JSON.parse(raw) as BroadcastLog[]) : [];
  } catch {
    return [];
  }
}

export function saveBroadcastLogs(logs: BroadcastLog[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BROADCAST_KEY, JSON.stringify(logs));
  } catch {
    // no-op
  }
}

export function sendBroadcast(subject: string, message: string): BroadcastLog {
  const logs = getBroadcastLogs();
  const subs = getSubscribers();
  
  const newLog: BroadcastLog = {
    id: `BC-${Date.now()}`,
    subject,
    message,
    sentAt: new Date().toISOString(),
    recipientCount: subs.length,
  };
  
  logs.unshift(newLog); // newest first
  saveBroadcastLogs(logs);
  return newLog;
}
