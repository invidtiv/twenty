import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "980a5656-1746-4ee2-be74-ee622ab24887",
  "nameSingular": "communication",
  "namePlural": "communications",
  "labelSingular": "Communication",
  "labelPlural": "Communications",
  "description": "Durable operational communications and summaries.",
  "icon": "IconMessages",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "2dc42515-35d3-45cf-9718-ec336480306f",
  "fields": [
    {
      "universalIdentifier": "2dc42515-35d3-45cf-9718-ec336480306f",
      type: FieldType.TEXT,
      "name": "summary",
      "label": "Summary",
      "icon": "IconMessage"
    },
    {
      "universalIdentifier": "1604a5a2-24e6-4358-a295-b64d43b0bad1",
      type: FieldType.TEXT,
      "name": "communicationKey",
      "label": "Communication key",
      "description": "Optional stable source key for idempotent creation.",
      "icon": "IconKey",
      "isNullable": true,
      "isUnique": true
    },
    {
      "universalIdentifier": "99f1eec4-2d48-4036-908a-28a765ba8186",
      type: FieldType.RELATION,
      "name": "booking",
      "label": "Booking",
      "icon": "IconCalendarCheck",
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "16742110-d655-4720-968d-3d9dbc15baeb",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.CASCADE,
        "joinColumnName": "bookingId"
      }
    },
    {
      "universalIdentifier": "8eb24112-8dce-4247-bb25-7e43bbecdd8b",
      type: FieldType.RELATION,
      "name": "person",
      "label": "Person",
      "icon": "IconUser",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
      "relationTargetFieldMetadataUniversalIdentifier": "83493694-a531-4500-9d72-860a841b0cd5",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "personId"
      }
    },
    {
      "universalIdentifier": "79c6978f-d902-4d11-ae57-36ab111c0f71",
      type: FieldType.SELECT,
      "name": "direction",
      "label": "Direction",
      "icon": "IconArrowsLeftRight",
      "options": [
        {
          "value": "INBOUND",
          "label": "Inbound",
          "position": 0,
          "color": "blue",
          "id": "f45a3fe2-7a85-51dd-b17d-768ffb997b3a"
        },
        {
          "value": "OUTBOUND",
          "label": "Outbound",
          "position": 1,
          "color": "green",
          "id": "9e6bfbd3-779e-57e0-953a-ca098c3f2c93"
        }
      ]
    },
    {
      "universalIdentifier": "2d9ca981-9fe9-46aa-a730-76ac72f22b06",
      type: FieldType.SELECT,
      "name": "channel",
      "label": "Channel",
      "icon": "IconMessageCircle",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "3047b0b1-badc-53fe-8764-6e0077f0fef1"
        },
        {
          "value": "PHONE",
          "label": "Phone",
          "position": 1,
          "color": "blue",
          "id": "f312033b-51f1-56b8-93fe-8100159bddb2"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 2,
          "color": "orange",
          "id": "2577d8ec-e3ac-5bb7-b3d3-8d78c28058ed"
        },
        {
          "value": "VOICE_CALL",
          "label": "Voice call",
          "position": 3,
          "color": "purple",
          "id": "79d38444-165e-52f7-ae63-98862e745b0f"
        },
        {
          "value": "OTHER",
          "label": "Other",
          "position": 4,
          "color": "gray",
          "id": "48cf9640-d498-5a9a-96ba-9ac7f182f9e9"
        }
      ]
    },
    {
      "universalIdentifier": "be9d8aaf-8571-4bbe-841e-96a576553abe",
      type: FieldType.DATE_TIME,
      "name": "occurredAt",
      "label": "Occurred at",
      "icon": "IconClock"
    },
    {
      "universalIdentifier": "48111c7d-8dc5-4796-b8fe-80e61cf21df4",
      type: FieldType.RELATION,
      "name": "rawSourceRecord",
      "label": "Raw source record",
      "icon": "IconDatabase",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "90d7133e-f132-495f-949f-07f5450b53e4",
      "relationTargetFieldMetadataUniversalIdentifier": "6a227323-bfa7-4eb9-ae1e-10bcf5f50a0a",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "rawSourceRecordId"
      }
    },
    {
      "universalIdentifier": "0b464587-bf67-4b7d-b0ce-d121ef0ef211",
      type: FieldType.BOOLEAN,
      "name": "actionRequired",
      "label": "Action required",
      "icon": "IconAlertCircle",
      "defaultValue": false
    },
    {
      "universalIdentifier": "22621e90-07cd-4c69-8d0c-1de02b5b10cc",
      type: FieldType.BOOLEAN,
      "name": "processedByKairos",
      "label": "Processed by Kairos",
      "icon": "IconRobot",
      "defaultValue": false
    },
    {
      "universalIdentifier": "fd4da697-5b4c-496e-8564-215dbd3de582",
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
          "id": "c9ad62f2-2f0c-59e6-92cc-a9bce1454dfa"
        },
        {
          "value": "LIKELY",
          "label": "Likely",
          "position": 1,
          "color": "yellow",
          "id": "39eb0afb-7735-5f3f-a2b1-da0c2e826055"
        },
        {
          "value": "UNVERIFIED",
          "label": "Unverified",
          "position": 2,
          "color": "gray",
          "id": "d7e1a822-65c5-5e0d-ba87-da97ba837bde"
        }
      ]
    },
    {
      "universalIdentifier": "b1afea22-0ac2-4df2-a463-527128d70e85",
      type: FieldType.RAW_JSON,
      "name": "metadata",
      "label": "Metadata",
      "icon": "IconJson",
      "isNullable": true
    },
    {
      "name": "name",
      "label": "Name",
      "description": "Name",
      "icon": "IconAbc",
      "isNullable": true,
      type: FieldType.TEXT,
      "universalIdentifier": "a96271bc-b23d-5695-87a4-b56c580191f7"
    }
  ]
},
);
