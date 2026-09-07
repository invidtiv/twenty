const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildSync } = require('esbuild');
const { join } = require('node:path');
const output = buildSync({ entryPoints: [join(__dirname, '../src/domain/kairos-operations-service.ts')], bundle: true, platform: 'node', format: 'cjs', write: false, tsconfig: join(__dirname, '../tsconfig.json') }).outputFiles[0].text;
const moduleUnderTest = { exports: {} };
new Function('module', 'exports', 'require', output)(moduleUnderTest, moduleUnderTest.exports, require);
const { KairosOperationsService } = moduleUnderTest.exports;
const id = '11111111-2222-4333-8444-555555555555';
const arrival = '2032-04-12T13:00:00.000Z';
const matches = (row, filter = {}) => Object.entries(filter).every(([key, value]) => {
  if (key === 'and') return value.every(part => matches(row, part));
  if (key === 'not') return !matches(row, value);
  if ('eq' in value) return row[key] === value.eq;
  if ('is' in value) return row[key] == null;
  if ('in' in value) return value.in.includes(row[key]);
  throw new Error(`Unsupported test filter: ${JSON.stringify(filter)}`);
});
function setup() {
  const rows = {
    bookings: [{ id, bookingId: id, name: 'Synthetic Guest Example', sourceKey: 'TALKGUEST:synthetic-booking', checkinAt: null, timezone: 'Europe/Lisbon', status: 'CONFIRMED', rawMetadata: { talkguestCheckinTimeKnown: false, talkguestCheckinEventAt: '2032-04-12T11:00:00.000Z' } }],
    serviceEvents: [], bookingContactMethods: [], people: [],
  };
  const repository = {
    async findMany(object, options) { return structuredClone(rows[object].filter(row => matches(row, options.filter))); },
    async update(object, recordId, data) {
      const row = rows[`${object}s`].find(row => row.id === recordId);
      assert.ok(row); Object.assign(row, data); return structuredClone(row);
    },
    async updateMany(object, filter, data) {
      const found = rows[object].filter(row => matches(row, filter));
      for (const row of found) Object.assign(row, data);
      return structuredClone(found);
    },
    async upsert(object, data) {
      const key = object === 'bookings' ? 'sourceKey' : 'sourceEventKey';
      let row = rows[object].find(row => row[key] === data[key]);
      if (!row) { row = { id: `event-${rows[object].length}` }; rows[object].push(row); }
      Object.assign(row, data); return structuredClone(row);
    },
  };
  return { rows, repository, service: new KairosOperationsService(repository, () => new Date('2032-04-11T10:00:00Z')) };
}
test('cancelled bookings and cancellation racing confirmation reject without arrival writes', async () => {
  for (const race of [false, true]) {
    const { service, rows, repository } = setup();
    if (!race) rows.bookings[0].status = 'CANCELLED';
    else {
      const update = repository.updateMany;
      repository.updateMany = async (object, filter, data) => {
        if (object === 'bookings' && data.arrivalRevision) rows.bookings[0].status = 'CANCELLED';
        return update(object, filter, data);
      };
    }
    await assert.rejects(service.confirmBookingArrival(input), /cancelled|conflict/i);
    assert.equal(rows.bookings[0].checkinAt, null);
    assert.equal(rows.bookings[0].arrivalRevision, undefined);
    assert.equal(rows.serviceEvents.length, 0);
  }
});
const input = { bookingId: id, expectedArrivalRevision: null, confirmationId: 'synthetic-booking-arrival-20320412-1400', checkinAt: arrival, timezone: 'Europe/Lisbon', confirmedBy: 'operator', evidence: 'Synthetic operator confirmation for fixture arrival on 12 April at 14:00 Lisbon' };

test('arrival requires an explicit ISO timezone offset before writes', async () => {
  for (const checkinAt of ['2032-04-12T14:00:00', '2032-04-12']) {
    const { service, rows } = setup();
    await assert.rejects(service.confirmBookingArrival({ ...input, checkinAt }), /offset/i);
    assert.equal(rows.bookings[0].checkinAt, null);
  }
});

