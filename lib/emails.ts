import { SITE } from "@/content/site";
import type { LeadRecord } from "@/lib/lead-record";

// The served host: getsgpr.com redirects here, and email clients load images more reliably without a redirect.
const ORIGIN = "https://www.getsgpr.com";
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1bBFcDY2ZL-1vx39r__kPeNvXdtciy91ERMJMGZ7XXKo/edit";
const INK = "#0A1223";
const NAVY = "#111B33";
const MUTED = "#5B6478";
const LINE = "#E3E8F2";
const SOFT = "#F7F9FD";

export type Email = { subject: string; html: string };

export function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function button(href: string, label: string, background = INK, colour = "#ffffff") {
  return `<a href="${href}" style="display:inline-block;margin:6px 6px 0 0;padding:13px 22px;border-radius:10px;background:${background};color:${colour};font-weight:700;text-decoration:none">${label}</a>`;
}

/** Label/value rows for internal emails. Values are inserted as given, so escape user input first. */
export function details(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:12px;background:${SOFT}">
${rows.map(([label, value]) => `<tr><td style="padding:8px 14px;width:150px;vertical-align:top;color:${MUTED};font-size:13px">${label}</td><td style="padding:8px 14px;vertical-align:top">${value}</td></tr>`).join("\n")}
</table>`;
}

const companyLine = `${escapeHtml(SITE.legalName)} · UEN ${SITE.uen} · ${escapeHtml(SITE.address)} · ${SITE.phoneDisplay}`;

/** The GetSGPR email layout: navy header with logo and name, white body, grey footer. `body` and `footer` are HTML. */
export function brandedEmail(body: string, footer: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F3F5FA">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F5FA;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${NAVY}">
<tr><td style="background:${INK};padding:24px 28px">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle"><img src="${ORIGIN}/email/getsgpr-logo.png" width="96" height="63" alt="SGPR" style="display:block;border:0"></td>
<td style="vertical-align:middle;padding-left:14px;color:#ffffff;font-size:20px;font-weight:700">GetSGPR<br><span style="font-size:12px;font-weight:400;color:#C6D2E6">Singapore PR &amp; citizenship consultancy</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:28px">
${body}
</td></tr>
<tr><td style="padding:18px 28px;background:${SOFT};border-top:1px solid ${LINE};font-size:12px;line-height:1.5;color:${MUTED}">
${footer}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/** Footer for emails that only go to the GetSGPR team. */
export const TEAM_FOOTER = `<p style="margin:0">Internal notification from <a href="${ORIGIN}" style="color:${MUTED}">getsgpr.com</a> for the GetSGPR team. Reply to this email to answer the person directly.<br>${companyLine}</p>`;

function list(title: string, items: string[], colour: string) {
  if (!items.length) return "";
  return `<p style="margin:20px 0 6px;font-weight:700;color:${colour}">${title}</p>
<ul style="margin:0;padding-left:20px;color:${NAVY}">${items.map((item) => `<li style="margin:0 0 4px">${escapeHtml(item)}</li>`).join("")}</ul>`;
}

export function buildResultEmail(record: LeadRecord): Email {
  const eligibility = record.source === "checker";
  const name = record.firstName ? escapeHtml(record.firstName) : "there";
  const tool = { checker: "eligibility check", readiness: "PR Readiness Review", "citizenship-readiness": "Citizenship Readiness Checker" }[record.source];
  const subject = eligibility ? "Your GetSGPR eligibility snapshot" : `Your ${record.checkerType} result: ${record.outcome}`;
  const bookingUrl = `${ORIGIN}/book-a-call?rid=${encodeURIComponent(record.submissionId)}`;
  const pkg = [record.recommendedPackage, record.recommendedPackagePrice].filter(Boolean).join(" · ");

  const body = `<p style="margin:0 0 12px">Hi ${name},</p>
<p style="margin:0 0 18px">Thank you for completing the GetSGPR ${tool}. Here is your ${eligibility ? "snapshot" : "result"}.</p>
<div style="border:1px solid ${LINE};border-radius:12px;padding:16px 18px;background:${SOFT}">
<p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}">Your result</p>
<p style="margin:4px 0 8px;font-size:22px;font-weight:700;color:${INK}">${escapeHtml(record.outcome)}</p>
<p style="margin:0;color:${NAVY}">${escapeHtml(record.resultSummary)}</p>
</div>
${list("Strong areas", record.strongAreas, "#235C49")}
${list("Areas to strengthen", record.areasToStrengthen, "#795313")}
${list("How we can help", record.howWeCanHelp, INK)}
${pkg ? `<p style="margin:20px 0 4px;font-weight:700">Recommended for you: ${escapeHtml(pkg)}</p>${record.recommendedPackageReason ? `<p style="margin:0;color:${MUTED}">${escapeHtml(record.recommendedPackageReason)}</p>` : ""}` : ""}
${eligibility ? `<p style="margin:20px 0 0">Next, use our <a href="${ORIGIN}/guides/pr-document-checklist" style="color:#1B2B57">Singapore PR document checklist</a> to see what to prepare.</p>` : ""}
<p style="margin:24px 0 8px;font-weight:700">Talk it through with us</p>
<p style="margin:0 0 6px;color:${MUTED}">The first call is free and needs no documents.</p>
${button(escapeHtml(SITE.whatsappUrl), "Chat on WhatsApp", "#25D366", INK)}
${button(escapeHtml(bookingUrl), "Book a free call")}
<p style="margin:24px 0 0">Best regards,<br>The GetSGPR team</p>`;

  const footer = `<p style="margin:0 0 8px">This result is a GetSGPR preparation diagnostic based on your answers. It is not an ICA score or a prediction of ICA's decision. ${escapeHtml(SITE.independenceLine)}</p>
