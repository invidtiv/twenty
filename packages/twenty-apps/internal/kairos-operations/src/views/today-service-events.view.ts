import {
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import { SERVICE_EVENT, viewEntityId, viewId } from 'src/constants/identifiers';

export const TODAY_SERVICE_EVENTS_VIEW_ID = viewId('todayServiceEvents');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('todayServiceEvents', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: TODAY_SERVICE_EVENTS_VIEW_ID,
  name: 'Today',
  objectUniversalIdentifier: SERVICE_EVENT.object,
  icon: 'IconCalendarDue',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    field('title', SERVICE_EVENT.fields.title, 0, 183),
    field('startsAt', SERVICE_EVENT.fields.startsAt, 1, 170),
    field('endsAt', SERVICE_EVENT.fields.endsAt, 2, 170),
    field('booking', SERVICE_EVENT.fields.booking, 3, 200),
    field('eventType', SERVICE_EVENT.fields.eventType, 4, 190),
    field('status', SERVICE_EVENT.fields.status, 5, 150),
    field('location', SERVICE_EVENT.fields.location, 6, 220),
  ],
  filters: [
    {
      universalIdentifier: viewEntityId('todayServiceEvents', 'filter.date'),
      fieldMetadataUniversalIdentifier: SERVICE_EVENT.fields.startsAt,
      operand: ViewFilterOperand.IS_TODAY,
      value: '',
    },
    {
      universalIdentifier: viewEntityId('todayServiceEvents', 'filter.status'),
      fieldMetadataUniversalIdentifier: SERVICE_EVENT.fields.status,
      operand: ViewFilterOperand.IS_NOT,
      value: ['CANCELLED', 'COMPLETED'],
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('todayServiceEvents', 'sort.startsAt'),
      fieldMetadataUniversalIdentifier: SERVICE_EVENT.fields.startsAt,
      direction: ViewSortDirection.ASC,
    },
  ],
});
