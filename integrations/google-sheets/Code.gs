const SPREADSHEET_ID = "1bBFcDY2ZL-1vx39r__kPeNvXdtciy91ERMJMGZ7XXKo";
const SHEET_NAME = "Sheet1";

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

    const values = readinessRow(data);
    const row = existingRow || sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([values]);
    return jsonResponse({ ok: true, action: existingRow ? "updated" : "created", row });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}
