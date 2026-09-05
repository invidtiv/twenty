import {
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import { BOOKING, viewEntityId, viewId } from 'src/constants/identifiers';

export const READY_BOOKINGS_VIEW_ID = viewId('readyBookings');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('readyBookings', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: READY_BOOKINGS_VIEW_ID,
  name: 'Ready',
  objectUniversalIdentifier: BOOKING.object,
  icon: 'IconCircleCheck',
  key: ViewKey.INDEX,
  position: 2,
  fields: [
    field('name', BOOKING.fields.name, 0, 220),
    field('checkinAt', BOOKING.fields.checkinAt, 1, 170),
    field('guest', BOOKING.fields.guest, 2),
    field('property', BOOKING.fields.property, 3),
    field('preferredContact', BOOKING.fields.preferredContactMethod, 4, 220),
    field('status', BOOKING.fields.status, 5, 150),
  ],
  filters: [
    {
      universalIdentifier: viewEntityId('readyBookings', 'filter.readiness'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.readinessStatus,
      operand: ViewFilterOperand.IS,
      value: ['READY'],
    },
    {
      universalIdentifier: viewEntityId('readyBookings', 'filter.future'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      operand: ViewFilterOperand.IS_IN_FUTURE,
      value: '',
    },
    {
      universalIdentifier: viewEntityId('readyBookings', 'filter.status'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.status,
      operand: ViewFilterOperand.IS_NOT,
      value: ['CANCELLED', 'COMPLETED'],
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('readyBookings', 'sort.checkinAt'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      direction: ViewSortDirection.ASC,
    },
  ],
});
