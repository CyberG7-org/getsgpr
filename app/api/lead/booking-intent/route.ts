import { NextResponse } from "next/server";
import { EMAIL_RE } from "@/lib/lead";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  let body: { submissionId?: unknown; email?: unknown; recommendedPackage?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }

  if (
    typeof body.submissionId !== "string"
    || !UUID_RE.test(body.submissionId)
    || typeof body.email !== "string"
    || !EMAIL_RE.test(body.email)
    || typeof body.recommendedPackage !== "string"
    || !body.recommendedPackage.trim()
    || body.recommendedPackage.length > 120
  )
    return NextResponse.json({ ok: false, error: "invalid booking intent" }, { status: 400 });

  const bookingClickedAt = new Date().toISOString();
  const url = process.env.GHL_LEAD_WEBHOOK_URL;
  let forwarded = false;
  if (url) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventType: "booking_started",
          submissionId: body.submissionId,
          email: body.email.trim().toLowerCase(),
          bookingStatus: "Booking started",
          bookingClickedAt,
          recommendedPackage: body.recommendedPackage.trim(),
        }),
      });
      forwarded = response.ok;
    } catch { forwarded = false; }
  }

  return NextResponse.json({ ok: true, forwarded }, { status: 202 });
}
