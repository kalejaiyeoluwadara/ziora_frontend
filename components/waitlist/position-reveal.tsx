"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface PositionRevealProps {
  value: number;
  label?: string;
  prefix?: string;
  className?: string;
}

/** Large rank/position number that rolls into place once (spring, low bounce). */
export function PositionReveal({
  value,
  label,
  prefix = "#",
  className,
}: PositionRevealProps) {
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      type: "spring",
      stiffness: 90,
      damping: 18,
      duration: 0.6,
    });
    return controls.stop;
  }, [count, value, reduce]);

  return (
    <div className={cn("text-center", className)}>
      <motion.p
        initial={reduce ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display text-[64px] font-extrabold leading-none tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white sm:text-[76px] drop-shadow-[0_2px_15px_rgba(30,220,255,0.3)]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span className="text-white/40 font-bold mr-1">{prefix}</span>
        <motion.span>{display}</motion.span>
      </motion.p>
      {label && (
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-wider text-white/60">{label}</p>
      )}
    </div>
  );
}
