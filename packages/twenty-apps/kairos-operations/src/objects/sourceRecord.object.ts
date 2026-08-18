import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "90d7133e-f132-495f-949f-07f5450b53e4",
  "nameSingular": "sourceRecord",
  "namePlural": "sourceRecords",
  "labelSingular": "Source Record",
  "labelPlural": "Source Records",
  "description": "Immutable-ish ingestion evidence and parser provenance.",
  "icon": "IconDatabase",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "7dcb9508-900a-4ffe-bf5f-85ab11d9c079",
  "fields": [
    {
      "universalIdentifier": "7dcb9508-900a-4ffe-bf5f-85ab11d9c079",
      type: FieldType.TEXT,
      "name": "name",
      "label": "Source record",
      "icon": "IconDatabase"
    },
    {
      "universalIdentifier": "33917a6d-4085-4373-a54a-28f62f6bc62f",
      type: FieldType.SELECT,
      "name": "sourceType",
      "label": "Source type",
      "icon": "IconDatabaseImport",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "23aceeb0-7aeb-592e-8543-3bf7176be2ca"
        },
        {
          "value": "TALKGUEST",
          "label": "TalkGuest",
          "position": 1,
          "color": "blue",
          "id": "a5458d31-8025-5387-8584-14680f295d92"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 2,
          "color": "orange",
          "id": "f33a7079-51ea-54f4-8c2f-2110a59f9592"
        },
        {
          "value": "MANUAL",
          "label": "Manual",
          "position": 3,
          "color": "gray",
          "id": "12ff1311-97df-51a0-8b3f-1872732b0dd7"
        },
        {
          "value": "KAIROS",
          "label": "Kairos",
          "position": 4,
          "color": "purple",
          "id": "c39e0aba-7f57-5f0b-bc9f-8de281c003ed"
        },
        {
          "value": "FUTURE_API",
          "label": "Future API",
          "position": 5,
          "color": "turquoise",
          "id": "62dd2015-2286-5d8a-a6d4-e1d53be8ddca"
        }
      ]
    },
    {
      "universalIdentifier": "09e4ecb5-a299-49dd-952b-3549e662d272",
      type: FieldType.TEXT,
      "name": "externalId",
      "label": "External ID",
      "icon": "IconId"
    },
    {
      "universalIdentifier": "5145a933-f308-4ee0-9e7a-d88bcc866d68",
      type: FieldType.TEXT,
      "name": "sourceKey",
      "label": "Source key",
      "description": "Unique source plus external ID key for replay safety.",
      "icon": "IconKey",
      "isUnique": true
    },
    {
      "universalIdentifier": "4b229514-568e-498f-9700-957f7f3761fc",
      type: FieldType.DATE_TIME,
      "name": "receivedAt",
      "label": "Received at",
      "icon": "IconClockDown"
    },
    {
      "universalIdentifier": "70ca867d-ebef-40ee-9855-8e1f9161573d",
      type: FieldType.DATE_TIME,
      "name": "sourceTimestamp",
      "label": "Source timestamp",
      "icon": "IconClock",
      "isNullable": true
    },
    {
      "universalIdentifier": "cff68dfc-340a-477c-a828-5572f54544c0",
      type: FieldType.RELATION,
      "name": "booking",
      "label": "Booking",
      "icon": "IconCalendarCheck",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "03e72644-12e7-484f-90c3-efa7e6b76630",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "bookingId"
      }
    },
    {
      "universalIdentifier": "65d98012-5e65-487b-b155-9e7600ed4802",
      type: FieldType.RELATION,
      "name": "contactMethods",
      "label": "Contact methods",
      "icon": "IconAddressBook",
      "relationTargetObjectMetadataUniversalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
      "relationTargetFieldMetadataUniversalIdentifier": "51face38-c92a-49cd-85cd-669e587c1275",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "6a227323-bfa7-4eb9-ae1e-10bcf5f50a0a",
      type: FieldType.RELATION,
      "name": "communications",
      "label": "Communications",
      "icon": "IconMessages",
      "relationTargetObjectMetadataUniversalIdentifier": "980a5656-1746-4ee2-be74-ee622ab24887",
      "relationTargetFieldMetadataUniversalIdentifier": "48111c7d-8dc5-4796-b8fe-80e61cf21df4",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "b1b423dc-8014-4b98-9445-0a1e34bb799f",
      type: FieldType.SELECT,
      "name": "parseStatus",
      "label": "Parse status",
      "icon": "IconCode",
      "defaultValue": "'RECEIVED'",
      "options": [
        {
          "value": "RECEIVED",
          "label": "Received",
          "position": 0,
          "color": "blue",
          "id": "5df477eb-4a27-5297-8bfb-1bc7a486937f"
        },
        {
          "value": "PARSED",
          "label": "Parsed",
          "position": 1,
          "color": "turquoise",
          "id": "44caa12a-24ae-53d2-bd48-83e2a1ff9388"
        },
        {
          "value": "RECONCILED",
          "label": "Reconciled",
          "position": 2,
          "color": "green",
          "id": "aefa2946-bf36-57df-ac4e-f15254332dc3"
        },
        {
          "value": "NEEDS_REVIEW",
          "label": "Needs Review",
          "position": 3,
          "color": "yellow",
          "id": "746ef1b6-bc52-5528-bca3-c8ac27739f10"
        },
        {
          "value": "ERROR",
          "label": "Error",
          "position": 4,
          "color": "red",
          "id": "c5a77746-fe73-5ac3-9b35-2172bfb21b2b"
        }
      ]
    },
    {
      "universalIdentifier": "73257ec7-b897-4ddc-8a96-21acd6021ab9",
      type: FieldType.TEXT,
      "name": "contentHash",
      "label": "Content hash",
      "icon": "IconHash",
      "isNullable": true
    },
    {
      "universalIdentifier": "40892ee0-0973-4f2f-a65f-1d8d618bcd53",
      type: FieldType.TEXT,
      "name": "rawText",
      "label": "Raw text",
      "description": "Operational source content only; never credentials or session state.",
      "icon": "IconFileText",
      "isNullable": true
    },
    {
      "universalIdentifier": "237d07ff-a13b-4974-8f52-2c1d5e05e18c",
      type: FieldType.RAW_JSON,
      "name": "rawMetadata",
      "label": "Raw metadata",
      "icon": "IconJson",
      "isNullable": true
    },
    {
      "universalIdentifier": "17c33b77-4efc-4b67-a1ef-5235c1e62f34",
      type: FieldType.TEXT,
      "name": "parserVersion",
      "label": "Parser version",
      "icon": "IconVersions",
      "isNullable": true
    },
    {
      "universalIdentifier": "58faf2a7-8511-44a9-8347-72f73d6ff2c2",
      type: FieldType.TEXT,
      "name": "error",
      "label": "Error",
      "icon": "IconAlertTriangle",
      "isNullable": true
    }
  ]
},
);
