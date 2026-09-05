import { FieldType, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS, defineField } from 'twenty-sdk/define';

import {
  MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
  type: FieldType.TEXT,
  name: 'messageTo',
  label: 'To',
  icon: 'IconArrowRight',
  isNullable: true,
});
