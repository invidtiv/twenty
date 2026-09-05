import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  MESSAGE_THREAD_TRIAGE_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: MESSAGE_THREAD_TRIAGE_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
  type: FieldType.SELECT,
  name: 'triageCategory',
  label: 'Triage Category',
  icon: 'IconTag',
  isNullable: true,
  options: [
    {
      id: '63602aab-7408-4c5f-b703-5108683c0070',
      value: 'INBOX',
      label: 'Inbox',
      position: 0,
      color: 'gray',
    },
    {
      id: '1c941fe3-a89c-425d-baa8-8060e24a1489',
      value: 'RECEIVED',
      label: 'Received',
      position: 1,
      color: 'blue',
    },
    {
      id: 'c98576c6-e927-426d-a098-b43435fc70cf',
      value: 'SENT',
      label: 'Sent',
      position: 2,
      color: 'purple',
    },
    {
      id: 'eb7a9a6b-5664-4221-9b5e-737710c43a0d',
      value: 'IMPORTANT',
      label: 'Important',
      position: 3,
      color: 'orange',
    },
    {
      id: 'de72cfda-681b-46a1-bd64-8dedb5033d10',
      value: 'SPAM',
      label: 'Spam',
      position: 4,
      color: 'red',
    },
  ],
});
