import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "35e25a5e-b749-4e7f-b018-bb441efbe138",
  "nameSingular": "serviceEvent",
  "namePlural": "serviceEvents",
  "labelSingular": "Service Event",
  "labelPlural": "Service Events",
  "description": "Canonical operational and calendar events for bookings.",
  "icon": "IconCalendarEvent",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "474c021e-31f7-47cf-ab61-54ce3e8d6c44",
  "fields": [
    {
      "universalIdentifier": "474c021e-31f7-47cf-ab61-54ce3e8d6c44",
      type: FieldType.TEXT,
      "name": "title",
      "label": "Title",
      "icon": "IconCalendarEvent"
    },
    {
      "universalIdentifier": "db1aa117-c213-4e58-9542-95c962ebd916",
      type: FieldType.TEXT,
      "name": "sourceEventKey",
      "label": "Source event key",
      "description": "Stable source key used to make event upserts idempotent.",
      "icon": "IconKey",
      "isUnique": true
    },
    {
      "universalIdentifier": "c0f49285-7d30-4857-b750-4e2184f9680f",
      type: FieldType.RELATION,
      "name": "booking",
      "label": "Booking",
      "icon": "IconCalendarCheck",
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "e9299c67-6514-47f7-8cb8-3a66971848b9",
      "universalSettings": {
        "relationType": RelationType.MANY_TO_ONE,
        "onDelete": OnDeleteAction.CASCADE,
        "joinColumnName": "bookingId"
      }
    },
    {
      "universalIdentifier": "e68faee7-3490-4ac1-a45e-d16ea1fb0684",
      type: FieldType.SELECT,
      "name": "eventType",
      "label": "Event type",
      "icon": "IconCategory",
      "options": [
        {
          "value": "GUEST_CONTACT_DEADLINE",
          "label": "Guest contact deadline",
          "position": 0,
          "color": "orange",
          "id": "44e1b74b-8dab-5d33-b803-8daf5e8fbf7b"
        },
        {
          "value": "DAY_BEFORE_PREPARATION",
          "label": "Day-before preparation",
          "position": 1,
          "color": "yellow",
          "id": "4cbd4aaf-b8d2-5bf4-b14c-eaef99e9399d"
        },
        {
          "value": "CHECK_IN",
          "label": "Check-in",
          "position": 2,
          "color": "green",
          "id": "79a36c2e-b184-560c-b665-2f9caf6dc02a"
        },
        {
          "value": "KEY_HANDOVER",
          "label": "Key handover",
          "position": 3,
          "color": "blue",
          "id": "38d53c0e-e253-5d56-87d8-7e32a5b2fccd"
        },
        {
          "value": "FOLLOW_UP",
          "label": "Follow-up",
          "position": 4,
          "color": "turquoise",
          "id": "da173ffb-d83c-5d0f-a3bc-2e65bcb058cb"
        },
        {
          "value": "CHECK_OUT",
          "label": "Check-out",
          "position": 5,
          "color": "purple",
          "id": "00b485d3-cce5-5cf2-8963-b59b4847b777"
        },
        {
          "value": "CUSTOM",
          "label": "Custom",
          "position": 6,
          "color": "gray",
          "id": "f955869f-4a8f-5dc6-a34b-028ff8d6253e"
        }
      ]
    },
    {
      "universalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
      type: FieldType.DATE_TIME,
      "name": "startsAt",
      "label": "Starts at",
      "icon": "IconClockPlay"
    },
    {
      "universalIdentifier": "bd896bce-0169-43b2-b443-ff230633b517",
      type: FieldType.DATE_TIME,
      "name": "endsAt",
      "label": "Ends at",
      "icon": "IconClockStop",
      "isNullable": true
    },
    {
      "universalIdentifier": "3f9b745b-ed19-46f2-98a0-48b4eafa977b",
      type: FieldType.SELECT,
      "name": "status",
      "label": "Status",
      "icon": "IconProgressCheck",
      "defaultValue": "'SCHEDULED'",
      "options": [
        {
          "value": "SCHEDULED",
          "label": "Scheduled",
          "position": 0,
          "color": "blue",
          "id": "816a6158-c59c-5d82-a0fa-03e05fb152bb"
        },
        {
          "value": "READY",
          "label": "Ready",
          "position": 1,
          "color": "green",
          "id": "eaee3354-14f6-5f4e-8de7-fdd3e5271397"
        },
        {
          "value": "IN_PROGRESS",
          "label": "In Progress",
          "position": 2,
          "color": "turquoise",
          "id": "94472c37-815b-5705-ac4a-6d362fe4c8a2"
        },
        {
          "value": "COMPLETED",
          "label": "Completed",
          "position": 3,
          "color": "green",
          "id": "9b59adbe-78a2-57cb-8e8c-2cc7b719d2e9"
        },
        {
          "value": "CANCELLED",
          "label": "Cancelled",
          "position": 4,
          "color": "gray",
          "id": "8d3e7cbd-748c-57ab-a704-02452a1fa692"
        },
        {
          "value": "PROBLEM",
          "label": "Problem",
          "position": 5,
          "color": "red",
          "id": "cd2af254-1be9-5b14-97fb-8289a26ad44c"
        }
      ]
    },
    {
      "universalIdentifier": "5711b870-a6b0-4c40-9994-8a2d8fc1119f",
      type: FieldType.TEXT,
      "name": "location",
      "label": "Location",
      "icon": "IconMapPin",
      "isNullable": true
    },
    {
      "universalIdentifier": "024afa54-4cf7-43ba-844a-d25534e214fb",
      type: FieldType.TEXT,
      "name": "notes",
      "label": "Notes",
      "icon": "IconNotes",
      "isNullable": true
    },
    {
      "universalIdentifier": "68077ba7-2d92-490f-9821-1bed83a171a9",
      type: FieldType.SELECT,
      "name": "source",
      "label": "Source",
      "icon": "IconDatabaseImport",
      "defaultValue": "'KAIROS'",
      "options": [
        {
          "value": "WHATSAPP",
          "label": "WhatsApp",
          "position": 0,
          "color": "green",
          "id": "8a545fba-ce4c-5d13-a911-4d5f8bc432a3"
        },
        {
          "value": "TALKGUEST",
          "label": "TalkGuest",
          "position": 1,
          "color": "blue",
          "id": "baa45ca4-deef-5cf0-a52a-618b6133d5d5"
        },
        {
          "value": "EMAIL",
          "label": "Email",
          "position": 2,
          "color": "orange",
          "id": "f96441f8-fc1d-5191-85dc-d5397609922b"
        },
        {
          "value": "MANUAL",
          "label": "Manual",
          "position": 3,
          "color": "gray",
          "id": "3efe83ec-36bf-59a1-9290-214d8e2ba603"
        },
        {
          "value": "KAIROS",
          "label": "Kairos",
          "position": 4,
          "color": "purple",
          "id": "777f9076-7bf7-5af8-b927-18d990d3b582"
        },
        {
          "value": "FUTURE_API",
          "label": "Future API",
          "position": 5,
          "color": "turquoise",
          "id": "863c5dae-f321-580d-872b-6c99b58d803e"
        }
      ]
    },
    {
      "universalIdentifier": "deee0eb0-55f6-4b01-a097-cd2a70ef2f07",
      type: FieldType.TEXT,
      "name": "externalEventId",
      "label": "External event ID",
      "icon": "IconId",
      "isNullable": true
    },
    {
      "universalIdentifier": "a46671f2-af84-4c72-a457-1d716f7b11a6",
      type: FieldType.BOOLEAN,
      "name": "kairosRemindersEnabled",
      "label": "Kairos reminders enabled",
      "icon": "IconBell",
      "defaultValue": true
    },
    {
      "universalIdentifier": "7111008f-0dbc-48b7-8f8b-510ac69c2e3a",
      type: FieldType.TEXT,
      "name": "externalCalendarProvider",
      "label": "Calendar provider",
      "icon": "IconCalendarCog",
      "isNullable": true
    },
    {
      "universalIdentifier": "09dea7ac-aba5-402a-9257-6756b120c55f",
      type: FieldType.TEXT,
      "name": "externalCalendarId",
      "label": "External calendar ID",
      "icon": "IconCalendar",
      "isNullable": true
    },
    {
      "universalIdentifier": "b5e6f80e-1f5f-4667-bb72-557064776a9c",
      type: FieldType.TEXT,
      "name": "externalCalendarEventId",
      "label": "External calendar event ID",
      "icon": "IconCalendarEvent",
      "isNullable": true
    },
    {
      "universalIdentifier": "0ac8e43a-755b-46cb-90f4-d0115c2f3ee2",
      type: FieldType.DATE_TIME,
      "name": "lastCalendarSyncAt",
      "label": "Last calendar sync at",
      "icon": "IconRefresh",
      "isNullable": true
    },
    {
      "universalIdentifier": "872cae07-6ba0-4e08-a4f8-4df70debcea4",
      type: FieldType.SELECT,
      "name": "calendarSyncStatus",
      "label": "Calendar sync status",
      "icon": "IconCloudCheck",
      "defaultValue": "'NOT_CONFIGURED'",
      "options": [
        {
          "value": "NOT_CONFIGURED",
          "label": "Not configured",
          "position": 0,
          "color": "gray",
          "id": "aa03474d-c11c-5b92-b8a6-001a0795cc13"
        },
        {
          "value": "PENDING",
          "label": "Pending",
          "position": 1,
          "color": "yellow",
          "id": "dc9d0879-60fc-5d8d-a8d7-9c9b2e28a5d9"
        },
        {
          "value": "SYNCED",
          "label": "Synced",
          "position": 2,
          "color": "green",
          "id": "3878db75-902f-559e-a8da-e50375693aaf"
        },
        {
          "value": "ERROR",
          "label": "Error",
          "position": 3,
          "color": "red",
          "id": "342e9bfc-e586-5677-a8ad-53598ed2414a"
        }
      ]
    },
    {
      "name": "name",
      "label": "Name",
      "description": "Name",
      "icon": "IconAbc",
      "isNullable": true,
      type: FieldType.TEXT,
      "universalIdentifier": "d7c80d0c-62ff-55e1-b588-4a5c54d15c15"
    },
    {
      "universalIdentifier": "5701242b-2e84-4d33-aad8-bbe5c573ff2d",
      type: FieldType.NUMBER,
      "name": "checkValue",
      "label": "Check value (€)",
      "icon": "IconCurrencyEuro",
      "description": "Earned per check: 25€ when the check-in starts before 21:00, 30€ from 21:00 (Europe/Lisbon)."
    }
  ]
},
);
