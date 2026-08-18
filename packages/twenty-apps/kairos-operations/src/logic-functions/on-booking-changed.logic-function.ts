import {
  type DatabaseEventPayload,
  defineLogicFunction,
} from 'twenty-sdk/define';

import { kairosId } from 'src/constants/kairos-id';
import { KairosOperationsService } from 'src/domain/kairos-operations-service';
import { CoreApiRecordsRepository } from 'src/runtime/core-api-records-repository';

const handler = async (event: DatabaseEventPayload) => {
  if (!['booking.created', 'booking.updated'].includes(event.name)) {
    return { ignored: true };
  }
  const service = new KairosOperationsService(new CoreApiRecordsRepository());
  const booking = await service.reconcileBooking(event.recordId);
  return { reconciled: true, bookingId: booking.id };
};

export default defineLogicFunction({
  universalIdentifier: kairosId('logicFunction.onBookingChanged'),
  name: 'on-booking-changed',
  description:
    'Recalculates readiness and idempotently creates expected service events.',
  timeoutSeconds: 30,
  handler,
  databaseEventTriggerSettings: {
    eventName: 'booking.*',
    updatedFields: [
      'source',
      'externalBookingId',
      'guest',
      'property',
      'checkinAt',
      'checkoutAt',
      'arrivalWindowStart',
      'arrivalWindowEnd',
      'timezone',
      'status',
    ],
  },
});