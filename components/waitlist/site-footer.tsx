import Link from "next/link";
import { Instagram, XTwitter, ZioraLogo } from "@/components/icons";
import { SOCIAL_LINKS } from "@/lib/waitlist/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <ZioraLogo className="h-7 text-brand-blue" />
          <p className="mt-3 max-w-xs text-sm text-text-secondary">
          Nigeria&apos;s trust-first marketplace. Everything you need, in one place.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ziora on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card text-text-secondary transition-colors hover:bg-[#E1E9FF] hover:text-brand-blue"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ziora on X"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card text-text-secondary transition-colors hover:bg-[#E1E9FF] hover:text-brand-blue"
            >
              <XTwitter className="h-4 w-4" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary">
            <Link href="/privacy" className="hover:text-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text-primary">
              Terms
            </Link>
            <a
              href={`mailto:${SOCIAL_LINKS.contactEmail}`}
              className="hover:text-text-primary"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <p className="text-[13px] text-text-muted">
            © {new Date().getFullYear()} Ziora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