test('notes clearing atomically preserves completed and cancelled event notes', async () => {
  for (const status of ['COMPLETED', 'CANCELLED']) {
    const { service, rows, repository } = setup();
    await service.reconcileBooking(id);
    const checkin = rows.serviceEvents.find(event => event.eventType === 'CHECK_IN');
    const notes = checkin.notes;
    const update = repository.updateMany;
    repository.updateMany = async (object, filter, data) => {
      if (object === 'serviceEvents' && data.notes === null) checkin.status = status;
      return update(object, filter, data);
    };
    await service.confirmBookingArrival(input);
    assert.equal(checkin.status, status);
    assert.equal(checkin.notes, notes);
  }
});

test('authenticated query exposes all booking contacts read-only', () => {
  const api = require('node:fs').readFileSync(join(__dirname, '../src/logic-functions/kairos-query-api.logic-function.ts'), 'utf8');
  assert.ok(api.includes("case 'getBookingContacts':"));
  assert.ok(api.includes('records: await service.getContactRecords(request.bookingId)'));
  assert.ok(api.includes('isAuthRequired: true'));
});

test('Twenty empty-string null text revision accepts expected null', async () => {
  const { service, rows, repository } = setup();
  const find = repository.findMany;
  repository.findMany = async (...args) => (await find(...args)).map(row => args[0] === 'bookings' && !row.arrivalRevision ? { ...row, arrivalRevision: '' } : row);
  await service.confirmBookingArrival(input);
  assert.equal(rows.bookings[0].checkinAt, arrival);
});

test('timeline selects current arrival revision and provenance', async () => {
  const { service, rows, repository } = setup();
  await service.confirmBookingArrival(input);
  const find = repository.findMany;
  service.getServiceEvents = async () => structuredClone(rows.serviceEvents);
  repository.findMany = async (object, options, selection) => (await find(object, options)).map(row => Object.fromEntries(Object.keys(selection).map(key => [key, row[key]])));
  const timeline = await service.getOperationsTimeline('2032-04-11T00:00:00Z', '2032-04-14T00:00:00Z');
  assert.equal(timeline.bookings[0].arrivalRevision, input.confirmationId);
  assert.equal(timeline.bookings[0].operatorArrivalConfirmation.evidence, input.evidence);
});

test('app contract declares durable fields and exposes authenticated arrival operation', () => {
  const { readFileSync } = require('node:fs');
  const object = readFileSync(join(__dirname, '../src/objects/booking.object.ts'), 'utf8');
  const utils = readFileSync(join(__dirname, '../src/domain/utils.ts'), 'utf8');
  for (const field of ['sourceCheckinAt', 'arrivalRevision', 'operatorArrivalConfirmation']) {
    assert.ok(object.includes(`"name": "${field}"`), `${field} must be declared`);
    assert.ok(utils.includes(`${field}: true`), `${field} must be selected`);
  }
  const api = readFileSync(join(__dirname, '../src/logic-functions/kairos-records-api.logic-function.ts'), 'utf8');
  assert.ok(api.includes("case 'confirmBookingArrival':"));
  assert.ok(api.includes('isAuthRequired: true'));
});

test('completed contact deadline keeps its occurrence time and canonical watch through correction', async () => {
  const { service, rows } = setup();
  await service.reconcileBooking(id);
  const deadline = rows.serviceEvents.find(event => event.eventType === 'GUEST_CONTACT_DEADLINE');
  deadline.status = 'COMPLETED';
  const originalStartsAt = deadline.startsAt;
  rows.whatsappContactWatches = [{ id: 'watch', bookingId: id, serviceEventId: deadline.id, status: 'ACTIVE', activatedAt: '2032-04-11T10:00:00Z', activationWatermarkMessageId: 123 }];
  const watch = structuredClone(rows.whatsappContactWatches);
  await service.confirmBookingArrival(input);
  assert.equal(deadline.startsAt, originalStartsAt);
  assert.equal(deadline.status, 'COMPLETED');
  assert.deepEqual(rows.whatsappContactWatches, watch);
  assert.equal(rows.serviceEvents.filter(event => event.eventType === 'GUEST_CONTACT_DEADLINE').length, 1);
});

