import type { BroadcastLog } from "@/lib/waitlist/admin-store";
import { AdminBroadcastCompose } from "./broadcast-compose";
import { AdminBroadcastHistory } from "./broadcast-history";

interface AdminBroadcastPanelProps {
  subscriberCount: number;
  broadcasts: BroadcastLog[];
  subject: string;
  message: string;
  isBroadcasting: boolean;
  broadcastProgress: number;
  broadcastSuccess: boolean;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminBroadcastPanel({
  subscriberCount,
  broadcasts,
  subject,
  message,
  isBroadcasting,
  broadcastProgress,
  broadcastSuccess,
  onSubjectChange,
  onMessageChange,
  onSubmit,
}: AdminBroadcastPanelProps) {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <AdminBroadcastCompose
        subscriberCount={subscriberCount}
        subject={subject}
        message={message}
        isBroadcasting={isBroadcasting}
        broadcastProgress={broadcastProgress}
        broadcastSuccess={broadcastSuccess}
        onSubjectChange={onSubjectChange}
        onMessageChange={onMessageChange}
        onSubmit={onSubmit}
      />
      <AdminBroadcastHistory broadcasts={broadcasts} />
    </section>
  );
}
