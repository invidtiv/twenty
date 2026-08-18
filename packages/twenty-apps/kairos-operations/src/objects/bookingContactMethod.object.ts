import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
  "nameSingular": "bookingContactMethod",
  "namePlural": "bookingContactMethods",
  "labelSingular": "Booking Contact Method",
  "labelPlural": "Booking Contact Methods",
  "description": "Booking-scoped contact candidates with independent provenance.",
  "icon": "IconAddressBook",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "e678442d-a2be-490a-843d-51bea70af99d",
  "fields": [
    {
      "universalIdentifier": "e678442d-a2be-490a-843d-51bea70af99d",
      type: FieldType.TEXT,
      "name": "name",
      "label": "Contact label",
      "icon": "IconAddressBook"
    },
    {
      "universalIdentifier": "7ea58c3b-3aaa-49a3-b62e-9750f2083824",
      type: FieldType.TEXT,
      "name": "sourceContactKey",
      "label": "Source contact key",
      "description": "Stable booking plus source plus contact identity.",
      "icon": "IconKey",
      "isUnique": true
    },
    {
      "universalIdentifier": "7e6829eb-b284-456e-b77c-108d3778ffe3",
      type: FieldType.RELATION,
      "name": "booking",
      "label": "Booking",
      "icon": "IconCalendarCheck",
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "7838c088-bb63-453e-a7c2-1c11614d4df8",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.CASCADE,
        "joinColumnName": "bookingId"
      }
    },
    {
      "universalIdentifier": "36dfacf5-f9eb-4ab7-bb81-8c9e96258ac2",
      type: FieldType.RELATION,
      "name": "person",
      "label": "Person",
      "icon": "IconUser",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
      "relationTargetFieldMetadataUniversalIdentifier": "4dec0e82-46ea-417b-89a7-296d1a0a3baf",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "personId"
      }
    },
    {
      "universalIdentifier": "2fb53b9d-b208-498f-9de6-8f4f0c371b07",
      type: FieldType.SELECT,
      "name": "contactType",
      "label": "Contact type",
      "icon": "IconMessageCircle",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "55404890-df9f-5d3d-8ec1-82b212c77bd3"
        },
        {
          "value": "PHONE",
          "label": "Phone",
          "position": 1,
          "color": "blue",
          "id": "e9ef9c24-97b7-5249-83a0-f1181cce517b"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 2,
          "color": "orange",
          "id": "b460ef61-ca49-5d90-9422-78ecdd59c315"
        },
        {
          "value": "OTHER",
          "label": "Other",
          "position": 3,
          "color": "gray",
          "id": "934e079a-b52f-5e0d-aa43-0226e9588085"
        }
      ]
    },
    {
      "universalIdentifier": "0aae60eb-0db2-4761-b420-c0c29b3fbb1a",
      type: FieldType.TEXT,
      "name": "contactValue",
      "label": "Contact value",
      "icon": "IconAt"
    },
    {
      "universalIdentifier": "3e09cc2e-7807-4e2e-91bb-866a54cf2985",
      type: FieldType.SELECT,
      "name": "source",
      "label": "Source",
      "icon": "IconDatabaseImport",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "d4342c40-d9f8-5120-8d96-67ed3feaf9d1"
        },
        {
          "value": "TALKGUEST",
          "label": "TalkGuest",
          "position": 1,
          "color": "blue",
          "id": "7cebeda0-e150-5ca3-a038-3ca197ec9d4c"
        },
        {
          "value": "MANUAL",
          "label": "Manual",
          "position": 2,
          "color": "gray",
          "id": "4d94b569-b8ea-5622-809f-15ac311f47e2"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 3,
          "color": "orange",
          "id": "5c9c9117-d7d2-56c2-86c0-1e256bbceee0"
        },
        {
          "value": "OTHER",
          "label": "Other",
          "position": 4,
          "color": "purple",
          "id": "73d2ebac-7f89-53d7-ae6f-d8abfcf5e7f9"
        }
      ]
    },
    {
      "universalIdentifier": "51face38-c92a-49cd-85cd-669e587c1275",
      type: FieldType.RELATION,
      "name": "sourceRecord",
      "label": "Source record",
      "icon": "IconDatabase",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "90d7133e-f132-495f-949f-07f5450b53e4",
      "relationTargetFieldMetadataUniversalIdentifier": "65d98012-5e65-487b-b155-9e7600ed4802",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "sourceRecordId"
      }
    },
    {
      "universalIdentifier": "6bad4454-ddf0-4518-abdb-4329ed4934cd",
      type: FieldType.NUMBER,
      "name": "priority",
      "label": "Priority",
      "icon": "IconSortAscendingNumbers",
      "defaultValue": 100
    },
    {
      "universalIdentifier": "8e2fa636-b7cc-4c5f-a6f1-296880e67e2f",
      type: FieldType.BOOLEAN,
      "name": "isPreferred",
      "label": "Preferred",
      "icon": "IconStar",
      "defaultValue": false
    },
    {
      "universalIdentifier": "e6277bbb-e636-4b4e-855b-ab976e827194",
      type: FieldType.SELECT,
      "name": "preferenceMode",
      "label": "Preference mode",
      "description": "Distinguishes policy selection from an explicit human choice.",
      "icon": "IconAdjustments",
      "defaultValue": "'POLICY'",
      "options": [
        {
          "value": "POLICY",
          "label": "Policy",
          "position": 0,
          "color": "blue",
          "id": "5dec80a5-fe7a-5796-bbce-d9ce63b10de6"
        },
        {
          "value": "MANUAL",
          "label": "Manual",
          "position": 1,
          "color": "purple",
          "id": "529dbd9b-b493-50cf-9246-222fdf5b9e82"
        }
      ]
    },
    {
      "universalIdentifier": "3af68364-489c-4374-aa66-013da3a810fb",
      type: FieldType.SELECT,
      "name": "confidence",
      "label": "Confidence",
      "icon": "IconShieldCheck",
      "defaultValue": "'UNVERIFIED'",
      "options": [
        {
          "value": "CONFIRMED",
          "label": "Confirmed",
          "position": 0,
          "color": "green",
          "id": "51a6b7c2-f94e-59a8-bed6-e9d638a48839"
        },
        {
          "value": "LIKELY",
          "label": "Likely",
          "position": 1,
          "color": "yellow",
          "id": "89b964b2-4494-51bd-b84a-e0b21c8a86ec"
        },
        {
          "value": "UNVERIFIED",
          "label": "Unverified",
          "position": 2,
          "color": "gray",
          "id": "009ea508-2b07-5ef5-9628-b78fbcad7e3e"
        }
      ]
    },
    {
      "universalIdentifier": "ac02650f-adfd-4049-bda8-8ffb5e7ed687",
      type: FieldType.DATE_TIME,
      "name": "lastVerifiedAt",
      "label": "Last verified at",
      "icon": "IconClockCheck",
      "isNullable": true
    },
    {
      "universalIdentifier": "2b04bc88-8d57-4ce8-95a2-2487b23a30b9",
      type: FieldType.DATE_TIME,
      "name": "validFrom",
      "label": "Valid from",
      "icon": "IconCalendarPlus",
      "isNullable": true
    },
    {
      "universalIdentifier": "5425f75a-b710-415d-a755-056713339956",
      type: FieldType.DATE_TIME,
      "name": "validUntil",
      "label": "Valid until",
      "icon": "IconCalendarMinus",
      "isNullable": true
    },
    {
      "universalIdentifier": "79e23b27-e7e2-4e0a-9592-eb5f065800d5",
      type: FieldType.TEXT,
      "name": "notes",
      "label": "Notes",
      "icon": "IconNotes",
      "isNullable": true
    },
    {
      "universalIdentifier": "6078cf4e-79a2-4aa8-aa1c-27bb59678e0e",
      type: FieldType.RELATION,
      "name": "preferredForBookings",
      "label": "Preferred for bookings",
      "icon": "IconStar",
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    }
  ]
},
);
