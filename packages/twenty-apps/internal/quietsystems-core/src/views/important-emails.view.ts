import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewFilterOperand,
  ViewKey,
  ViewSortDirection,
  defineView,
} from 'twenty-sdk/define';

import {
  IMPORTANT_VIEW_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: IMPORTANT_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Important',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
      .universalIdentifier,
  icon: 'IconStar',
  key: ViewKey.INDEX,
  position: 4,
  fields: [
    {
      universalIdentifier: '4e9ed8b5-5ee4-476d-a7fd-c0c1f6d66d80',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.message.universalIdentifier,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: 'ea16f1a7-2bdc-493a-b8d6-487957c27ab4',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_SENDER_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '7ad1f78f-b865-4e2c-8e54-293f573b87c2',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.direction.universalIdentifier,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '0eb60685-a5b0-4794-a937-f8e8de34dc43',
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
      universalIdentifier: '83c4ab50-5b62-4a3a-bc97-0c54bd935836',
      fieldMetadataUniversalIdentifier:
        MESSAGE_ASSOCIATION_IS_IMPORTANT_FIELD_UNIVERSAL_IDENTIFIER,
      operand: ViewFilterOperand.IS,
      value: true,
    },
  ],
  sorts: [
    {
      universalIdentifier: 'fa8a5a7d-f748-4fa3-80de-7991aae05d38',
      fieldMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
          .fields.createdAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
