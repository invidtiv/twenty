import { ViewKey, ViewSortDirection, defineView } from 'twenty-sdk/define';

import { COMMUNICATION, viewEntityId, viewId } from 'src/constants/identifiers';

export const COMMUNICATIONS_VIEW_ID = viewId('communications');

export default defineView({
  universalIdentifier: COMMUNICATIONS_VIEW_ID,
  name: 'Communications',
  objectUniversalIdentifier: COMMUNICATION.object,
  icon: 'IconMessages',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    [COMMUNICATION.fields.summary, 0, 320, 'summary'],
    [COMMUNICATION.fields.booking, 1, 190, 'booking'],
    [COMMUNICATION.fields.person, 2, 180, 'person'],
    [COMMUNICATION.fields.direction, 3, 130, 'direction'],
    [COMMUNICATION.fields.channel, 4, 130, 'channel'],
    [COMMUNICATION.fields.occurredAt, 5, 170, 'occurredAt'],
    [COMMUNICATION.fields.actionRequired, 6, 130, 'actionRequired'],
  ].map(([fieldMetadataUniversalIdentifier, position, size, name]) => ({
    universalIdentifier: viewEntityId('communications', `field.${name}`),
    fieldMetadataUniversalIdentifier: String(fieldMetadataUniversalIdentifier),
    position: Number(position),
    isVisible: true,
    size: Number(size),
  })),
  sorts: [
    {
      universalIdentifier: viewEntityId('communications', 'sort.occurredAt'),
      fieldMetadataUniversalIdentifier: COMMUNICATION.fields.occurredAt,
      direction: ViewSortDirection.DESC,
    },
  ],
});
