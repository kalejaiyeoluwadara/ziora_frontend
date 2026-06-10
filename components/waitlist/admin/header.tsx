import Link from "next/link";
import { LogOut } from "lucide-react";
import { ZioraLogo } from "@/components/icons";

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Ziora home">
            <ZioraLogo className="h-6.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          </Link>
          <span className="hidden rounded border border-brand-blue-light/30 bg-brand-blue/20 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-brand-blue-light uppercase sm:inline-block">
            Admin console
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </header>
  );
}
