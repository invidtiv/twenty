import {
  ViewFilterGroupLogicalOperator,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import { BOOKING, viewEntityId, viewId } from 'src/constants/identifiers';

export const NEEDS_INFORMATION_VIEW_ID = viewId('needsInformation');
const FILTER_GROUP_ID = viewEntityId('needsInformation', 'filterGroup.or');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('needsInformation', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: NEEDS_INFORMATION_VIEW_ID,
  name: 'Needs Information',
  objectUniversalIdentifier: BOOKING.object,
  icon: 'IconInfoTriangle',
  key: ViewKey.INDEX,
  position: 1,
  fields: [
    field('name', BOOKING.fields.name, 0, 220),
    field('checkinAt', BOOKING.fields.checkinAt, 1, 170),
    field('guest', BOOKING.fields.guest, 2),
    field('property', BOOKING.fields.property, 3),
    field('preferredContact', BOOKING.fields.preferredContactMethod, 4, 220),
    field('readiness', BOOKING.fields.readinessStatus, 5),
    field('missingInformation', BOOKING.fields.missingInformation, 6, 300),
    field('humanReview', BOOKING.fields.needsHumanReview, 7, 150),
  ],
  filterGroups: [
    {
      universalIdentifier: FILTER_GROUP_ID,
      logicalOperator: ViewFilterGroupLogicalOperator.OR,
      positionInViewFilterGroup: 0,
    },
  ],
  filters: [
    {
      universalIdentifier: viewEntityId('needsInformation', 'filter.readiness'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.readinessStatus,
      operand: ViewFilterOperand.IS_NOT,
      value: ['READY'],
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 0,
    },
    {
      universalIdentifier: viewEntityId('needsInformation', 'filter.review'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.needsHumanReview,
      operand: ViewFilterOperand.IS,
      value: true,
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 1,
    },
    {
      universalIdentifier: viewEntityId('needsInformation', 'filter.contact'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.preferredContactMethod,
      operand: ViewFilterOperand.IS_EMPTY,
      value: '',
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 2,
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('needsInformation', 'sort.checkinAt'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      direction: ViewSortDirection.ASC,
    },
  ],
});
