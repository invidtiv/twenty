import { FieldType, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "82c6e180-c624-4e8a-86e8-f5890f8adf6a",
  "nameSingular": "property",
  "namePlural": "properties",
  "labelSingular": "Property",
  "labelPlural": "Properties",
  "description": "Operational locations served by Kairos.",
  "icon": "IconBuildingEstate",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "f8439ff3-6be3-4fae-880d-b70f2b151345",
  "fields": [
    {
      "universalIdentifier": "f8439ff3-6be3-4fae-880d-b70f2b151345",
      type: FieldType.TEXT,
      "name": "name",
      "label": "Name",
      "icon": "IconBuildingEstate",
      "description": "apartmenr"
    },
    {
      "universalIdentifier": "13364159-f749-4dc3-991d-793a49d1a90d",
      type: FieldType.TEXT,
      "name": "externalPropertyId",
      "label": "External property ID",
      "icon": "IconFingerprint",
      "isNullable": true,
      "isUnique": true
    },
    {
      "universalIdentifier": "1ecc46f3-db57-44f5-a055-7f3c7486c207",
      type: FieldType.TEXT,
      "name": "propertyAddress",
      "label": "Address",
      "icon": "IconMapPin",
      "isNullable": true
    },
    {
      "universalIdentifier": "4fe72b26-db19-4892-b67a-2d3b2a8eff70",
      type: FieldType.LINKS,
      "name": "mapUrl",
      "label": "Map URL",
      "icon": "IconMap",
      "isNullable": true
    },
    {
      "universalIdentifier": "00e17c4b-ccba-40a2-ac87-2d1616b0215f",
      type: FieldType.TEXT,
      "name": "defaultCheckinNotes",
      "label": "Default check-in notes",
      "icon": "IconNotes",
      "isNullable": true
    },
    {
      "universalIdentifier": "aab162d4-09ee-42f4-979e-61e4c603ad45",
      type: FieldType.TEXT,
      "name": "accessNotes",
      "label": "Access notes",
      "description": "Non-secret access context only.",
      "icon": "IconDoorEnter",
      "isNullable": true
    },
    {
      "universalIdentifier": "690dc3c6-7a03-4be7-b2bf-4d0844389a1d",
      type: FieldType.TEXT,
      "name": "accessSecretReference",
      "label": "Access secret reference",
      "description": "Opaque reference to a secret store; never a raw credential.",
      "icon": "IconKey",
      "isNullable": true
    },
    {
      "universalIdentifier": "dcb194bd-9bc6-488c-af3d-33a3fe5a6cd3",
      type: FieldType.BOOLEAN,
      "name": "active",
      "label": "Active",
      "icon": "IconToggleRight",
      "defaultValue": true
    },
    {
      "universalIdentifier": "ace214c6-eda3-4f58-ba7f-20a9bb86a9d1",
      type: FieldType.TEXT,
      "name": "timezone",
      "label": "Timezone",
      "description": "IANA timezone, for example Europe/Lisbon.",
      "icon": "IconWorld",
      "defaultValue": "'Europe/Lisbon'"
    },
    {
      "universalIdentifier": "422a7937-d76c-4015-af99-e1bc0e77504e",
      type: FieldType.RAW_JSON,
      "name": "metadata",
      "label": "Metadata",
      "icon": "IconJson",
      "isNullable": true
    },
    {
      "universalIdentifier": "bc757472-8fbf-46aa-85ff-1bf7968301f6",
      type: FieldType.RELATION,
      "name": "bookings",
      "label": "Bookings",
      "icon": "IconCalendarEvent",
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    }
  ]
},
);
