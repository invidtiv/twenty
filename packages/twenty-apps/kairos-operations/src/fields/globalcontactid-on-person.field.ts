import { FieldType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "f6857e82-46a7-44cd-9310-082565a610af",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.UUID,
  "name": "globalContactId",
  "label": "Global contact ID",
  "description": "Opaque stable cross-system identity; never derived from phone or email.",
  "icon": "IconFingerprint",
  "isNullable": true,
  "isUnique": true
},
);
