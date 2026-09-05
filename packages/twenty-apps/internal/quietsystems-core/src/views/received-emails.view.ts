// Force recreate view
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
  RECEIVED_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: RECEIVED_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Received',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
      .universalIdentifier,
  icon: 'IconMailOpen',
  key: ViewKey.INDEX,
  position: 1,
  fields: [
    {
      universalIdentifier: 'b1db474d-63ae-4c26-aacc-a8cd46273510',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.message
          .universalIdentifier,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '6dcf6834-ee80-4556-9b74-cce87163338c',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '89b77abc-a513-408a-867a-33602e40ab00',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '5cc31454-0298-4682-8d44-2a42bd0ab0b7',
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
      universalIdentifier: '9c072ba9-3554-47f0-a2d6-227745572663',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.direction.universalIdentifier,
      operand: ViewFilterOperand.IS,
      value: ['INCOMING'],
    },
  ],
  sorts: [
    {
      universalIdentifier: 'e3bf37be-d458-4898-9627-004b14f9c480',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
