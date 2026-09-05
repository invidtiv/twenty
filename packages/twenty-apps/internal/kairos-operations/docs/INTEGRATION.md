# Kairos integration

## Authentication

Create an API key inside the **Kairos Operations** workspace and assign the shipped **Kairos Operations API** role. The role can read/update Person, Task, and the six Kairos objects. It has read-only access to synced email threads, messages, participants, and channel associations. It cannot send or modify email, delete records, change settings, or access unrelated objects.

Store the token in Kairos' secret mechanism as `TWENTY_API_KEY`. Do not commit it, copy it into CRM notes, or expose it to browser code. Use a workspace-specific `TWENTY_BASE_URL` so another Twenty workspace cannot be selected accidentally.

For the installed Twenty 2.29 route trigger implementation, application paths are served below `/s`:

- `POST /s/kairos/records`
- `POST /s/kairos/query`

Both routes require `Authorization: Bearer <token>` and validate that the token belongs to the same workspace as the application.

## Mutation request

```json
{
  "operation": "upsertBooking",
  "input": {
    "source": "TalkGuest",
    "externalBookingId": "TG-123",
    "propertyId": "twenty-record-uuid",
    "guestId": "twenty-record-uuid",
    "checkinAt": "2026-08-10T15:00:00Z",
    "timezone": "Europe/Lisbon"
  }
}
```

Supported mutations are `upsertPerson`, `upsertProperty`, `upsertBooking`, `upsertBookingContactMethod`, `setPreferredContact`, `upsertServiceEvent`, `upsertSourceRecord`, and `createCommunication`.

For source-specific contacts, always provide a stable `sourceSlot` such as `booking-primary` or `guest-operational`. Changing `contactValue` then updates that source slot without colliding with another source. Link `sourceRecordId` whenever the contact came from an ingested record.

## Query request

```json
{
  "operation": "getTomorrowCheckins",
  "timeZone": "Europe/Lisbon"
}
```

Supported queries are:

- `getTomorrowCheckins` with optional `timeZone`.
- `getIncompleteBookings`.
- `getUpcomingEvents` with `hours` from 1 through 744.
- `getServiceEvents` with required ISO `startsAt` and `endsAt` boundaries; the range is limited to 366 days.
- `getPreferredContact` with `bookingId`.
- `getRecentEmails` with `limit` from 1 through 100.
- `getEmailThread` with `threadId`.

All timestamps are ISO 8601. Tomorrow boundaries are calculated as calendar-day boundaries in the supplied IANA timezone, including daylight-saving changes.

## Hermes agent

The included `integrations/hermes/twenty_kairos_mcp.py` adapter exposes the authenticated routes as narrow MCP tools. Configure it in the Kairos Hermes profile without placing the token in YAML:

```yaml
mcp_servers:
  twenty-kairos:
    command: /home/bsdev/hermes-agent/venv/bin/python
    args:
      - /home/bsdev/TS/twenty/packages/twenty-apps/internal/kairos-operations/integrations/hermes/twenty_kairos_mcp.py
    env:
      TWENTY_BASE_URL: ${TWENTY_BASE_URL}
      TWENTY_API_KEY: ${TWENTY_API_KEY}
    timeout: 45
    connect_timeout: 30
```

Put `TWENTY_BASE_URL` and `TWENTY_API_KEY` in the selected Hermes profile's mode-0600 `.env` file. The MCP adapter never prints the credential. Calendar tools operate on canonical Kairos Service Events; an external Google Calendar connection is a later projection and is not required. Email tools are intentionally read-only and remain subject to Twenty's mailbox visibility policy.

## Source reconciliation rules

- Write the Source Record first, then link resulting records to its Twenty ID.
- Never reuse one source slot for two independent source values.
- Do not update Person defaults merely because a booking source reports another number.
- Treat lower-confidence source data as another candidate, not an overwrite.
- Use `setPreferredContact` for a human-confirmed choice; the record retains `MANUAL` preference through later source ingestion.
- Set Source Record parse state to `NEEDS_REVIEW` or `ERROR` when Kairos cannot reconcile safely; the booking is surfaced for human review.

## Verification

`yarn verify:live` uses only the documented routes plus a read-only GraphQL assertion. It requires an API token from the environment and never writes that token to output or disk. The sample fixture contains no real people, credentials, or access secrets.
