import { FieldType, OnDeleteAction, RelationType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "6b6b731b-29ec-4c4a-a1e7-79e02b3e577d",
  "objectUniversalIdentifier": "20202020-1ba1-48ba-bc83-ef7e5990ed10",
  type: FieldType.RELATION,
  "name": "booking",
  "label": "Booking",
  "icon": "IconCalendarCheck",
  "isNullable": true,
  "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  "relationTargetFieldMetadataUniversalIdentifier": "57422a39-a2ab-44c2-993c-c6cdf2209c19",
  "universalSettings": {
    "relationType": RelationType.MANY_TO_ONE,
    "onDelete": OnDeleteAction.SET_NULL,
    "joinColumnName": "bookingId"
  }
},
);
