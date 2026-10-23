# GHL and Google Sheets readiness records

Both readiness forms submit to `POST /api/lead`. The server validates every answer, recalculates the result, creates a unique `submissionId`, and sends the complete record to `GHL_LEAD_WEBHOOK_URL`.

## Data flow and booking states

The website sends two event types to the same inbound webhook:

- `readiness_completed`: creates the assessment record with `bookingStatus` set to `Not started`.
- `booking_started`: fires when the user selects a booking button and changes the status to `Booking started`.

The GHL calendar creates the appointment itself. A separate **Customer Booked Appointment** workflow changes the status to `Booked`. If a person never opens the calendar, their assessment remains stored with `Not started`. If they open it but leave before choosing a slot, it remains `Booking started`.

The website carries only the opaque `submissionId` in the booking URL. Name and email are kept in session storage so they do not appear in the URL. The calendar page asks the customer to use the same email so HighLevel attaches the appointment to the assessment contact.

## GHL custom fields

Create these contact custom fields before mapping the workflow:

| Field | Suggested type |
| --- | --- |
| Readiness Submission ID | Single line text |
| Checker Type | Single line text |
| Readiness Outcome | Single line text |
| Recommended Package | Single line text |
| Strong Areas | Multi-line text |
| Areas to Strengthen | Multi-line text |
| How We Can Help | Multi-line text |
| Assessment Submitted At | Date/time or text |
| Booking Status | Dropdown: Not started, Booking started, Booked, Cancelled |
| Booking Clicked At | Date/time or text |
| Appointment Start | Date/time or text |

## Workflow A: readiness and booking intent

1. Use an **Inbound Webhook** trigger and copy its URL into the Vercel environment variable `GHL_LEAD_WEBHOOK_URL`.
2. Add an If/Else branch using `eventType`.
3. For `readiness_completed`, create or update the contact using `email` and map all readiness custom fields.
4. Add a contact note containing `resultSummary`, `strongAreasText`, `areasToStrengthenText`, `howWeCanHelpText`, and `answersSummary`.
5. Add a `readiness-pr` or `readiness-citizenship` tag based on `checkerType`.
6. Use **Google Sheets: Lookup Spreadsheet Row** with `submissionId`. Enable row creation when no match exists and map the columns below.
7. For `booking_started`, find or update the contact using `email`, then map Submission ID, Booking Status, Booking Clicked At, and Recommended Package from the webhook. Page URL is optional and can be skipped.

## Workflow B: completed calendar booking

1. Create a **Customer Booked Appointment** workflow filtered to calendar `BmjSgje9UxMhSTAWMR9b`.
2. Update Booking Status to `Booked` and Appointment Start from the appointment start-time value.
3. Add the `readiness-booked` tag.
4. Use **Google Sheets: Lookup Spreadsheet Row** where Submission ID equals the contact's Readiness Submission ID.
5. Use **Update Spreadsheet Row Using Lookup** to write Booking Status and Appointment Start into the existing row.

An optional Appointment Status workflow can apply the same lookup/update process for cancellations and reschedules.

Use `submissionId` as the deduplication key when a webhook is retried.

## Suggested Google Sheets columns

| Column | Webhook field |
| --- | --- |
| Submission ID | `submissionId` |
| Submitted at | `receivedAt` |
| Checker | `checkerType` |
| First name | `firstName` |
| Email | `email` |
| Outcome | `outcome` |
| Strong areas | `strongAreasText` |
| Areas to strengthen | `areasToStrengthenText` |
| How we can help | `howWeCanHelpText` |
| Recommended package | `recommendedPackage` |
| Package price | `recommendedPackagePrice` |
| Recommendation reason | `recommendedPackageReason` |
| Answers | `answersSummary` |
| Full answers JSON | `answersJson` |
| Consent date | `consentAt` |
| Booking status | `bookingStatus` |
| Booking clicked at | `bookingClickedAt` |
| Appointment start | Set by the booked-appointment workflow |
| Page URL | `pageUrl` |
| Referrer | `referrer` |
| UTM source | `utmSource` |
| UTM medium | `utmMedium` |
| UTM campaign | `utmCampaign` |
| Schema version | `schemaVersion` |

The fields ending in `Text` are flat strings designed for GHL custom fields and spreadsheet cells. The array fields and `answersJson` preserve the structured record for later reporting or migration.

## Email notifications to getsgpr@gmail.com

### Checker submissions (Apps Script)

`integrations/google-sheets/Code.gs` emails `NOTIFY_EMAIL` each time it creates a new row for a PR readiness, citizenship readiness or eligibility submission. Updates to an existing row (booking started, appointment booked, webhook retries) do not send email. Reply-to is set to the lead's email address. If the email fails, the row is still saved and the response reports `emailed: false`.

To deploy a change to `Code.gs`:

1. Open the spreadsheet, then **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with the file from this repository and save.
3. Choose `sendTestNotification` in the function menu and press **Run**. Approve the Gmail permission prompt. A test email should arrive at getsgpr@gmail.com.
4. **Deploy → Manage deployments**, edit the existing web app deployment, set **Version** to **New version**, and **Deploy**. Keep the same deployment so the URL in `GOOGLE_SHEETS_WEBHOOK_URL` does not change.

Apps Script on a consumer Gmail account can send about 100 emails a day.

### Contact Us form (GHL)

The contact page embeds GHL form `z6a7dZmxkVc4lU8nayfJ` ("Contact Us Form"), so its submissions go to GHL, not the website or Apps Script. Notify from GHL:

1. In the GetSGPR sub-account, open **Automation → Workflows → Create Workflow → Start from scratch**.
2. Trigger: **Form Submitted**, filter **Form is Contact Us Form**.
3. Action: **Send Internal Notification**, type **Email**, recipient **Custom email** `getsgpr@gmail.com`. Subject: `New Contact Us enquiry: {{contact.name}}`. Include `{{contact.name}}`, `{{contact.email}}`, `{{contact.phone}}` and the form's message field in the body.
4. Optional: add **Google Sheets → Create Spreadsheet Row** if contact enquiries should also be stored in a sheet.
5. Save and **Publish**.
