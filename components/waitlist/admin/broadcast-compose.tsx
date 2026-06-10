import { Check, Megaphone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminBroadcastComposeProps {
  subscriberCount: number;
  subject: string;
  message: string;
  isBroadcasting: boolean;
  broadcastProgress: number;
  broadcastSuccess: boolean;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminBroadcastCompose({
  subscriberCount,
  subject,
  message,
  isBroadcasting,
  broadcastProgress,
  broadcastSuccess,
  onSubjectChange,
  onMessageChange,
  onSubmit,
}: AdminBroadcastComposeProps) {
  return (
    <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-6 lg:col-span-2">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-bold tracking-tight text-white">
        <Megaphone className="h-5 w-5 text-brand-blue-light" />
        Compose Launch Broadcast
      </h2>
      <p className="mb-6 text-xs text-slate-400">
        Send an early-access launch notification to all waitlist participants.
        Simulated Resend API integration.
      </p>

      {broadcastSuccess && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-300">
          <Check className="h-5 w-5 rounded-full bg-emerald-500 p-0.5 text-white" />
          <div>
            <p className="font-bold">Broadcast Dispatch Completed!</p>
            <p className="mt-0.5 text-xs font-normal text-emerald-400/80">
              Sent to {subscriberCount} total subscribers successfully.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
          >
            Broadcast Subject
          </label>
          <input
            id="subject"
            type="text"
            required
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="⚡ Ziora Early Access: Wave 1 is officially OPEN!"
            disabled={isBroadcasting}
            className="h-12 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 text-sm text-white transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-blue-light focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
          >
            Message Body (HTML Supported)
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Hello from Ziora HQ! We are thrilled to invite you to our exclusive Wave 1 early launch..."
            disabled={isBroadcasting}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-white transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-blue-light focus:outline-none"
          />
        </div>

        {isBroadcasting ? (
          <div className="py-4">
            <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
              <span>Simulating API broadcasts via Node mailer...</span>
              <span>{broadcastProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
              <div
                className="h-full rounded-full bg-brand-blue-light transition-all duration-300"
                style={{ width: `${broadcastProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={!subject || !message}
            className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 bg-white px-8 font-bold text-brand-blue hover:bg-white/95 active:scale-[0.98] sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Dispatch Broadcast Message
          </Button>
        )}
      </form>
    </div>
  );
}