test('stale reconciliation retries after a concurrent arrival confirmation', async () => {
  const { service, rows, repository } = setup();
  await service.reconcileBooking(id);
  const update = repository.updateMany;
  let raced = false;
  repository.updateMany = async (object, recordId, data) => {
    if (object === 'serviceEvents' && !raced) {
      raced = true;
      await service.confirmBookingArrival(input);
    }
    return update(object, recordId, data);
  };
  await service.reconcileBooking(id);
  assert.equal(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').startsAt, arrival);
  assert.doesNotMatch(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').title, /pending/);
});

test('reconciliation preserves terminal status and checkValue even on booking cancellation', async () => {
  const { service, rows } = setup();
  await service.confirmBookingArrival(input);
  const checkin = rows.serviceEvents.find(event => event.eventType === 'CHECK_IN');
  const deadline = rows.serviceEvents.find(event => event.eventType === 'GUEST_CONTACT_DEADLINE');
  Object.assign(checkin, { status: 'COMPLETED', checkValue: 30, kairosRemindersEnabled: false, notes: 'Operator completion evidence' });
  Object.assign(deadline, { status: 'CANCELLED', checkValue: 25 });
  await service.reconcileBooking(id);
  assert.equal(checkin.status, 'COMPLETED');
  assert.equal(deadline.status, 'CANCELLED');
  assert.equal(checkin.checkValue, 30);
  assert.equal(deadline.checkValue, 25);
  assert.equal(checkin.kairosRemindersEnabled, false);
  assert.equal(checkin.notes, 'Operator completion evidence');
  rows.bookings[0].status = 'CANCELLED';
  await service.reconcileBooking(id);
  assert.equal(checkin.status, 'COMPLETED');
  assert.equal(checkin.checkValue, 30);
});

test('ingestion racing with operator confirmation cannot write its stale arrival snapshot', async () => {
  const { service, rows, repository } = setup();
  const find = repository.findMany;
  let raced = false;
  repository.findMany = async (object, options) => {
    const snapshot = await find(object, options);
    if (object === 'bookings' && options.filter.sourceKey && !raced) {
      raced = true;
      await service.confirmBookingArrival(input);
    }
    return snapshot;
  };
  await service.upsertBooking({ source: 'TALKGUEST', externalBookingId: 'synthetic-booking', checkinAt: null });
  assert.equal(rows.bookings[0].checkinAt, arrival);
  assert.equal(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').startsAt, arrival);
});

test('confirmation is CAS guarded and retries preserve original provenance', async () => {
  const { service, rows } = setup();
  await service.confirmBookingArrival(input);
  const original = structuredClone(rows.bookings[0]);
  await service.confirmBookingArrival(input);
  assert.deepEqual(rows.bookings[0].operatorArrivalConfirmation, original.operatorArrivalConfirmation);
  await assert.rejects(service.confirmBookingArrival({ ...input, confirmationId: 'different', checkinAt: '2032-04-12T14:00:00Z' }), /conflict/i);
  await assert.rejects(service.confirmBookingArrival({ ...input, checkinAt: '2032-04-12T14:00:00Z' }), /conflict/i);
  assert.equal(rows.bookings[0].checkinAt, arrival);
});

test('source resync cannot erase confirmed arrival and retains incoming source values', async () => {
  const { service, rows } = setup();
  await service.confirmBookingArrival(input);
  await service.upsertBooking({ source: 'TALKGUEST', externalBookingId: 'synthetic-booking', checkinAt: null, timezone: 'UTC', rawMetadata: { talkguestCheckinTimeKnown: false, talkguestCheckinEventAt: '2032-04-12T11:00:00Z' } });
  assert.equal(rows.bookings[0].checkinAt, arrival);
  assert.equal(rows.bookings[0].timezone, 'Europe/Lisbon');
  assert.equal(rows.bookings[0].sourceCheckinAt, null);
  assert.equal(rows.bookings[0].rawMetadata.talkguestCheckinTimeKnown, false);
  assert.equal(rows.bookings[0].operatorArrivalConfirmation.evidence, input.evidence);
  assert.equal(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').startsAt, arrival);
});

test('operator confirmation durably updates booking with provenance and derives confirmed arrival', async () => {
  const { service, rows } = setup();
  assert.equal(typeof service.confirmBookingArrival, 'function');
  const result = await service.confirmBookingArrival(input);
  assert.equal(result.booking.checkinAt, arrival);
  assert.equal(result.booking.operatorArrivalConfirmation.confirmedBy, 'operator');
  assert.equal(result.booking.operatorArrivalConfirmation.evidence, input.evidence);
  assert.equal(result.booking.arrivalRevision, input.confirmationId);
  assert.equal(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').startsAt, arrival);
  assert.doesNotMatch(rows.serviceEvents.find(event => event.eventType === 'CHECK_IN').title, /pending/);
});
