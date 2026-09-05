import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import {
  MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
  SENT_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: SENT_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Sent',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
      .universalIdentifier,
  icon: 'IconSend',
  key: ViewKey.INDEX,
  position: 2,
  fields: [
    {
      universalIdentifier: '8de1357e-1d37-44ad-83fc-973c93f80d7f',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.message.universalIdentifier,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '8737f409-ce07-469f-88b5-9a771cc60443',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '7c431a62-7c5f-4dbb-9039-77cfbc544789',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '30276998-7c40-4d4a-8339-152b6fd187f8',
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
      universalIdentifier: 'f840910b-d1e8-452a-b49e-837db3e58d1e',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.direction.universalIdentifier,
      operand: ViewFilterOperand.IS,
      value: ['OUTGOING'],
    },
  ],
  sorts: [
    {
      universalIdentifier: 'cc4879c4-b0f1-48a1-9041-f3c42c671964',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
