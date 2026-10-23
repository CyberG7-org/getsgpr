import { NextResponse } from "next/server";
import { EMAIL_RE, type LeadSubmission } from "@/lib/lead";
import { buildLeadRecord, validAnswers } from "@/lib/lead-record";
import { deliverLeadPayload, deliverNotificationPayload } from "@/lib/webhook-delivery";

export async function POST(req: Request) {
  let body: Partial<LeadSubmission>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }
  if (!body || typeof body.email !== "string" || !EMAIL_RE.test(body.email) || (body.source !== "checker" && body.source !== "readiness" && body.source !== "citizenship-readiness") || !validAnswers(body.source, body.answers))
    return NextResponse.json({ ok: false, error: "invalid lead" }, { status: 400 });
  if (body.source !== "checker" && body.consent !== true)
    return NextResponse.json({ ok: false, error: "consent required" }, { status: 400 });

  const receivedAt = new Date().toISOString();
  const suppliedId = typeof body.submissionId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)
    ? body.submissionId
    : null;
  const submissionId = suppliedId ?? crypto.randomUUID();
  const record = buildLeadRecord(body as LeadSubmission, receivedAt, submissionId);
  const [{ ghlForwarded, sheetForwarded }] = await Promise.all([deliverLeadPayload(record), deliverNotificationPayload(record)]);
  return NextResponse.json({ ok: true, forwarded: ghlForwarded, sheetForwarded, submissionId }, { status: 202 });
}
