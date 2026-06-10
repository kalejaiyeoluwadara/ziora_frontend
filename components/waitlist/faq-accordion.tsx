"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "@/components/icons";
import type { FaqItem } from "@/lib/waitlist/content";
import { BUYER_FAQ_ITEMS } from "@/lib/waitlist/content";
import { Reveal } from "./reveal";

interface FaqAccordionProps {
  items?: FaqItem[];
}

export function FaqAccordion({ items = BUYER_FAQ_ITEMS }: FaqAccordionProps) {
  return (
    <section className="bg-bg-section py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Reveal>
              <span className="text-xs font-bold tracking-widest text-brand-blue-light uppercase mb-3 block">
                Questions & Answers
              </span>
            </Reveal>
            
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary sm:text-4xl">
                Got questions?<br className="hidden lg:inline" /> We have answers.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                {"Can't find the answer you're looking for? Reach out to our founding team directly. We are always here to help you get started."}
              </p>
            </Reveal>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Reveal delay={0.1}>
              <Accordion.Root
                type="single"
                collapsible
                className="space-y-4"
              >
                {items.map((item, i) => (
                  <Accordion.Item
                    key={i}
                    value={`item-${i}`}
                    className="group overflow-hidden rounded-xl  border border-black/5 bg-bg-white transition-all duration-300 hover:-translate-y-[1px] hover:border-black/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] data-[state=open]:border-brand-blue-light/25 data-[state=open]:bg-gradient-to-br data-[state=open]:from-bg-white data-[state=open]:to-bg-card/25 data-[state=open]:shadow-[0_12px_24px_-10px_rgba(20,80,229,0.08)]"
                  >
                    <Accordion.Header className="cursor-pointer">
                      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left text-[15px] font-medium text-text-primary transition-colors sm:px-6">
                        <div className="flex cursor-pointer items-center gap-3.5">
                          <span className="font-mono text-xs font-semibold text-brand-blue-light/75 tracking-wider shrink-0">
                            {(i + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="font-medium text-text-primary transition-colors duration-200 group-hover:text-brand-blue-light group-data-[state=open]:text-brand-blue">
                            {item.question}
                          </span>
                        </div>
                        
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.03] text-text-muted transition-all duration-300 group-hover:bg-brand-blue-light/10 group-hover:text-brand-blue-light group-data-[state=open]:bg-brand-blue group-data-[state=open]:text-white">
                          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </div>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_200ms_ease-out]">
                      <div className="px-5 pb-5 pl-[50px] sm:px-6 sm:pl-[54px] text-[14px] leading-relaxed text-text-secondary">
                        {item.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
