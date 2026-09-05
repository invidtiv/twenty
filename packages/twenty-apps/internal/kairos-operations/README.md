# Kairos Operations for Twenty

This Twenty application configures the isolated **Kairos Operations** workspace as the durable system of record for bookings, people, properties, booking-scoped contacts, operational events, communications, and ingestion provenance. Kairos remains responsible for ingestion, reasoning, reconciliation, reminders, calls, and transient source state.

The implementation is pinned to `twenty-sdk` and `twenty-client-sdk` `2.29.0`, matching the installed `twenty-app-dev` server (`APP_VERSION=v2.29.0`). Twenty 2.29 generates custom-object system fields server-side; using an older SDK produces an invalid manifest.

## Contents

- [Data model](docs/DATA_MODEL.md)
- [Integration and credential setup](docs/INTEGRATION.md)
- [Machine-readable schema summary](schema/kairos-operations.schema.json)
- [Sample ingestion fixture](samples/sample-ingestion.json)
- [Live verification script](scripts/verify-live.mjs)
- [Hermes MCP adapter](integrations/hermes/twenty_kairos_mcp.py)

## Apply and verify

```bash
yarn install
yarn test
yarn lint
yarn typecheck
yarn twenty apply
```

For a live acceptance pass, create a workspace-scoped API key with the shipped **Kairos Operations API** role, keep the token in a secret store, and run:

```bash
TWENTY_BASE_URL=http://localhost:2020 \
TWENTY_API_KEY='replace-from-secret-store' \
yarn verify:live
```

The verifier creates sample records through the authenticated application routes, repeats the stable-key upserts, checks that TalkGuest and WhatsApp contacts remain separate, switches the preferred contact without deleting provenance, and confirms tomorrow/event queries against Twenty itself.

No credentials, cookies, OTPs, Playwright state, voice-bridge secrets, or Tailscale keys belong in this directory or in Twenty records.

The Hermes adapter provides scoped booking, operational-calendar, and read-only synced-email tools without exposing a generic Twenty API surface to the agent.
