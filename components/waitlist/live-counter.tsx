"use client";

import {
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface LiveCounterProps {
  value: number;
  className?: string;
}

/** Counts up from 0 to `value` once on mount (respecting reduced-motion). */
export function LiveCounter({ value, className }: LiveCounterProps) {
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 0.4,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, value, reduce]);

  return (
    <motion.span
      className={cn("tabular-nums", className)}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {rounded}
    </motion.span>
  );
}
