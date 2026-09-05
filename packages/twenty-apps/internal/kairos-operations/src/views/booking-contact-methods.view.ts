import { ViewKey, defineView } from 'twenty-sdk/define';

import { CONTACT_METHOD, viewEntityId, viewId } from 'src/constants/identifiers';

export const BOOKING_CONTACT_METHODS_VIEW_ID = viewId('bookingContactMethods');

export default defineView({
  universalIdentifier: BOOKING_CONTACT_METHODS_VIEW_ID,
  name: 'Booking Contact Methods',
  objectUniversalIdentifier: CONTACT_METHOD.object,
  icon: 'IconAddressBook',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    [CONTACT_METHOD.fields.name, 0, 320, 'name'],
    [CONTACT_METHOD.fields.booking, 1, 190, 'booking'],
    [CONTACT_METHOD.fields.contactType, 2, 140, 'type'],
    [CONTACT_METHOD.fields.contactValue, 3, 220, 'value'],
    [CONTACT_METHOD.fields.source, 4, 140, 'source'],
    [CONTACT_METHOD.fields.confidence, 5, 140, 'confidence'],
    [CONTACT_METHOD.fields.isPreferred, 6, 110, 'preferred'],
    [CONTACT_METHOD.fields.lastVerifiedAt, 7, 170, 'verifiedAt'],
  ].map(([fieldMetadataUniversalIdentifier, position, size, name]) => ({
    universalIdentifier: viewEntityId('bookingContactMethods', `field.${name}`),
    fieldMetadataUniversalIdentifier: String(fieldMetadataUniversalIdentifier),
    position: Number(position),
    isVisible: true,
    size: Number(size),
  })),
});
