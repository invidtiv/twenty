import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseUrl = (process.env.TWENTY_BASE_URL ?? 'http://localhost:2020').replace(
  /\/$/,
  '',
);
const apiKey = process.env.TWENTY_API_KEY;
if (!apiKey) {
  throw new Error('TWENTY_API_KEY must be supplied from a secret store');
}

const headers = {
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
};

const request = async (path, body) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok || result.ok === false || result.error) {
    throw new Error(`${path} failed (${response.status}): ${JSON.stringify(result)}`);
  }
  return result;
};

const mutate = (operation, input) =>
  request('/s/kairos/records', { operation, input });
const query = (body) => request('/s/kairos/query', body);
const graph = async (graphqlQuery) => {
  const result = await request('/graphql', { query: graphqlQuery });
  if (result.errors) throw new Error(JSON.stringify(result.errors));
  return result.data;
};

const localDateParts = Object.fromEntries(
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(new Date())
    .filter(({ type }) => ['year', 'month', 'day'].includes(type))
    .map(({ type, value }) => [type, Number(value)]),
);
const atUtc = (dayOffset, hour, minute = 0) =>
  new Date(
    Date.UTC(
      localDateParts.year,
      localDateParts.month - 1,
      localDateParts.day + dayOffset,
      hour,
      minute,
    ),
  ).toISOString();

const replacements = {
  '${NOW}': new Date().toISOString(),
  '${TOMORROW_15_UTC}': atUtc(1, 15),
  '${TOMORROW_16_UTC}': atUtc(1, 16),
  '${TOMORROW_16_30_UTC}': atUtc(1, 16, 30),
  '${TOMORROW_17_UTC}': atUtc(1, 17),
  '${THREE_DAYS_10_UTC}': atUtc(3, 10),
};
const fixtureText = await readFile(
  new URL('../samples/sample-ingestion.json', import.meta.url),
  'utf8',
);
const fixture = JSON.parse(
  Object.entries(replacements).reduce(
    (value, [placeholder, replacement]) =>
      value.replaceAll(placeholder, replacement),
    fixtureText,
  ),
);

const person = (await mutate('upsertPerson', fixture.person)).record;
const property = (await mutate('upsertProperty', fixture.property)).record;
const bookingInput = {
  ...fixture.booking,
  guestId: person.id,
  propertyId: property.id,
};
const firstBooking = (await mutate('upsertBooking', bookingInput)).record;
const repeatedBooking = (await mutate('upsertBooking', bookingInput)).record;
assert.equal(repeatedBooking.id, firstBooking.id, 'booking upsert duplicated a record');
assert.equal(
  repeatedBooking.bookingId,
  firstBooking.bookingId,
  'stable booking UUID changed during re-ingestion',
);

const talkGuestSource = (
  await mutate('upsertSourceRecord', {
    ...fixture.talkGuestSource,
    bookingId: firstBooking.id,
  })
).record;
const whatsAppSource = (
  await mutate('upsertSourceRecord', {
    ...fixture.whatsAppSource,
    bookingId: firstBooking.id,
  })
).record;

const talkGuestContact = (
  await mutate('upsertBookingContactMethod', {
    ...fixture.talkGuestContact,
    bookingId: firstBooking.id,
    personId: person.id,
    sourceRecordId: talkGuestSource.id,
  })
).record;
const whatsAppContact = (
  await mutate('upsertBookingContactMethod', {
    ...fixture.whatsAppContact,
    bookingId: firstBooking.id,
    personId: person.id,
    sourceRecordId: whatsAppSource.id,
    makePreferred: true,
  })
).record;
assert.notEqual(talkGuestContact.id, whatsAppContact.id);

const preferredWhatsApp = await query({
  operation: 'getPreferredContact',
  bookingId: firstBooking.id,
});
assert.equal(preferredWhatsApp.record.id, whatsAppContact.id);

await mutate('setPreferredContact', {
  bookingId: firstBooking.id,
  contactMethodId: talkGuestContact.id,
});
await mutate('upsertBookingContactMethod', {
  ...fixture.whatsAppContact,
  bookingId: firstBooking.id,
  personId: person.id,
  sourceRecordId: whatsAppSource.id,
});
const preferredAfterReingestion = await query({
  operation: 'getPreferredContact',
  bookingId: firstBooking.id,
});
assert.equal(preferredAfterReingestion.record.id, talkGuestContact.id);
assert.equal(preferredAfterReingestion.record.preferenceMode, 'MANUAL');

