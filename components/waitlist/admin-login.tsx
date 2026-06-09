"use client";

import { useState } from "react";
import Link from "next/link";
import { ZioraLogo, Spinner, ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Network simulation for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      email.trim().toLowerCase() === "admin@ziora.app" &&
      password === "ziora-launch-2026"
    ) {
      setIsLoading(false);
      onLoginSuccess();
    } else {
      setIsLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center overflow-hidden">
      {/* Signature deep-blue gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#0B36B0]"
        style={{
          background:
            "linear-gradient(180deg, #0B36B0 0%, #1450E5 50%, #1E5BFF 100%)",
        }}
      />
      {/* Top-center radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      {/* Soft dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.08] p-8 shadow-[0_24px_70px_rgba(8,28,92,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-150 max-w-md w-full">
        {/* Specular top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
        {/* Ambient halo behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[40px] bg-white/[0.05] blur-2xl"
        />

        <div className="relative z-10 flex flex-col items-center">
          <Link href="/">
            <ZioraLogo className="h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
          </Link>
          
          <h1 className="mt-6 font-display text-2xl font-extrabold text-white tracking-tight">
            Waitlist Admin Portal
          </h1>
          <p className="mt-1.5 text-sm text-white/70">
            Secure admin authentication required.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 w-full space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="admin@ziora.app"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="••••••••••••"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
              />
            </div>

            {error && (
              <div aria-live="polite" className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs font-medium text-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="mt-6 w-full h-12 bg-white text-brand-blue hover:bg-white/95 active:scale-[0.98] transition-all font-bold shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Spinner className="animate-spin text-brand-blue" />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <Link
            href="/"
            className="mt-6 text-xs text-white/50 hover:text-white/80 transition-colors uppercase font-mono tracking-wider"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
