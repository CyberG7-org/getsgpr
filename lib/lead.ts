export type Lead = {
  source: "checker" | "readiness" | "citizenship-readiness";
  email: string;
  firstName?: string;
  answers: number[];
  consent?: true;
};
export type LeadSubmission = Lead & {
  pageUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function postLead(lead: Lead): Promise<boolean> {
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
    if (!res.ok) return false;
    const data: unknown = await res.json();
    return typeof data === "object" && data !== null && "forwarded" in data && data.forwarded === true;
  } catch { return false; }
}
