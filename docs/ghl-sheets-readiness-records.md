# GHL and Google Sheets readiness records

Both readiness forms submit to `POST /api/lead`. The server validates every answer, recalculates the result, creates a unique `submissionId`, and sends the complete record to `GHL_LEAD_WEBHOOK_URL`.

## Recommended GHL workflow

1. Use an **Inbound Webhook** trigger and copy its URL into the Vercel environment variable `GHL_LEAD_WEBHOOK_URL`.
2. Find or create the contact using `email`.
3. Store `checkerType`, `outcome`, `recommendedPackage`, `submissionId`, and `receivedAt` in contact custom fields.
4. Add a contact note containing `resultSummary`, `strongAreasText`, `areasToStrengthenText`, `howWeCanHelpText`, and `answersSummary`.
5. Add a Google Sheets workflow action and append one row using the columns below.

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
| Page URL | `pageUrl` |
| Referrer | `referrer` |
| UTM source | `utmSource` |
| UTM medium | `utmMedium` |
| UTM campaign | `utmCampaign` |
| Schema version | `schemaVersion` |

The fields ending in `Text` are flat strings designed for GHL custom fields and spreadsheet cells. The array fields and `answersJson` preserve the structured record for later reporting or migration.
