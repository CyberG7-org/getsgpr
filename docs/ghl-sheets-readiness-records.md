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

## Email notifications to getsgpr@gmail.com (Make)

Two Make scenarios in team "My Team" send the notifications from the getsgpr@gmail.com Gmail connection.

### Checker submissions

- Webhook: **GetSGPR - checker submissions**. Its URL is stored in the Vercel variable `MAKE_LEAD_WEBHOOK_URL`.
- `/api/lead` posts every new PR readiness, citizenship readiness and eligibility record there. Booking clicks and appointment updates do not, so they never send email.
- The website builds both emails in `lib/emails.ts` with one branded layout (logo, name, footer) and posts them as `teamEmail` and `customerEmail` (each `{ subject, html }`). Make only delivers them, so edit the emails in code, not in Make.
- Scenario **GetSGPR - checker submission emails** then sends the customer their result. It has the result, recommended package, and WhatsApp and "Book a free call" buttons; the booking button links to `/book-a-call?rid=<submissionId>` so the appointment joins the same record.

### Contact Us form

The contact page embeds GHL form `z6a7dZmxkVc4lU8nayfJ` ("Contact Us Form"), so its submissions only reach GHL. Forward them to Make:

1. In the GetSGPR sub-account, open **Automation → Workflows → Create Workflow → Start from scratch**.
2. Trigger: **Form Submitted**, filter **Form is Contact Us Form**.
3. Action: **Custom Webhook**, method **POST**, URL = the **GetSGPR - contact form** webhook URL in Make, body type JSON:

   ```json
   {
     "name": "{{contact.name}}",
     "email": "{{contact.email}}",
     "phone": "{{contact.phone}}",
     "message": "<insert the form's message field from the custom values picker>"
   }
   ```

4. Save and **Publish**, then submit a test enquiry and check the getsgpr@gmail.com inbox.

Make scenario **GetSGPR - contact form** then:

1. Adds a row to the **Contact Us** tab of the "GetSGPR | Review Form" spreadsheet (columns: Submitted at (SGT), Name, Email, Phone, Message), using the cyberg7.llp@gmail.com Google connection. Values are written as raw text, so a message starting with `=` is never run as a formula. Keep that tab's name and column order, or update the scenario's Add a Row step to match.
2. Sends the branded notification to getsgpr@gmail.com. Its HTML is generated from `brandedEmail()` in `lib/emails.ts`; regenerate it in Make if the shared layout changes.
