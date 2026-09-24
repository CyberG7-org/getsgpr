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
