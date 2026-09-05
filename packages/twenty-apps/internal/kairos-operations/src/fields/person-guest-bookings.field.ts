import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { BOOKING, PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.guestBookings,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.RELATION,
  name: 'guestBookings',
  label: 'Guest bookings',
  icon: 'IconCalendarCheck',
  relationTargetObjectMetadataUniversalIdentifier: BOOKING.object,
  relationTargetFieldMetadataUniversalIdentifier: BOOKING.fields.guest,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
