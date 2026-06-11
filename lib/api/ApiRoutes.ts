export const API_ROUTES = {
  WAITLIST: {
    SUBSCRIBE: "/waitlist/subscribe",
    STATS: "/waitlist/stats",
    LEADERBOARD: "/waitlist/leaderboard",
    VERIFY: "/waitlist/verify",
    UNSUBSCRIBE: "/waitlist/unsubscribe",
  },
  ADMIN: {
    LOGIN: "/waitlist/admin/login",
    OVERVIEW: "/waitlist/admin/overview",
    EXPORT: "/waitlist/admin/export",
    SUBSCRIBERS: "/waitlist/admin/subscribers",
    SUBSCRIBER: (id: string) => `/waitlist/admin/subscribers/${id}`,
    BROADCAST: "/waitlist/admin/broadcast",
    BROADCAST_LOGS: "/waitlist/admin/broadcast/logs",
  },
} as const;
