import { defineLogicFunction } from 'twenty-sdk/define';
import { type RoutePayload } from 'twenty-sdk/logic-function';

import { kairosId } from 'src/constants/kairos-id';
import { KairosOperationsService } from 'src/domain/kairos-operations-service';
import { CoreApiRecordsRepository } from 'src/runtime/core-api-records-repository';

type QueryRequest = {
  operation?: string;
  bookingId?: string;
  threadId?: string;
  timeZone?: string;
  hours?: number;
  limit?: number;
  startsAt?: string;
  endsAt?: string;
  sender?: string;
  receivedAfter?: string;
  at?: string;
};

const handler = async (event: RoutePayload<QueryRequest>) => {
  const request = event.body ?? {};
  const service = new KairosOperationsService(new CoreApiRecordsRepository());
  switch (request.operation) {
    case 'getTomorrowCheckins':
      return {
        ok: true,
        records: await service.getTomorrowCheckins(
          request.timeZone ?? 'Europe/Lisbon',
        ),
      };
    case 'getIncompleteBookings':
      return { ok: true, records: await service.getIncompleteBookings() };
    case 'getUpcomingEvents':
      return {
        ok: true,
        records: await service.getUpcomingEvents(request.hours ?? 24),
      };
    case 'getCheckBalance':
      return {
        ok: true,
        balance: await service.getCheckBalance(
          request.timeZone ?? 'Europe/Lisbon',
        ),
      };
    case 'getServiceEvents':
      if (!request.startsAt || !request.endsAt) {
        throw new Error('startsAt and endsAt are required');
      }
      return {
        ok: true,
        records: await service.getServiceEvents(
          request.startsAt,
          request.endsAt,
        ),
      };
    case 'getOperationsTimeline':
      if (!request.startsAt || !request.endsAt) {
        throw new Error('startsAt and endsAt are required');
      }
      return {
        ok: true,
        timeline: await service.getOperationsTimeline(
          request.startsAt,
          request.endsAt,
        ),
      };
    case 'getRecentEmails':
      return {
        ok: true,
        records: await service.getRecentEmails(
          request.limit ?? 25,
          request.sender,
          request.receivedAfter,
        ),
      };
    case 'getEmailThread':
      if (!request.threadId) throw new Error('threadId is required');
      return {
        ok: true,
        record: await service.getEmailThread(request.threadId),
      };
    case 'getPreferredContact':
      if (!request.bookingId) throw new Error('bookingId is required');
      return {
        ok: true,
        record: await service.getPreferredContact(request.bookingId),
      };
    case 'getActiveWhatsappContactWatches':
      return {
        ok: true,
        records: await service.getActiveWhatsappContactWatches(
          request.at ?? new Date().toISOString(),
        ),
      };
    default:
      throw new Error(`Unsupported operation: ${request.operation ?? ''}`);
  }
};

export default defineLogicFunction({
  universalIdentifier: kairosId('logicFunction.queryApi'),
  name: 'kairos-query-api',
  description:
    'Authenticated operational queries for bookings, calendar events, contact resolution, and read-only email access.',
  timeoutSeconds: 30,
  handler,
  httpRouteTriggerSettings: {
    path: '/kairos/query',
    httpMethod: 'POST',
    isAuthRequired: true,
  },
});