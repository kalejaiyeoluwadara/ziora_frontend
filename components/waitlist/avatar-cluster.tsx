"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { SocialMember } from "@/lib/waitlist/content";
import { HERO_SOCIAL_MEMBERS } from "@/lib/waitlist/content";
import { cn } from "@/lib/utils";

interface AvatarClusterProps {
  className?: string;
  members?: SocialMember[];
  /** Highlight the leading avatar — synced with the join ticker. */
  activeIndex?: number;
}

const FLOAT_OFFSETS = [-2.5, 1.5, -3, 2, -1.5];

const spring = { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.8 };

export function AvatarCluster({
  className,
  members = HERO_SOCIAL_MEMBERS.slice(0, 5),
  activeIndex = 0,
}: AvatarClusterProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex items-center", className)} aria-hidden="true">
      {members.map((member, i) => {
        const isActive = i === activeIndex % members.length;

        return (
          <motion.div
            key={member.name}
            className={cn("relative -ml-3 first:ml-0", isActive && "z-10")}
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: isActive ? 1.14 : 1,
              y: isActive ? -2 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: i * 0.06 },
              x: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
              scale: spring,
              y: spring,
            }}
          >
            {/* Active halo — soft glass glow, not a ring */}
            {isActive && !reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-2 rounded-full bg-white/25 blur-md"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: [0.45, 0.7, 0.45], scale: [0.95, 1.05, 0.95] }}
                transition={{
                  opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            )}

            <motion.div
              animate={
                reduce
                  ? undefined
                  : { y: [0, FLOAT_OFFSETS[i] ?? 0, 0] }
              }
              transition={{
                y: {
                  duration: 3.2 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                },
              }}
            >
              <div
                className={cn(
                  "relative h-10 w-10 overflow-hidden rounded-full",
                  "border border-white/20 bg-white/10",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_6px_16px_rgba(8,28,92,0.22)]",
                  "backdrop-blur-md backdrop-saturate-150",
                  "supports-[backdrop-filter]:bg-white/[0.08]",
                  isActive &&
                    "border-white/35 bg-white/[0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_24px_rgba(8,28,92,0.32)]",
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
                <Image
                  src={member.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
