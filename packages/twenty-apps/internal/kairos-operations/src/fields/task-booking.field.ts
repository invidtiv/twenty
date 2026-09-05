import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { BOOKING, TASK_BOOKING_FIELD } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: TASK_BOOKING_FIELD,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.RELATION,
  name: 'booking',
  label: 'Booking',
  icon: 'IconCalendarCheck',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier: BOOKING.object,
  relationTargetFieldMetadataUniversalIdentifier: BOOKING.fields.tasks,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'bookingId',
  },
});
