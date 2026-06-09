"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "@/components/icons";
import { FAQ_ITEMS } from "@/lib/waitlist/content";
import { Reveal } from "./reveal";

export function FaqAccordion() {
  return (
    <section className="bg-bg-section py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
            Questions, answered
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <Accordion.Root
            type="single"
            collapsible
            className="mt-10 space-y-3"
          >
            {FAQ_ITEMS.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-black/5 bg-bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-text-primary transition-colors hover:bg-bg-card/50 sm:px-6">
                    {item.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_200ms_ease-out]">
                  <p className="px-5 pb-4 text-[15px] leading-6 text-text-secondary sm:px-6">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
