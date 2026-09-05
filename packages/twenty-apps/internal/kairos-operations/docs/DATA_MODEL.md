# Kairos Operations data model

## Boundary

External systems feed Kairos. Kairos normalizes and reasons over those inputs, then writes durable facts to Twenty. Twenty is canonical for operational records; Google Calendar is designed as a future projection from Service Events.

Twenty does not store browser sessions, source credentials, email OTP secrets, Android Voice Bridge credentials, Tailscale keys, transient reminder state, or agent memory. Property access material should use `accessSecretReference` when a dedicated secret store is appropriate.

## Identity and idempotency

| Record | Stable upsert key |
| --- | --- |
| Person | `globalContactId` (opaque UUID; never derived from phone/email) |
| Property | `externalPropertyId` |
| Booking | `sourceKey = SOURCE:externalBookingId` |
| Booking Contact Method | `sourceContactKey = bookingId:SOURCE:TYPE:sourceSlot` |
| Service Event | `sourceEventKey = bookingId:SOURCE:sourceSlot` |
| Source Record | `sourceKey = SOURCE:externalId` |
| Communication | `communicationKey = CHANNEL:externalId` when an external ID exists |

These keys let Kairos reprocess the same source payload without creating duplicate bookings, events, or source records. Cross-workspace synchronization is deliberately absent; a future synchronizer must opt in and use `globalContactId`.

## Objects

### Person (standard Twenty object)

Person is extended with `globalContactId`, `personType`, `preferredLanguage`, `preferredContactMethod`, `contactNotes`, and `lastVerifiedAt`, plus reverse relations to guest bookings, booking contact methods, and communications. Person phone/email fields are fallback contacts only—not booking authority.

### Property

Stores the operational location, external identity, map link, normal/access notes, active state, timezone, metadata, and a secret reference. The API field is `propertyAddress` because `address` is reserved in Twenty 2.29; the UI label remains **Address**.

### Booking

The central record links a guest Person, Property, booking-specific contacts, a preferred contact pointer, Service Events, Communications, Source Records, and standard Tasks. It stores source identity, stay/arrival timing, timezone, status, readiness, risk/review state, missing information, summaries, instructions, and raw structured metadata.

`aiSummary` is a convenience field. It is never authoritative over the linked source and operational records.

### Booking Contact Method

Every source/contact slot is a separate record. A TalkGuest number and a WhatsApp number therefore cannot overwrite one another. Each record retains source, optional Source Record, confidence, priority, validity window, verification time, and notes.

Selection order is:

1. Explicit manual booking preference.
2. Confirmed manual contact.
3. Confirmed WhatsApp operational contact.
4. Another confirmed booking contact.
5. TalkGuest contact.
6. Likely contact.
7. Unverified contact.
8. Materialized Person default fallback.
9. No action; flag the booking for review.

`preferenceMode` distinguishes a human decision (`MANUAL`) from a computed choice (`POLICY`). Re-ingestion does not displace a manual choice.

### Service Event

One Booking has many events: contact deadline, day-before preparation, check-in, key handover, follow-up, check-out, or custom. Calendar-provider IDs and sync status are already present for a later Google Calendar projection. Twenty remains canonical.

### Communication

Stores durable operational summaries and action state rather than requiring indefinite retention of every raw message. It can link to the Person and exact Source Record.

### Source Record

Stores ingestion provenance: source/external ID, timestamps, parse state, hash, payload text/metadata, parser version, and error. Stable source keys make parser reprocessing auditable and idempotent.

## Automation

- `on-booking-changed` recalculates readiness and upserts the expected contact-deadline, preparation, check-in, and check-out events by stable keys.
- `on-source-record-changed` flags parsing conflicts/errors or requests booking reconciliation; it never applies a lower-confidence value over a higher-confidence value.
- The records route exposes the supported idempotent mutation operations.
- The query route exposes tomorrow, incomplete-booking, upcoming-event, and preferred-contact queries.

Voice scheduling stays in Kairos. At 19:00 Europe/Lisbon, Kairos should query tomorrow and call only when relevant records exist. One-hour calls should query upcoming events and use Kairos acknowledgement state to suppress duplicates.

## Views

The application installs Tomorrow's Check-ins, Today, Operations Calendar, Needs Information, Ready, Problems / Human Review, Properties, Booking Contact Methods, Communications, and Source Records. Operations Calendar is a monthly Service Event calendar keyed by `startsAt`; event cards retain the title, booking, event type, status, start/end times, and location. The missing-information and problem views include review/conflict conditions in addition to readiness state.
