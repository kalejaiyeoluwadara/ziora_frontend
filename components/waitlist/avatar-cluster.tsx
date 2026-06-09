import { cn } from "@/lib/utils";

interface AvatarClusterProps {
  className?: string;
}

/** Abstract gradient avatars — premium social-proof cue, no stock photography. */
const AVATARS = [
  { gradient: "linear-gradient(135deg,#1E5BFF,#0D3FC7)", initial: "A" },
  { gradient: "linear-gradient(135deg,#FF8A00,#FF6B00)", initial: "T" },
  { gradient: "linear-gradient(135deg,#22C55E,#0EA56A)", initial: "C" },
  { gradient: "linear-gradient(135deg,#1450E5,#1E5BFF)", initial: "K" },
  { gradient: "linear-gradient(135deg,#7C3AED,#1E5BFF)", initial: "N" },
];

export function AvatarCluster({ className }: AvatarClusterProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {AVATARS.map((a, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="-ml-2.5 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-2 ring-white/90 first:ml-0"
          style={{ background: a.gradient }}
        >
          {a.initial}
        </span>
      ))}
    </div>
  );
}
