import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/icons";
import type { RoleInterest } from "@/lib/api/types";

interface AdminAddSubscriberModalProps {
  isOpen: boolean;
  firstName: string;
  email: string;
  role: RoleInterest;
  error: string | null;
  isAdding: boolean;
  onClose: () => void;
  onFirstNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: RoleInterest) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminAddSubscriberModal({
  isOpen,
  firstName,
  email,
  role,
  error,
  isAdding,
  onClose,
  onFirstNameChange,
  onEmailChange,
  onRoleChange,
  onSubmit,
}: AdminAddSubscriberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-[0_24px_70px_rgba(8,28,92,0.5)]">
        <div className="pointer-events-none absolute top-[-20%] left-[-20%] h-[60%] w-[60%] rounded-full bg-brand-blue-light/10 blur-3xl" />

        <div className="relative mb-6 flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight text-white">
            Add Manual Subscriber
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-900 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-4 text-left">
          <div>
            <label
              htmlFor="add-name"
              className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-500 uppercase"
            >
              First Name
            </label>
            <input
              id="add-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              placeholder="Kemi"
              className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3.5 text-xs text-white transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-blue-light focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="add-email"
              className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-500 uppercase"
            >
              Email Address
            </label>
            <input
              id="add-email"
              type="email"
              required
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="kemi@gmail.com"
              className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3.5 text-xs text-white transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-blue-light focus:outline-none"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Role Interest
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["buyer", "vendor", "both"] as const).map((r) => {
                const active = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onRoleChange(r)}
                    className={`h-9 rounded-lg border text-xs font-semibold capitalize transition-all ${
                      active
                        ? "border-brand-blue-light bg-brand-blue text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] font-medium text-red-300">
              {error}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isAdding}
              className="h-11 w-full bg-white font-bold text-brand-blue hover:bg-white/95 active:scale-[0.98]"
            >
              {isAdding ? (
                <>
                  <Spinner className="animate-spin text-brand-blue" />
                  Saving...
                </>
              ) : (
                "Save Subscriber"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
