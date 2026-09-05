import { ViewKey, defineView } from 'twenty-sdk/define';

import { PROPERTY, viewEntityId, viewId } from 'src/constants/identifiers';

export const PROPERTIES_VIEW_ID = viewId('properties');

export default defineView({
  universalIdentifier: PROPERTIES_VIEW_ID,
  name: 'Properties',
  objectUniversalIdentifier: PROPERTY.object,
  icon: 'IconBuildingEstate',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    [PROPERTY.fields.name, 0, 240, 'name'],
    [PROPERTY.fields.externalPropertyId, 1, 190, 'externalId'],
    [PROPERTY.fields.propertyAddress, 2, 300, 'propertyAddress'],
    [PROPERTY.fields.timezone, 3, 170, 'timezone'],
    [PROPERTY.fields.active, 4, 100, 'active'],
  ].map(([fieldMetadataUniversalIdentifier, position, size, name]) => ({
    universalIdentifier: viewEntityId('properties', `field.${name}`),
    fieldMetadataUniversalIdentifier: String(fieldMetadataUniversalIdentifier),
    position: Number(position),
    isVisible: true,
    size: Number(size),
  })),
});
