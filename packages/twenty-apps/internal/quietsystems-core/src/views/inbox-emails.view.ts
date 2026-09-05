// Force recreate view
import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import {
  INBOX_VIEW_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_IS_SPAM_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: INBOX_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Inbox',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
      .universalIdentifier,
  icon: 'IconMailOpen',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    {
      universalIdentifier: '35c458a5-a7d5-4803-9a49-2819e259f69f',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.message
          .universalIdentifier,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '45166abf-06db-4bc1-87ab-15be06f01da8',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'fb93fd03-ef1a-4a72-8ddd-122785d99b34',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '385aec5f-3082-4601-96a2-76ed20cc934f',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt
          .universalIdentifier,
      position: 3,
      isVisible: true,
      size: 160,
    },
  ],
  filters: [
    {
      universalIdentifier: '14e27aa2-109b-4c33-8834-a4f4df30f31c',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.direction.universalIdentifier,
      operand: ViewFilterOperand.IS,
      value: ['INCOMING'],
    },
    {
      universalIdentifier: '8db63189-0169-4c8e-b4d4-5ff5e75589f1',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_SPAM_FIELD_UNIVERSAL_IDENTIFIER,
      operand: ViewFilterOperand.IS,
      value: false,
    },
  ],
  sorts: [
    {
      universalIdentifier: '9556175f-0836-4419-a06c-9f2004f406ef',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
