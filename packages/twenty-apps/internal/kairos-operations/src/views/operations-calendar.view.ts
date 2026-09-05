import {
  ViewCalendarLayout,
  ViewFilterOperand,
  ViewType,
  defineView,
} from 'twenty-sdk/define';

import { SERVICE_EVENT, viewEntityId, viewId } from 'src/constants/identifiers';

export const OPERATIONS_CALENDAR_VIEW_ID = viewId('operationsCalendar');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('operationsCalendar', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: OPERATIONS_CALENDAR_VIEW_ID,
  name: 'Operations Calendar',
  objectUniversalIdentifier: SERVICE_EVENT.object,
  type: ViewType.CALENDAR,
  icon: 'IconCalendarEvent',
  position: 1,
  calendarLayout: ViewCalendarLayout.MONTH,
  calendarFieldMetadataUniversalIdentifier: SERVICE_EVENT.fields.startsAt,
  fields: [
    field('title', SERVICE_EVENT.fields.title, 0, 240),
    field('booking', SERVICE_EVENT.fields.booking, 1, 200),
    field('eventType', SERVICE_EVENT.fields.eventType, 2, 190),
    field('status', SERVICE_EVENT.fields.status, 3, 150),
    field('startsAt', SERVICE_EVENT.fields.startsAt, 4, 170),
    field('endsAt', SERVICE_EVENT.fields.endsAt, 5, 170),
    field('location', SERVICE_EVENT.fields.location, 6, 220),
  ],
  filters: [
    {
      universalIdentifier: viewEntityId('operationsCalendar', 'filter.status'),
      fieldMetadataUniversalIdentifier: SERVICE_EVENT.fields.status,
      operand: ViewFilterOperand.IS_NOT,
      value: ['CANCELLED', 'COMPLETED'],
    },
  ],
});
