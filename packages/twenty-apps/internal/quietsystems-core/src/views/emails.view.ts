import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import {
  EMAILS_FROM_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_CREATED_AT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_TO_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_TRIAGE_CATEGORY_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_MESSAGES_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_SUBJECT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_UPDATED_AT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
  EMAILS_VIEW_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_TRIAGE_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: EMAILS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Emails',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
  icon: 'IconMail',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    {
      universalIdentifier: EMAILS_SUBJECT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.fields.subject
          .universalIdentifier,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: EMAILS_MESSAGES_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.fields.messages
          .universalIdentifier,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: EMAILS_FROM_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: EMAILS_TO_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier: MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: EMAILS_TRIAGE_CATEGORY_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        MESSAGE_THREAD_TRIAGE_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: EMAILS_UPDATED_AT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.fields.updatedAt
          .universalIdentifier,
      position: 5,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: EMAILS_CREATED_AT_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.fields.createdAt
          .universalIdentifier,
      position: 6,
      isVisible: true,
      size: 160,
    },
  ],
  sorts: [
    {
      universalIdentifier: 'd85bf33d-bc54-4575-952a-f786036db0ae',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.fields.updatedAt
          .universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
