import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.globalContactId,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.UUID,
  name: 'globalContactId',
  label: 'Global contact ID',
  description: 'Opaque stable cross-system identity; never derived from phone or email.',
  icon: 'IconFingerprint',
  isNullable: true,
  isUnique: true,
});
