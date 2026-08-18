import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "4dec0e82-46ea-417b-89a7-296d1a0a3baf",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.RELATION,
  "name": "bookingContactMethods",
  "label": "Booking contact methods",
  "icon": "IconAddressBook",
  "relationTargetObjectMetadataUniversalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
  "relationTargetFieldMetadataUniversalIdentifier": "36dfacf5-f9eb-4ab7-bb81-8c9e96258ac2",
  "universalSettings": {
    "relationType": RelationType.ONE_TO_MANY
  }
},
);
