import { z } from "zod";

export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email to join")
    .email("That doesn't look like a valid email"),
  firstName: z
    .string()
    .max(50, "Keep it under 50 characters")
    .optional()
    .or(z.literal("")),
  roleInterest: z.enum(["buyer", "vendor", "both"]).optional(),
  /** Honeypot — real users never fill this. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type SubscribeFormValues = z.infer<typeof subscribeSchema>;
