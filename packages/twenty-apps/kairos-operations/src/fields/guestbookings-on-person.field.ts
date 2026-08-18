import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "d774af19-617d-445a-911d-c3bff2c859cb",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.RELATION,
  "name": "guestBookings",
  "label": "Guest bookings",
  "icon": "IconCalendarCheck",
  "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  "relationTargetFieldMetadataUniversalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
  "universalSettings": {
    "relationType": RelationType.ONE_TO_MANY
  }
},
);
