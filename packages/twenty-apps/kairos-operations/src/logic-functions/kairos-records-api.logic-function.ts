import { defineLogicFunction } from 'twenty-sdk/define';
import { type RoutePayload } from 'twenty-sdk/logic-function';

import { kairosId } from 'src/constants/kairos-id';
import { KairosOperationsService } from 'src/domain/kairos-operations-service';
import {
  type BookingInput,
  type CommunicationInput,
  type ContactMethodInput,
  type ContactSnapshotInput,
  type PersonInput,
  type PropertyInput,
  type ServiceEventInput,
  type SourceRecordInput,
} from 'src/domain/types';
import { CoreApiRecordsRepository } from 'src/runtime/core-api-records-repository';

type RecordsRequest = {
  operation?: string;
  input?: unknown;
};

const handler = async (event: RoutePayload<RecordsRequest>) => {
  const operation = event.body?.operation;
  const input = event.body?.input;
  if (typeof operation !== 'string' || input === null || typeof input !== 'object') {
    throw new Error('operation and input are required');
  }

  const service = new KairosOperationsService(new CoreApiRecordsRepository());
  switch (operation) {
    case 'upsertPerson':
      return { ok: true, record: await service.upsertPerson(input as PersonInput) };
    case 'upsertProperty':
      return {
        ok: true,
        record: await service.upsertProperty(input as PropertyInput),
      };
    case 'upsertBooking':
      return { ok: true, record: await service.upsertBooking(input as BookingInput) };
    case 'upsertBookingContactMethod':
      return {
        ok: true,
        record: await service.upsertBookingContactMethod(
          input as ContactMethodInput,
        ),
      };
    case 'reconcileBookingContactMethods':
      return {
        ok: true,
        record: await service.reconcileBookingContactMethods(
          input as ContactSnapshotInput,
        ),
      };
    case 'setPreferredContact': {
      const preference = input as { bookingId?: string; contactMethodId?: string };
      if (!preference.bookingId || !preference.contactMethodId) {
        throw new Error('bookingId and contactMethodId are required');
      }
      return {
        ok: true,
        record: await service.setPreferredContact(
          preference.bookingId,
          preference.contactMethodId,
        ),
      };
    }
    case 'upsertServiceEvent':
      return {
        ok: true,
        record: await service.upsertServiceEvent(input as ServiceEventInput),
      };
    case 'completeServiceEventById': {
      const completion = input as { eventId?: string; expectedStartsAt?: string };
      if (!completion.eventId || !completion.expectedStartsAt) {
        throw new Error('eventId and expectedStartsAt are required');
      }
      return {
        ok: true,
        record: await service.completeServiceEventById(
          completion.eventId,
          completion.expectedStartsAt,
        ),
      };
    }
    case 'confirmWelcomeSent': {
      const confirmation = input as {
        eventId?: string;
        expectedStartsAt?: string;
        confirmedAt?: string;
        activationWatermarkMessageId?: number;
      };
      if (
        !confirmation.eventId ||
        !confirmation.expectedStartsAt ||
        !confirmation.confirmedAt
        || !Number.isSafeInteger(confirmation.activationWatermarkMessageId)
      ) {
        throw new Error('eventId, expectedStartsAt, confirmedAt, and activationWatermarkMessageId are required');
      }
      return {
        ok: true,
        ...(await service.confirmWelcomeSent(
          confirmation.eventId,
          confirmation.expectedStartsAt,
          confirmation.confirmedAt,
          confirmation.activationWatermarkMessageId as number,
        )),
      };
    }
    case 'upsertSourceRecord':
      return {
        ok: true,
        record: await service.upsertSourceRecord(input as SourceRecordInput),
      };
    case 'createCommunication':
      return {
        ok: true,
        record: await service.createCommunication(input as CommunicationInput),
      };

    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
};

export default defineLogicFunction({
  universalIdentifier: kairosId('logicFunction.recordsApi'),
  name: 'kairos-records-api',
  description:
    'Authenticated idempotent mutation boundary for Kairos operational records.',
  timeoutSeconds: 30,
  handler,
  httpRouteTriggerSettings: {
    path: '/kairos/records',
    httpMethod: 'POST',
    isAuthRequired: true,
  },
});