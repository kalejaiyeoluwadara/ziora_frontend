import Link from "next/link";
import type { ReactNode } from "react";
import { ZioraLogo } from "@/components/icons";
import { SiteFooter } from "./site-footer";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <main className="flex-1 bg-bg-white">
        <header className="border-b border-black/5">
          <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
            <Link href="/" aria-label="Ziora home">
              <ZioraLogo className="h-7 text-brand-blue" />
            </Link>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text-primary">
            {title}
          </h1>
          <p className="mt-2 text-sm text-text-muted">Last updated {updated}</p>
          <div className="legal-prose mt-8 space-y-6 text-[15px] leading-7 text-text-secondary">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
