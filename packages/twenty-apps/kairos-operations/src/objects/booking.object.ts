import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  "nameSingular": "booking",
  "namePlural": "bookings",
  "labelSingular": "Booking",
  "labelPlural": "Bookings",
  "description": "Canonical operational record for a stay or service engagement.",
  "icon": "IconCalendarCheck",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
  "fields": [
    {
      "universalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
      type: FieldType.TEXT,
      "name": "name",
      "label": "Booking",
      "icon": "IconCalendarCheck"
    },
    {
      "universalIdentifier": "d74571d8-799d-4d44-834d-d1fa871dc894",
      type: FieldType.UUID,
      "name": "bookingId",
      "label": "Booking ID",
      "icon": "IconFingerprint",
      "isUnique": true
    },
    {
      "universalIdentifier": "2a75040e-8d62-4a60-9ef8-c64a7ffa1ef4",
      type: FieldType.SELECT,
      "name": "source",
      "label": "Source",
      "icon": "IconDatabaseImport",
      "defaultValue": "'MANUAL'",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "817a0b1f-2c6d-562f-9aff-6be0279b32dd"
        },
        {
          "value": "TALKGUEST",
          "label": "TalkGuest",
          "position": 1,
          "color": "blue",
          "id": "dbfa236c-540a-5172-a3df-6a6e36fd4de1"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 2,
          "color": "orange",
          "id": "403cf33c-7543-5159-b01b-2e0eb4620f80"
        },
        {
          "value": "MANUAL",
          "label": "Manual",
          "position": 3,
          "color": "gray",
          "id": "27dacb7f-63c5-5069-9f7b-579e92aaefc5"
        },
        {
          "value": "KAIROS",
          "label": "Kairos",
          "position": 4,
          "color": "purple",
          "id": "da6881d7-ac75-59d4-807d-57ef0e77fb29"
        },
        {
          "value": "FUTURE_API",
          "label": "Future API",
          "position": 5,
          "color": "turquoise",
          "id": "cce12638-f271-5d81-9daf-1ec1fc2c2029"
        }
      ]
    },
    {
      "universalIdentifier": "ffabfed6-ca36-48fb-923e-4e3f0d10601b",
      type: FieldType.TEXT,
      "name": "externalBookingId",
      "label": "External booking ID",
      "icon": "IconId",
      "isNullable": true
    },
    {
      "universalIdentifier": "0bed0dd7-b5d0-4bf3-9579-b3982235fa84",
      type: FieldType.TEXT,
      "name": "sourceKey",
      "label": "Source key",
      "description": "Unique source plus external ID key used for idempotent ingestion.",
      "icon": "IconKey",
      "isUnique": true
    },
    {
      "universalIdentifier": "1c80ecdd-2894-42d9-b6ff-ece72f106f9f",
      type: FieldType.LINKS,
      "name": "sourceUrl",
      "label": "Source URL",
      "icon": "IconLink",
      "isNullable": true
    },
    {
      "universalIdentifier": "55188b75-9b44-42f6-a844-4d06b29a2302",
      type: FieldType.DATE_TIME,
      "name": "sourceLastSeenAt",
      "label": "Source last seen at",
      "icon": "IconClock",
      "isNullable": true
    },
    {
      "universalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
      type: FieldType.RELATION,
      "name": "guest",
      "label": "Guest",
      "icon": "IconUser",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
      "relationTargetFieldMetadataUniversalIdentifier": "d774af19-617d-445a-911d-c3bff2c859cb",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "guestId"
      }
    },
    {
      "universalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      type: FieldType.RELATION,
      "name": "property",
      "label": "Property",
      "icon": "IconBuildingEstate",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "82c6e180-c624-4e8a-86e8-f5890f8adf6a",
      "relationTargetFieldMetadataUniversalIdentifier": "bc757472-8fbf-46aa-85ff-1bf7968301f6",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "propertyId"
      }
    },
    {
      "universalIdentifier": "7838c088-bb63-453e-a7c2-1c11614d4df8",
      type: FieldType.RELATION,
      "name": "contactMethods",
      "label": "Booking contact methods",
      "icon": "IconAddressBook",
      "relationTargetObjectMetadataUniversalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
      "relationTargetFieldMetadataUniversalIdentifier": "7e6829eb-b284-456e-b77c-108d3778ffe3",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      type: FieldType.RELATION,
      "name": "preferredContactMethod",
      "label": "Preferred booking contact",
      "icon": "IconPhoneCheck",
      "isNullable": true,
      "relationTargetObjectMetadataUniversalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
      "relationTargetFieldMetadataUniversalIdentifier": "6078cf4e-79a2-4aa8-aa1c-27bb59678e0e",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.SET_NULL,
        "joinColumnName": "preferredContactMethodId"
      }
    },
    {
      "universalIdentifier": "e9299c67-6514-47f7-8cb8-3a66971848b9",
      type: FieldType.RELATION,
      "name": "serviceEvents",
      "label": "Service events",
      "icon": "IconCalendarEvent",
      "relationTargetObjectMetadataUniversalIdentifier": "35e25a5e-b749-4e7f-b018-bb441efbe138",
      "relationTargetFieldMetadataUniversalIdentifier": "c0f49285-7d30-4857-b750-4e2184f9680f",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "16742110-d655-4720-968d-3d9dbc15baeb",
      type: FieldType.RELATION,
      "name": "communications",
      "label": "Communications",
      "icon": "IconMessages",
      "relationTargetObjectMetadataUniversalIdentifier": "980a5656-1746-4ee2-be74-ee622ab24887",
      "relationTargetFieldMetadataUniversalIdentifier": "99f1eec4-2d48-4036-908a-28a765ba8186",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "03e72644-12e7-484f-90c3-efa7e6b76630",
      type: FieldType.RELATION,
      "name": "sourceRecords",
      "label": "Source records",
      "icon": "IconDatabase",
      "relationTargetObjectMetadataUniversalIdentifier": "90d7133e-f132-495f-949f-07f5450b53e4",
      "relationTargetFieldMetadataUniversalIdentifier": "cff68dfc-340a-477c-a828-5572f54544c0",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "57422a39-a2ab-44c2-993c-c6cdf2209c19",
      type: FieldType.RELATION,
      "name": "tasks",
      "label": "Tasks",
      "icon": "IconChecklist",
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-1ba1-48ba-bc83-ef7e5990ed10",
      "relationTargetFieldMetadataUniversalIdentifier": "6b6b731b-29ec-4c4a-a1e7-79e02b3e577d",
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      }
    },
    {
      "universalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      type: FieldType.DATE_TIME,
      "name": "checkinAt",
      "label": "Check-in at",
      "icon": "IconLogin2",
      "isNullable": true
    },
    {
      "universalIdentifier": "4315310f-c4fe-45cc-9321-71477daf061f",
      type: FieldType.DATE_TIME,
      "name": "checkoutAt",
      "label": "Check-out at",
      "icon": "IconLogout2",
      "isNullable": true
    },
    {
      "universalIdentifier": "316938ac-11c3-4ce6-a5cb-001599a30d06",
      type: FieldType.DATE_TIME,
      "name": "arrivalWindowStart",
      "label": "Arrival window start",
      "icon": "IconClockPlay",
      "isNullable": true
    },
    {
      "universalIdentifier": "59338a52-062d-4a76-9628-70e3ed63c150",
      type: FieldType.DATE_TIME,
      "name": "arrivalWindowEnd",
      "label": "Arrival window end",
      "icon": "IconClockStop",
      "isNullable": true
    },
    {
      "universalIdentifier": "3df932b7-125c-4621-9e79-b4a1f8377a29",
      type: FieldType.TEXT,
      "name": "timezone",
      "label": "Timezone",
      "icon": "IconWorld",
      "defaultValue": "'Europe/Lisbon'"
    },
    {
      "universalIdentifier": "755a18b8-2fd1-43c6-931e-436edb682ebb",
      type: FieldType.SELECT,
      "name": "status",
      "label": "Status",
      "icon": "IconProgressCheck",
      "defaultValue": "'NEW'",
      "options": [
        {
          "value": "NEW",
          "label": "New",
          "position": 0,
          "color": "gray",
          "id": "279cf724-2376-50d6-9bee-b46eec49cb89"
        },
        {
          "value": "CONFIRMED",
          "label": "Confirmed",
          "position": 1,
          "color": "blue",
          "id": "213760bd-0998-5d42-959c-b4bedc05978b"
        },
        {
          "value": "PREPARING",
          "label": "Preparing",
          "position": 2,
          "color": "orange",
          "id": "a0f520b0-466d-51fb-b5e5-e40d754f0705"
        },
        {
          "value": "WAITING_FOR_GUEST",
          "label": "Waiting for Guest",
          "position": 3,
          "color": "yellow",
          "id": "3f077b35-d4ad-53d4-ac3d-1da1e2cb2a6b"
        },
        {
          "value": "READY",
          "label": "Ready",
          "position": 4,
          "color": "green",
          "id": "000a16ab-ecf6-5cb8-897b-bc6eecbb2693"
        },
        {
          "value": "IN_PROGRESS",
          "label": "In Progress",
          "position": 5,
          "color": "turquoise",
          "id": "94d407e3-dfb4-54cc-8321-e39f4a915d72"
        },
        {
          "value": "COMPLETED",
          "label": "Completed",
          "position": 6,
          "color": "green",
          "id": "0c4a3e7d-dfe7-5132-ab4a-db9fa137b423"
        },
        {
          "value": "CANCELLED",
          "label": "Cancelled",
          "position": 7,
          "color": "gray",
          "id": "b1482501-b806-5210-8793-e11672a57044"
        },
        {
          "value": "PROBLEM",
          "label": "Problem",
          "position": 8,
          "color": "red",
          "id": "b53d762a-35fb-51e8-9891-40256b714495"
        }
      ]
    },
    {
      "universalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      type: FieldType.SELECT,
      "name": "readinessStatus",
      "label": "Readiness",
      "icon": "IconClipboardCheck",
      "defaultValue": "'UNKNOWN'",
      "options": [
        {
          "value": "UNKNOWN",
          "label": "Unknown",
          "position": 0,
          "color": "gray",
          "id": "be03dce2-dd36-59b0-ae00-7aecc24fd00d"
        },
        {
          "value": "MISSING_CONTACT",
          "label": "Missing Contact",
          "position": 1,
          "color": "red",
          "id": "8796c7da-b523-574c-93dd-8681c07a4db9"
        },
        {
          "value": "MISSING_LOCATION",
          "label": "Missing Location",
          "position": 2,
          "color": "red",
          "id": "4b6c8e58-d67b-5a2c-ab32-18d90e596239"
        },
        {
          "value": "MISSING_ARRIVAL_DETAILS",
          "label": "Missing Arrival Details",
          "position": 3,
          "color": "orange",
          "id": "ca80c105-350b-5d88-8cb9-331b7e4aeafe"
        },
        {
          "value": "READY",
          "label": "Ready",
          "position": 4,
          "color": "green",
          "id": "c2278306-e021-5731-8594-611bf99dd249"
        },
        {
          "value": "NEEDS_REVIEW",
          "label": "Needs Review",
          "position": 5,
          "color": "yellow",
          "id": "56a742dc-da1b-5ef8-b18d-4e39fe7fb9fc"
        }
      ]
    },
    {
      "universalIdentifier": "fd72020a-d71e-49ad-a5ed-f08db4c82b67",
      type: FieldType.SELECT,
      "name": "riskLevel",
      "label": "Risk level",
      "icon": "IconAlertTriangle",
      "defaultValue": "'LOW'",
      "options": [
        {
          "value": "LOW",
          "label": "Low",
          "position": 0,
          "color": "green",
          "id": "db2982d1-2017-564d-b29f-28afe4a4644a"
        },
        {
          "value": "MEDIUM",
          "label": "Medium",
          "position": 1,
          "color": "yellow",
          "id": "52b0206a-837b-590b-a1dc-f439dfe835f2"
        },
        {
          "value": "HIGH",
          "label": "High",
          "position": 2,
          "color": "orange",
          "id": "30f1560b-9c21-58bd-a0ad-2a4db7f96661"
        },
        {
          "value": "CRITICAL",
          "label": "Critical",
          "position": 3,
          "color": "red",
          "id": "8aec28b0-2f20-5f9d-be83-4bac6eee50f3"
        }
      ]
    },
    {
      "universalIdentifier": "3239c76c-53c7-4c2f-88e9-f84e773be608",
      type: FieldType.BOOLEAN,
      "name": "needsHumanReview",
      "label": "Needs human review",
      "icon": "IconUserQuestion",
      "defaultValue": false
    },
    {
      "universalIdentifier": "2528d4cd-d904-47d0-8841-3448314a3977",
      type: FieldType.TEXT,
      "name": "missingInformation",
      "label": "Missing information",
      "icon": "IconListCheck",
      "isNullable": true
    },
    {
      "universalIdentifier": "183b9ba9-64d6-4b62-80b3-1a53a4c11c83",
      type: FieldType.DATE_TIME,
      "name": "lastReviewedAt",
      "label": "Last reviewed at",
      "icon": "IconClockCheck",
      "isNullable": true
    },
    {
      "universalIdentifier": "0b2aeefa-f36c-4c02-9e84-81427d6c404e",
      type: FieldType.TEXT,
      "name": "aiSummary",
      "label": "AI summary",
      "description": "Convenience summary; never authoritative.",
      "icon": "IconSparkles",
      "isNullable": true
    },
    {
      "universalIdentifier": "cdb1b93d-e4ca-4d8f-83be-1c5c4da4c064",
      type: FieldType.TEXT,
      "name": "internalNotes",
      "label": "Internal notes",
      "icon": "IconNotes",
      "isNullable": true
    },
    {
      "universalIdentifier": "d1b864bd-bfd2-4806-beeb-2eceed946eb6",
      type: FieldType.TEXT,
      "name": "specialInstructions",
      "label": "Special instructions",
      "icon": "IconInfoCircle",
      "isNullable": true
    },
    {
      "universalIdentifier": "7935f9a4-7a9b-4093-ad99-3a697efb2466",
      type: FieldType.RAW_JSON,
      "name": "rawMetadata",
      "label": "Raw metadata",
      "icon": "IconJson",
      "isNullable": true
    },
    {
      "universalIdentifier": "b801340b-33d9-44ad-aef8-da0cf93c9bf8",
      type: FieldType.RELATION,
      "name": "whatsappContactWatches",
      "label": "WhatsApp contact watches",
      "icon": "IconBrandWhatsapp",
      "isNullable": true,
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      },
      "relationTargetObjectMetadataUniversalIdentifier": "55adfa8c-5759-4b46-9c88-17a449f3b0b2",
      "relationTargetFieldMetadataUniversalIdentifier": "03b9c7f4-2aec-4844-9061-3cd79a0c8c08"
    }
  ]
},
);
