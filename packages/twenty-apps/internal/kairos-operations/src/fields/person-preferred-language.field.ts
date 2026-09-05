import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.preferredLanguage,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.TEXT,
  name: 'preferredLanguage',
  label: 'Preferred language',
  icon: 'IconLanguage',
  isNullable: true,
});
