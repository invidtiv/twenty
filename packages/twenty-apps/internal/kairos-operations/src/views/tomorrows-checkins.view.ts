import {
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import { BOOKING, viewEntityId, viewId } from 'src/constants/identifiers';

export const TOMORROWS_CHECKINS_VIEW_ID = viewId('tomorrowsCheckins');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('tomorrowsCheckins', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: TOMORROWS_CHECKINS_VIEW_ID,
  name: "Tomorrow's Check-ins",
  objectUniversalIdentifier: BOOKING.object,
  icon: 'IconCalendarTomorrow',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    field('name', BOOKING.fields.name, 0, 220),
    field('guest', BOOKING.fields.guest, 1, 180),
    field('property', BOOKING.fields.property, 2, 180),
    field('checkinAt', BOOKING.fields.checkinAt, 3, 170),
    field('preferredContact', BOOKING.fields.preferredContactMethod, 4, 220),
    field('readiness', BOOKING.fields.readinessStatus, 5, 180),
    field('missingInformation', BOOKING.fields.missingInformation, 6, 260),
    field('status', BOOKING.fields.status, 7, 150),
  ],
  filters: [
    {
      universalIdentifier: viewEntityId('tomorrowsCheckins', 'filter.date'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      operand: ViewFilterOperand.IS_RELATIVE,
      value: 'NEXT_1_DAY;;Europe/Lisbon;;',
    },
    {
      universalIdentifier: viewEntityId('tomorrowsCheckins', 'filter.status'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.status,
      operand: ViewFilterOperand.IS_NOT,
      value: ['CANCELLED', 'COMPLETED'],
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('tomorrowsCheckins', 'sort.checkinAt'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      direction: ViewSortDirection.ASC,
    },
  ],
});
