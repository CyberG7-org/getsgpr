export type Lead = {
  source: "checker" | "readiness" | "citizenship-readiness";
  submissionId?: string;
  email: string;
  firstName?: string;
  answers: number[];
  consent?: true;
};
export type LeadReceipt = { forwarded: boolean; submissionId: string };
export type LeadSubmission = Lead & {
  pageUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function createSubmissionId() {
  return crypto.randomUUID();
}

export async function postLead(lead: Lead): Promise<LeadReceipt | null> {
  try {
    const params = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
    const submission: LeadSubmission = {
      ...lead,
      pageUrl: typeof window === "undefined" ? undefined : window.location.href,
      referrer: typeof document === "undefined" ? undefined : document.referrer || undefined,
      utmSource: params?.get("utm_source") ?? undefined,
      utmMedium: params?.get("utm_medium") ?? undefined,
      utmCampaign: params?.get("utm_campaign") ?? undefined,
    };
    const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(submission) });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (typeof data !== "object" || data === null || !("forwarded" in data) || !("submissionId" in data) || typeof data.submissionId !== "string") return null;
    return { forwarded: data.forwarded === true, submissionId: data.submissionId };
  } catch { return null; }
}

export async function postBookingIntent(submissionId: string, email: string): Promise<boolean> {
  try {
    const res = await fetch("/api/lead/booking-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ submissionId, email }),
      keepalive: true,
    });
    return res.ok;
  } catch { return false; }
}
