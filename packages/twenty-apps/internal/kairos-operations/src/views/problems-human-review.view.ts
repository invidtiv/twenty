import {
  ViewFilterGroupLogicalOperator,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import { BOOKING, viewEntityId, viewId } from 'src/constants/identifiers';

export const PROBLEMS_HUMAN_REVIEW_VIEW_ID = viewId('problemsHumanReview');
const FILTER_GROUP_ID = viewEntityId('problemsHumanReview', 'filterGroup.or');

const field = (name: string, fieldId: string, position: number, size = 180) => ({
  universalIdentifier: viewEntityId('problemsHumanReview', `field.${name}`),
  fieldMetadataUniversalIdentifier: fieldId,
  position,
  isVisible: true,
  size,
});

export default defineView({
  universalIdentifier: PROBLEMS_HUMAN_REVIEW_VIEW_ID,
  name: 'Problems / Human Review',
  objectUniversalIdentifier: BOOKING.object,
  icon: 'IconAlertTriangle',
  key: ViewKey.INDEX,
  position: 3,
  fields: [
    field('name', BOOKING.fields.name, 0, 220),
    field('checkinAt', BOOKING.fields.checkinAt, 1, 170),
    field('guest', BOOKING.fields.guest, 2),
    field('property', BOOKING.fields.property, 3),
    field('preferredContact', BOOKING.fields.preferredContactMethod, 4, 220),
    field('readiness', BOOKING.fields.readinessStatus, 5),
    field('risk', BOOKING.fields.riskLevel, 6, 140),
    field('missingInformation', BOOKING.fields.missingInformation, 7, 300),
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
      universalIdentifier: viewEntityId('problemsHumanReview', 'filter.review'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.needsHumanReview,
      operand: ViewFilterOperand.IS,
      value: true,
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 0,
    },
    {
      universalIdentifier: viewEntityId('problemsHumanReview', 'filter.status'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.status,
      operand: ViewFilterOperand.IS,
      value: ['PROBLEM'],
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 1,
    },
    {
      universalIdentifier: viewEntityId('problemsHumanReview', 'filter.risk'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.riskLevel,
      operand: ViewFilterOperand.IS,
      value: ['HIGH', 'CRITICAL'],
      viewFilterGroupUniversalIdentifier: FILTER_GROUP_ID,
      positionInViewFilterGroup: 2,
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('problemsHumanReview', 'sort.checkinAt'),
      fieldMetadataUniversalIdentifier: BOOKING.fields.checkinAt,
      direction: ViewSortDirection.ASC,
    },
  ],
});
