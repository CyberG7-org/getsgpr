import { NextResponse } from "next/server";
import { deliverSheetPayload } from "@/lib/webhook-delivery";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function objectValue(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
}

export async function POST(req: Request) {
  const configuredToken = process.env.GHL_APPOINTMENT_WEBHOOK_TOKEN;
  const suppliedToken = new URL(req.url).searchParams.get("token");
  if (!configuredToken || suppliedToken !== configuredToken)
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = objectValue(await req.json()); }
  catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }

  const customData = objectValue(body.customData);
  const submissionId = customData.submissionId ?? body.submissionId;
  const appointmentStart = customData.appointmentStart ?? body.appointmentStart;

  if (
    typeof submissionId !== "string"
    || !UUID_RE.test(submissionId)
    || typeof appointmentStart !== "string"
    || !appointmentStart.trim()
    || appointmentStart.length > 200
  ) return NextResponse.json({ ok: false, error: "invalid appointment" }, { status: 400 });

  const sheetForwarded = await deliverSheetPayload({
    eventType: "appointment_booked",
    submissionId,
    bookingStatus: "Booked",
    appointmentStart: appointmentStart.trim(),
  });

  return NextResponse.json({ ok: true, sheetForwarded }, { status: 202 });
}
