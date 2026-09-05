import { ViewKey, ViewSortDirection, defineView } from 'twenty-sdk/define';

import { SOURCE_RECORD, viewEntityId, viewId } from 'src/constants/identifiers';

export const SOURCE_RECORDS_VIEW_ID = viewId('sourceRecords');

export default defineView({
  universalIdentifier: SOURCE_RECORDS_VIEW_ID,
  name: 'Source Records',
  objectUniversalIdentifier: SOURCE_RECORD.object,
  icon: 'IconDatabase',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    [SOURCE_RECORD.fields.name, 0, 240, 'name'],
    [SOURCE_RECORD.fields.sourceType, 1, 140, 'source'],
    [SOURCE_RECORD.fields.externalId, 2, 200, 'externalId'],
    [SOURCE_RECORD.fields.booking, 3, 190, 'booking'],
    [SOURCE_RECORD.fields.parseStatus, 4, 160, 'status'],
    [SOURCE_RECORD.fields.receivedAt, 5, 170, 'receivedAt'],
    [SOURCE_RECORD.fields.parserVersion, 6, 150, 'parserVersion'],
    [SOURCE_RECORD.fields.error, 7, 280, 'error'],
  ].map(([fieldMetadataUniversalIdentifier, position, size, name]) => ({
    universalIdentifier: viewEntityId('sourceRecords', `field.${name}`),
    fieldMetadataUniversalIdentifier: String(fieldMetadataUniversalIdentifier),
    position: Number(position),
    isVisible: true,
    size: Number(size),
  })),
  sorts: [
    {
      universalIdentifier: viewEntityId('sourceRecords', 'sort.receivedAt'),
      fieldMetadataUniversalIdentifier: SOURCE_RECORD.fields.receivedAt,
      direction: ViewSortDirection.DESC,
    },
  ],
});
