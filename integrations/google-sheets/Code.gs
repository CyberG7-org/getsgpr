const SPREADSHEET_ID = "1bBFcDY2ZL-1vx39r__kPeNvXdtciy91ERMJMGZ7XXKo";
const SHEET_NAME = "Sheet1";
const NOTIFY_EMAIL = "getsgpr@gmail.com";

const HEADERS = [
  "Submission ID", "Submitted at", "Checker", "First name", "Email", "Outcome",
  "Strong areas", "Areas to strengthen", "How we can help", "Recommended package",
  "Package price", "Recommendation reason", "Answers", "Full answers JSON",
  "Consent date", "Booking status", "Booking clicked at", "Appointment start",
  "Page URL", "Referrer", "UTM source", "UTM medium", "UTM campaign", "Schema version",
];

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function findSubmissionRow(sheet, submissionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const match = sheet.getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext();
  return match ? match.getRow() : 0;
}

function readinessRow(data) {
  return [
    data.submissionId, data.receivedAt, data.checkerType, data.firstName, data.email,
    data.outcome, data.strongAreasText, data.areasToStrengthenText, data.howWeCanHelpText,
    data.recommendedPackage, data.recommendedPackagePrice, data.recommendedPackageReason,
    data.answersSummary, data.answersJson, data.consentAt, data.bookingStatus,
    data.bookingClickedAt, data.appointmentStart, data.pageUrl, data.referrer,
    data.utmSource, data.utmMedium, data.utmCampaign, data.schemaVersion,
  ].map(safeCell);
}

function answerLines(data) {
  if (Array.isArray(data.answers)) return data.answers.map((a, i) => `${i + 1}. ${a.question}: ${a.answer}`);
  return String(data.answersSummary || "").split(" | ");
}

// Emails the team about a newly created row. Failures are reported, never thrown, so the row is kept.
function notifyNewSubmission(data, sheet, row) {
  try {
    const name = data.firstName || "(no name)";
    const rowUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${sheet.getSheetId()}&range=A${row}`;
    const body = [
      `New ${data.checkerType} submission`,
      "",
      `Name: ${name}`,
      `Email: ${data.email}`,
      `Outcome: ${data.outcome}`,
      `Recommended package: ${data.recommendedPackage}${data.recommendedPackagePrice ? ` (${data.recommendedPackagePrice})` : ""}`,
      data.strongAreasText ? `Strong areas: ${data.strongAreasText}` : "",
      data.areasToStrengthenText ? `Areas to strengthen: ${data.areasToStrengthenText}` : "",
      "",
      "Answers:",
      ...answerLines(data),
      "",
      `Submitted at: ${data.receivedAt}`,
      `Page: ${data.pageUrl || "-"}`,
      `Sheet row: ${rowUrl}`,
    ].join("\n").replace(/\n{3,}/g, "\n\n");
    const message = { to: NOTIFY_EMAIL, subject: `New ${data.checkerType} submission: ${name} (${data.outcome})`, body };
    if (data.email) message.replyTo = data.email;
    MailApp.sendEmail(message);
    return true;
  } catch (error) {
    console.error(`Notification email failed for ${data.submissionId}: ${error}`);
    return false;
  }
}

// Run once from the Apps Script editor to grant email permission and confirm delivery.
function sendTestNotification() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const sent = notifyNewSubmission({
    checkerType: "Test", submissionId: "setup-test", firstName: "Setup test", outcome: "Notification works",
    recommendedPackage: "-", receivedAt: new Date().toISOString(), answersSummary: "No answers: this is a setup test",
  }, sheet, 1);
  if (!sent) throw new Error("Test email failed. Check the execution log.");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!expectedSecret || data.webhookSecret !== expectedSecret) return jsonResponse({ ok: false, error: "unauthorized" });
    if (!data.submissionId) return jsonResponse({ ok: false, error: "missing submissionId" });

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return jsonResponse({ ok: false, error: "sheet not found" });
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    const existingRow = findSubmissionRow(sheet, String(data.submissionId));
    if (data.eventType === "booking_started") {
      if (!existingRow) return jsonResponse({ ok: false, error: "submission not found" });
      sheet.getRange(existingRow, 10).setValue(safeCell(data.recommendedPackage));
      sheet.getRange(existingRow, 16).setValue(safeCell(data.bookingStatus));
      sheet.getRange(existingRow, 17).setValue(safeCell(data.bookingClickedAt));
      return jsonResponse({ ok: true, action: "updated", row: existingRow });
    }

    if (data.eventType === "appointment_booked") {
      if (!existingRow) return jsonResponse({ ok: false, error: "submission not found" });
      sheet.getRange(existingRow, 16).setValue(safeCell(data.bookingStatus || "Booked"));
      sheet.getRange(existingRow, 18).setValue(safeCell(data.appointmentStart));
      return jsonResponse({ ok: true, action: "updated", row: existingRow });
    }

    const values = readinessRow(data);
    const row = existingRow || sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([values]);
    if (existingRow) return jsonResponse({ ok: true, action: "updated", row });
    SpreadsheetApp.flush();
    const emailed = notifyNewSubmission(data, sheet, row);
    return jsonResponse({ ok: true, action: "created", row, emailed });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}
