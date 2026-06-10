import Link from "next/link";
import { ZioraLogo } from "@/components/icons";
import { cn } from "@/lib/utils";

type WaitlistAudience = "buyer" | "vendor";

interface WaitlistNavProps {
  audience?: WaitlistAudience;
  className?: string;
}

export function WaitlistNav({ audience = "buyer", className }: WaitlistNavProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Link href="/" aria-label="Ziora home">
        <ZioraLogo className="h-7 text-white" />
      </Link>

      <nav className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/leaderboard"
          className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
        >
          Leaderboard
        </Link>
        {audience === "buyer" ? (
          <Link
            href="/vendor"
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sell on Ziora
          </Link>
        ) : (
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            Shop Ziora
          </Link>
        )}
      </nav>
    </div>
  );
}
