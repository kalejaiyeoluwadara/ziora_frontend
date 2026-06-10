"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Lock } from "@/components/icons";
import { cn } from "@/lib/utils";

interface HeroPreviewProps {
  className?: string;
}

export function HeroPreview({ className }: HeroPreviewProps) {
  const reduce = !!useReducedMotion();

  return (
    <div className={cn("relative mx-auto w-full h-[360px] sm:h-[440px] flex justify-center overflow-hidden", className)}>
      {/* ── Mobile Mockup Image (Visible on mobile only) ── */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="block sm:hidden w-[280px] xs:w-[300px] aspect-[1125/2436] relative overflow-hidden rounded-[38px] border-[5px] border-white/20 bg-slate-900 shadow-2xl shrink-0"
      >
        <Image
          src="/waitlist-mobile.png"
          alt="Ziora Mobile App Preview"
          fill
          priority
          sizes="(max-w-640px) 300px"
          className="object-cover object-top"
        />
        {/* Subtle reflection overlay for realism */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
      </motion.div>

      {/* ── Desktop Mockup Image in Browser Chrome (Visible on tablet/desktop) ── */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden sm:flex flex-col w-full max-w-4xl overflow-hidden rounded-t-2xl border border-white/20 bg-[#030514] shadow-[0_-4px_30px_rgba(11,54,176,0.25),0_8px_40px_rgba(0,0,0,0.15)]"
      >
        {/* Browser Chrome Header */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-b from-[#1C1F2D] to-[#12141F] px-4 py-2 shrink-0">
          {/* Window dots */}
          <div className="flex gap-[6px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#28C840]" />
          </div>
          {/* Navigation arrows */}
          <div className="ml-2 flex gap-1 opacity-45">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M7.5 2.5L4 6l3.5 3.5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* URL Bar - dark theme version */}
          <div className="ml-2 flex h-[24px] flex-1 max-w-[260px] items-center gap-1.5 rounded-md border border-white/5 bg-white/5 px-2.5">
            <Lock className="h-[9px] w-[9px] shrink-0 text-accent-success" />
            <span className="truncate text-[10px] text-white/60 font-medium">ziora.app/store</span>
          </div>
        </div>

        {/* Desktop Mockup Image */}
        <div className="relative w-full aspect-[1024/1024] bg-[#030514]">
          <Image
            src="/waitlist-desktop.png"
            alt="Ziora Desktop Preview"
            fill
            priority
            sizes="(min-w-640px) 1000px"
            className="object-cover object-top"
          />
        </div>
      </motion.div>

      {/* Bottom Fade Mask - fades the bottom of the mockup to match the section background */}
      <div 
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#1E5BFF] via-[#1E5BFF]/90 to-transparent z-[10]" 
        aria-hidden="true"
      />
    </div>
  );
}

