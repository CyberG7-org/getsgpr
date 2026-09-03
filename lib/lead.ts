export type Lead = { source: "checker" | "readiness"; email: string; firstName?: string; answers: number[]; outcome: string; pkg: string };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function postLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
    return res.ok;
  } catch { return false; }
}
