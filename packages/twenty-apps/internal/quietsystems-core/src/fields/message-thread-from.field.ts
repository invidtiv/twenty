import { FieldType, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS, defineField } from 'twenty-sdk/define';

import {
  MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
  type: FieldType.TEXT,
  name: 'messageFrom',
  label: 'From',
  icon: 'IconAt',
  isNullable: true,
});
