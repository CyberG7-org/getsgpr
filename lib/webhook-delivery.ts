type WebhookPayload = Record<string, unknown>;

async function deliver(url: string | undefined, payload: WebhookPayload) {
  if (!url) return false;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function deliverLeadPayload(payload: WebhookPayload) {
  const sheetSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  const [ghlForwarded, sheetForwarded] = await Promise.all([
    deliver(process.env.GHL_LEAD_WEBHOOK_URL, payload),
    deliver(
      process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      sheetSecret ? { ...payload, webhookSecret: sheetSecret } : payload,
    ),
  ]);

  return { ghlForwarded, sheetForwarded };
}

export async function deliverSheetPayload(payload: WebhookPayload) {
  const sheetSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  return deliver(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    sheetSecret ? { ...payload, webhookSecret: sheetSecret } : payload,
  );
}

// New checker submissions only: Make emails the team and sends the customer their result. Booking events must not call this.
export function deliverNotificationPayload(payload: WebhookPayload) {
  return deliver(process.env.MAKE_LEAD_WEBHOOK_URL, payload);
}