<p style="margin:0">${companyLine}<br>You received this email because you asked for your result on <a href="${ORIGIN}" style="color:${MUTED}">getsgpr.com</a>.</p>`;

  return { subject, html: brandedEmail(body, footer) };
}

export function buildTeamEmail(record: LeadRecord): Email {
  const name = escapeHtml(record.firstName || "(no name)");
  const email = escapeHtml(record.email);
  const pkg = [record.recommendedPackage, record.recommendedPackagePrice].filter(Boolean).join(" · ");
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", `<a href="mailto:${email}" style="color:#1B2B57">${email}</a>`],
    ["Outcome", `<b>${escapeHtml(record.outcome)}</b>`],
    ["Recommended", escapeHtml(pkg || "-")],
  ];
  if (record.strongAreasText) rows.push(["Strong areas", escapeHtml(record.strongAreasText.replaceAll(" | ", ", "))]);
  if (record.areasToStrengthenText) rows.push(["To strengthen", escapeHtml(record.areasToStrengthenText.replaceAll(" | ", ", "))]);
  rows.push(["Submitted", `${escapeHtml(record.receivedAt)}${record.pageUrl ? `<br><span style="color:${MUTED};font-size:13px">${escapeHtml(record.pageUrl)}</span>` : ""}`]);

  const body = `<p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}">New submission</p>
<p style="margin:4px 0 16px;font-size:22px;font-weight:700;color:${INK}">${escapeHtml(record.checkerType)}: ${name}</p>
${details(rows)}
<p style="margin:22px 0 6px;font-weight:700">Answers</p>
<ol style="margin:0;padding-left:20px">${record.answers.map((a) => `<li style="margin:0 0 4px">${escapeHtml(a.question)} <b>${escapeHtml(a.answer)}</b></li>`).join("")}</ol>
<p style="margin:22px 0 0">${button(`mailto:${email}`, `Reply to ${name}`)}${button(SHEET_URL, "Open the sheet", "#E8EEF9", INK)}</p>`;

  return { subject: `New ${record.checkerType} submission: ${record.firstName || "no name"} (${record.outcome})`, html: brandedEmail(body, TEAM_FOOTER) };
}
