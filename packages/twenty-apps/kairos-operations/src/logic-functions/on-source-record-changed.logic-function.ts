import {
  type DatabaseEventPayload,
  defineLogicFunction,
} from 'twenty-sdk/define';

import { kairosId } from 'src/constants/kairos-id';
import { KairosOperationsService } from 'src/domain/kairos-operations-service';
import { CoreApiRecordsRepository } from 'src/runtime/core-api-records-repository';

type SourceRecordEventData = {
  bookingId?: string;
  sourceKey?: string;
  parseStatus?: string;
  error?: string;
};

const handler = async (event: DatabaseEventPayload) => {
  if (!['sourceRecord.created', 'sourceRecord.updated'].includes(event.name)) {
    return { ignored: true };
  }
  const properties = event.properties as { after?: SourceRecordEventData };
  const sourceRecord = properties.after;
  if (!sourceRecord?.bookingId) return { linked: false };

  const service = new KairosOperationsService(new CoreApiRecordsRepository());
  if (
    sourceRecord.parseStatus === 'ERROR' ||
    sourceRecord.parseStatus === 'NEEDS_REVIEW'
  ) {
    await service.flagBookingForSourceReview(
      sourceRecord.bookingId,
      sourceRecord.error ??
        `${sourceRecord.sourceKey ?? 'Source record'} requires reconciliation`,
    );
    return { linked: true, needsHumanReview: true };
  }
  await service.reconcileBooking(sourceRecord.bookingId);
  return { linked: true, reconciliationRequested: true };
};

export default defineLogicFunction({
  universalIdentifier: kairosId('logicFunction.onSourceRecordChanged'),
  name: 'on-source-record-changed',
  description:
    'Preserves source provenance and requests booking reconciliation without applying source values.',
  timeoutSeconds: 30,
  handler,
  databaseEventTriggerSettings: {
    eventName: 'sourceRecord.*',
    updatedFields: ['booking', 'parseStatus', 'error', 'contentHash'],
  },
});