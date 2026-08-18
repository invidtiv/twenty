# Kairos Check Balance (25€/30€ per check-in)

Native Twenty CRM implementation of the Kairos check balance: a **Balance Entry**
ledger object, two **workflows**, and **dashboard/table pages**, plus the legacy
direct patches kept for the field computation and the agent query endpoint.

## Business rule

- A **check** = a Service Event with `eventType = CHECK_IN`.
- **25€** when the check-in starts before 21:00, **30€** from 21:00 onward
  (timezone **Europe/Lisbon**).
- The rate follows the **scheduled check-in time** (`startsAt`).
- **Scheduled check-ins count** in the month tally.
- A check belongs to the **month of its check-in date**.
- Cancelled and deleted events are excluded.

## Native implementation (the proper part)

1. **Kairos Balance SDK app** — a real Twenty app project at
   `packages/twenty-apps/kairos-balance` (built and synced with the official
   `twenty` CLI, manifest-driven, no hand patches):
   - `balanceEntry` object: name, sourceKey (unique upsert key), checkInId,
     amount (€), rate (DAY/NIGHT), status (EXPECTED/EARNED).
   - **Balance Entries** sidebar entry with the "All Balance Entries" table view.
   - **Kairos Dashboard** page (stat cards, monthly stacked bar chart,
     21:00-split donut, upcoming/completed check-in lists).
   - **Check Balance** page (totals + per-month table with per-check detail).
   - App role + variables (KAIROS_BALANCE_TIME_ZONE).
   - Rebuild/apply: `cd packages/twenty-apps/kairos-balance && yarn install &&
     NODE_OPTIONS=--preserve-symlinks yarn twenty apply -f` (remote `kairos`).
2. **Workflows** (native workspace automations, visible in Settings →
   Workflows, `04-create-workflows.sql`):
   - *Check-in created → Balance Entry*: on `serviceEvent.created` with
     eventType = CHECK_IN, an IF_ELSE on checkValue upserts a Balance Entry
     (25€ DAY or 30€ NIGHT, keyed by the check-in id).
   - *Check-in updated → Balance Entry*: on `serviceEvent.updated`
     (startsAt/checkValue/status changes) re-upserts the entry so
     reschedules before/after 21:00 are reflected automatically.
   - Verified end-to-end: creating a test check-in produced a 25€ DAY entry;
     rescheduling it past 21:00 updated it to 30€ NIGHT.
3. **Backfill** (`05-backfill-balance-entries.sql`): one entry per existing
   check-in (EARNED for completed, EXPECTED for scheduled).

## Kairos Operations app reconstruction (the root-cause fix)

The Kairos Operations app itself is now a proper source project at
`packages/twenty-apps/kairos-operations` — rebuilt from the live workspace
metadata and the compiled bundles:

- All 7 objects (serviceEvent, booking, property, sourceRecord,
  communication, bookingContactMethod, whatsappContactWatch) with every field,
  unique index, select option and relation.
- All 18 app views (columns, sorts, filters, the checkValue SUM aggregate) and
  the 13 sidebar items, the Operations Timeline page, roles + permissions, and
  the application variables.
- The 4 logic functions with the full domain service reconstructed from the
  built bundles — including `getCheckBalance` (now source-owned), the
  check-in completion flows and the booking reconciliation triggers.
- The Operations Timeline front component (contract, model, parts, timezone)
  rebuilt from the original source + bundle.

Applied with the official CLI: `cd packages/twenty-apps/kairos-operations &&
NODE_OPTIONS=--preserve-symlinks yarn twenty apply -f`. The plan is fully
converged: **"No changes. Twenty metadata matches your manifest."**

The previous hand-patched bundles in the container were replaced by the
source-built ones.

## Legacy direct patches (kept intentionally)

- `01-add-check-value-field.sql` — `checkValue` field + DB trigger computing
  25/30 from the scheduled time; visible on Service Events and used by the
  workflows. (Ideally moved into an app-owned computed field later.)
- `kairos-query-api.logic-function.patched.mjs` — adds `getCheckBalance` to
  the Kairos Operations app endpoint `/s/kairos/query` (the balance API used
  by the pages, `balance.sh`, and the agent; the new app cannot read
  serviceEvents because app tokens get an app-scoped schema).
- `06-remove-old-patched-pages.sql` — removes the earlier hand-registered
  pages (replaced by the app).

## Query the balance

```bash
./balance.sh
```

```bash
set -a; source /home/bsdev/.hermes/profiles/kairos/.env; set +a
curl -s -X POST http://127.0.0.1:2020/s/kairos/query \
  -H "Authorization: Bearer $TWENTY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"operation":"getCheckBalance"}'
```

## Known limitations

- Cancelling/deleting a check-in does not yet remove its Balance Entry
  (would need a third workflow on `serviceEvent.deleted`/status CANCELLED).
- `rate`/`status` labels use "·" instead of commas (CRM label validation).
- The Kairos Operations app source project is still reconstructed only in
  part; a full source rebuild of that app remains the deepest cleanup.

## Re-apply after container/image recreation

```bash
./reapply.sh
```