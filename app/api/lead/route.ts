import { NextResponse } from "next/server";
import { EMAIL_RE, type LeadSubmission } from "@/lib/lead";
import { buildLeadRecord, validAnswers } from "@/lib/lead-record";

export async function POST(req: Request) {
  let body: Partial<LeadSubmission>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }
  if (!body || typeof body.email !== "string" || !EMAIL_RE.test(body.email) || (body.source !== "checker" && body.source !== "readiness" && body.source !== "citizenship-readiness") || !validAnswers(body.source, body.answers))
    return NextResponse.json({ ok: false, error: "invalid lead" }, { status: 400 });
  if (body.source !== "checker" && body.consent !== true)
    return NextResponse.json({ ok: false, error: "consent required" }, { status: 400 });

  const receivedAt = new Date().toISOString();
  const submissionId = crypto.randomUUID();
  const record = buildLeadRecord(body as LeadSubmission, receivedAt, submissionId);
  const url = process.env.GHL_LEAD_WEBHOOK_URL;
  let forwarded = false;
  if (url) {
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(record) });
      forwarded = res.ok;
    } catch { forwarded = false; }
  }
  return NextResponse.json({ ok: true, forwarded, submissionId }, { status: 202 });
}
