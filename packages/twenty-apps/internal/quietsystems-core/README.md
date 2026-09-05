# QuietSystems Core CRM

This Twenty app defines the QuietSystems CRM metadata layer:

- startup intake and triage records
- billing account tracking
- operations space assignments
- asset vault records for brand and styling files
- saved views and sidebar entries grouped under QuietSystems
- department roles for Sales, Finance, Ops, and Triage
- a record-page widget that keeps localization requirements visible where CRM operators work

Localization labels follow the active QuietSystems language profiles in `/home/bsdev/TS/incubator/localization`, including PT-PT pre-AO spellings such as `projecto`, `recepção`, and `acção`.

## Intake webhook: `/s/quietsystems/intake/application`

The `ingest-application-webhook` logic function declares the route path
`/quietsystems/intake/application`; Twenty exposes HTTP logic function routes
under `/s/`, so callers post to `/s/quietsystems/intake/application`.

It accepts unauthenticated `POST` payloads and persists data into one of two objects:

- Typeform/Webflow payloads -> `StartupApplication`
- Stripe checkout/payment events -> `BillingAccount`

Webhook secrets are optional but recommended:

- `QUIETSYSTEMS_TYPEFORM_WEBHOOK_SECRET`
- `QUIETSYSTEMS_WEBFLOW_WEBHOOK_SECRET`
- `QUIETSYSTEMS_STRIPE_WEBHOOK_SECRET`

Signature header names are:

- Typeform: `typeform-signature`, `x-typeform-signature`
- Webflow: `webflow-signature`, `x-webflow-signature`
- Stripe: `stripe-signature`

Smoke payloads

- Typeform-style (source auto-detected from `form_response`)

```json
{
  "form_response": {
    "submitted_at": "2026-05-26T20:15:00Z",
    "answers": [
      { "field": { "ref": "startup_name" }, "text": "North Harbor" },
      { "field": { "ref": "campaign" }, "text": "spring-promo" }
    ]
  }
}
```

- Webflow-style

```json
{
  "data": {
    "companyName": "North Harbor",
    "campaign": "organic",
    "languageProfile": "ES",
    "notes": "Initial demo request"
  },
  "source": "WEBFLOW"
}
```

- Stripe checkout/payment event

```json
{
  "id": "evt_123",
  "type": "invoice.paid",
  "data": {
    "object": {
      "object": "invoice",
      "id": "in_123",
      "customer": "cus_987",
      "status": "paid",
      "current_period_end": 1785170400,
      "metadata": {
        "startupName": "North Harbor"
      }
    }
  }
}
```

Behavior notes

- Invalid/missing required fields return `success: false` with `retryable: false`.
- Unsupported Stripe event types return `success: false` with `retryable: false` and can be replay-safe.
- Core API creation failures return `retryable: true`.
