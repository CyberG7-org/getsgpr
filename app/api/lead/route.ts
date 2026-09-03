import { NextResponse } from "next/server";
import { EMAIL_RE, type Lead } from "@/lib/lead";

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }
  if (!body || typeof body.email !== "string" || !EMAIL_RE.test(body.email) || !Array.isArray(body.answers) || !body.answers.every((n) => typeof n === "number") || (body.source !== "checker" && body.source !== "readiness"))
    return NextResponse.json({ ok: false, error: "invalid lead" }, { status: 400 });
  const url = process.env.GHL_LEAD_WEBHOOK_URL;
  let forwarded = false;
  if (url) {
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }) });
      forwarded = res.ok;
    } catch { forwarded = false; }
  }
  return NextResponse.json({ ok: true, forwarded }, { status: 202 });
}
