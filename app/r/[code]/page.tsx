import { ReferralRedirect } from "@/components/waitlist/referral-redirect";

export const dynamic = "force-dynamic";

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <ReferralRedirect code={code} />;
}
