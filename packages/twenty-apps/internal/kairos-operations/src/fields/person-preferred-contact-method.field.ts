import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.preferredContactMethod,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'preferredContactMethod',
  label: 'Preferred contact method',
  icon: 'IconMessageCircle',
  defaultValue: "'UNKNOWN'",
  options: [
    { value: 'WHATSAPP', label: 'WhatsApp', position: 0, color: 'green' },
    { value: 'PHONE', label: 'Phone', position: 1, color: 'blue' },
    { value: 'EMAIL', label: 'Email', position: 2, color: 'orange' },
    { value: 'UNKNOWN', label: 'Unknown', position: 3, color: 'gray' },
  ],
});