const firstManualEvent = (
  await mutate('upsertServiceEvent', {
    ...fixture.manualEvent,
    bookingId: firstBooking.id,
  })
).record;
const repeatedManualEvent = (
  await mutate('upsertServiceEvent', {
    ...fixture.manualEvent,
    bookingId: firstBooking.id,
  })
).record;
assert.equal(firstManualEvent.id, repeatedManualEvent.id);

const firstCommunication = (
  await mutate('createCommunication', {
    ...fixture.communication,
    bookingId: firstBooking.id,
    personId: person.id,
    rawSourceRecordId: whatsAppSource.id,
  })
).record;
const repeatedCommunication = (
  await mutate('createCommunication', {
    ...fixture.communication,
    bookingId: firstBooking.id,
    personId: person.id,
    rawSourceRecordId: whatsAppSource.id,
  })
).record;
assert.equal(firstCommunication.id, repeatedCommunication.id);

await mutate('upsertBooking', {
  source: fixture.booking.source,
  externalBookingId: fixture.booking.externalBookingId,
  sourceLastSeenAt: new Date().toISOString(),
});

const tomorrow = await query({
  operation: 'getTomorrowCheckins',
  timeZone: 'Europe/Lisbon',
});
assert.ok(
  tomorrow.records.some((record) => record.id === firstBooking.id),
  'tomorrow query did not return the sample booking',
);
const upcoming = await query({ operation: 'getUpcomingEvents', hours: 48 });
assert.ok(
  upcoming.records.some((record) => record.bookingId === firstBooking.id),
  'upcoming-event query did not return the sample booking events',
);
const incomplete = await query({ operation: 'getIncompleteBookings' });
assert.ok(
  incomplete.records.every((record) => record.id !== firstBooking.id),
  'complete sample booking was unexpectedly reported as incomplete',
);

const sourceKey = `TALKGUEST:${fixture.booking.externalBookingId}`;
const liveState = await graph(`query KairosLiveVerification {
  bookings(filter: { sourceKey: { eq: "${sourceKey}" } }) {
    totalCount
    edges { node { id bookingId sourceKey preferredContactMethodId } }
  }
  bookingContactMethods(filter: { bookingId: { eq: "${firstBooking.id}" } }) {
    totalCount
    edges { node { id contactValue source sourceRecordId isPreferred preferenceMode } }
  }
  serviceEvents(filter: { bookingId: { eq: "${firstBooking.id}" } }) {
    totalCount
    edges { node { id sourceEventKey eventType } }
  }
  sourceRecords(filter: { bookingId: { eq: "${firstBooking.id}" } }) {
    totalCount
    edges { node { id sourceKey } }
  }
  communications(filter: { bookingId: { eq: "${firstBooking.id}" } }) {
    totalCount
    edges { node { id communicationKey } }
  }
}`);

assert.equal(liveState.bookings.totalCount, 1);
assert.equal(liveState.bookingContactMethods.totalCount, 2);
assert.equal(liveState.sourceRecords.totalCount, 2);
assert.equal(liveState.communications.totalCount, 1);
assert.equal(liveState.serviceEvents.totalCount, 5);
assert.deepEqual(
  new Set(
    liveState.bookingContactMethods.edges.map(({ node }) => node.contactValue),
  ),
  new Set([
    fixture.talkGuestContact.contactValue,
    fixture.whatsAppContact.contactValue,
  ]),
);
assert.ok(
  liveState.bookingContactMethods.edges.every(({ node }) => node.sourceRecordId),
  'contact provenance was not retained',
);
assert.equal(
  new Set(
    liveState.serviceEvents.edges.map(({ node }) => node.sourceEventKey),
  ).size,
  5,
  'event keys are not unique',
);

console.log(
  JSON.stringify(
    {
      ok: true,
      bookingId: firstBooking.id,
      stableBookingUuid: firstBooking.bookingId,
      tomorrowCheckins: tomorrow.records.length,
      upcomingEvents: upcoming.records.filter(
        (record) => record.bookingId === firstBooking.id,
      ).length,
      contacts: liveState.bookingContactMethods.totalCount,
      sourceRecords: liveState.sourceRecords.totalCount,
      serviceEvents: liveState.serviceEvents.totalCount,
      communications: liveState.communications.totalCount,
      preferredContactSource: preferredAfterReingestion.record.source,
      preferredContactMode: preferredAfterReingestion.record.preferenceMode,
    },
    null,
    2,
  ),
);
