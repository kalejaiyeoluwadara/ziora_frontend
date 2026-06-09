"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";

/**
 * Fixed bottom CTA on mobile, revealed after the hero form scrolls out of view.
 * Tapping smooth-scrolls back to the hero email input.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function scrollToTop() {
    const input = document.getElementById("email-hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => input?.focus(), 500);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <Button size="lg" className="w-full" onClick={scrollToTop}>
            Get early access
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
