"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SubscriberCount } from "./subscriber-count";
import { Reveal } from "./reveal";
import { Typewriter } from "./typewriter";

export function SocialProof() {
  const [isQuoteTyped, setIsQuoteTyped] = useState(false);

  return (
    <section className="bg-bg-section py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <SubscriberCount variant="stat" />
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="mt-12 border-t border-black/5 pt-12">
            <p className="font-display text-xl font-medium leading-8 text-text-primary sm:text-2xl sm:leading-9 min-h-[110px] sm:min-h-[72px]">
              &ldquo;
              <Typewriter
                text="We're building the marketplace Nigerians deserve — where every seller is verified, every payment is protected, and every order arrives."
                delay={200}
                speed={20}
                onComplete={() => setIsQuoteTyped(true)}
              />
              &rdquo;
            </p>
            <motion.footer
              initial={{ opacity: 0, y: 8 }}
              animate={isQuoteTyped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 text-sm text-text-secondary"
            >
              <span className="font-semibold text-text-primary">
                Opeoluwa Lawson
              </span>{" "}
              · Founder, Ziora
            </motion.footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
