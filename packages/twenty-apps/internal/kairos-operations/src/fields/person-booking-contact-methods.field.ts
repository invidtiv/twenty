import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { CONTACT_METHOD, PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.bookingContactMethods,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.RELATION,
  name: 'bookingContactMethods',
  label: 'Booking contact methods',
  icon: 'IconAddressBook',
  relationTargetObjectMetadataUniversalIdentifier: CONTACT_METHOD.object,
  relationTargetFieldMetadataUniversalIdentifier: CONTACT_METHOD.fields.person,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
