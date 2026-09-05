import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import {
  MESSAGE_ASSOCIATION_IS_SPAM_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
  SPAM_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: SPAM_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Spam',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
      .universalIdentifier,
  icon: 'IconAlertTriangle',
  key: ViewKey.INDEX,
  position: 3,
  fields: [
    {
      universalIdentifier: '59cd2ca8-449b-46b8-a146-f44005f9287d',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.message.universalIdentifier,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '9c3156b7-97cd-47a6-9ac8-b5c632e553eb',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '03345a97-1ba4-4c55-8781-d04d68faeb2f',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.direction.universalIdentifier,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '759f6a4f-72c3-4a40-8294-65ea82e77707',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      position: 3,
      isVisible: true,
      size: 160,
    },
  ],
  filters: [
    {
      universalIdentifier: '40c825eb-8fdb-4721-ace6-95d723eaed2b',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_SPAM_FIELD_UNIVERSAL_IDENTIFIER,
      operand: ViewFilterOperand.IS,
      value: true,
    },
  ],
  sorts: [
    {
      universalIdentifier: '73c165f8-f617-4d46-b6f8-d58b2c55fd9a',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
