import { FieldType, OnDeleteAction, RelationType, defineObject } from 'twenty-sdk/define';

export default defineObject(
{
  "universalIdentifier": "55adfa8c-5759-4b46-9c88-17a449f3b0b2",
  "nameSingular": "whatsappContactWatch",
  "namePlural": "whatsappContactWatches",
  "labelSingular": "WhatsApp Contact Watch",
  "labelPlural": "WhatsApp Contact Watches",
  "description": "Booking-scoped WhatsApp monitoring activated after welcome-message confirmation.",
  "icon": "IconBrandWhatsapp",
  "isSearchable": true,
  "labelIdentifierFieldMetadataUniversalIdentifier": "948deda9-b07a-47ed-b571-f07112c1e5d2",
  "fields": [
    {
      "universalIdentifier": "9ae1d3ca-f4c7-4bd3-9595-e201dd39b790",
      type: FieldType.DATE_TIME,
      "name": "activatedAt",
      "label": "Activated at",
      "icon": "IconPlayerPlay",
      "isNullable": true
    },
    {
      "universalIdentifier": "221218d3-cdb3-4bd8-85ed-e436777431ce",
      type: FieldType.NUMBER,
      "name": "activationWatermarkMessageId",
      "label": "Activation message watermark",
      "icon": "IconHash",
      "isNullable": true,
      "defaultValue": 0
    },
    {
      "universalIdentifier": "03170ddb-2526-512c-b13a-4a2d492623e6",
      type: FieldType.RELATION,
      "name": "attachments",
      "label": "Attachments",
      "description": "WhatsappContactWatches tied to the Attachment",
      "icon": "IconFileImport",
      "isNullable": true,
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      },
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-bd3d-4c60-8dca-571c71d4447a",
      "relationTargetFieldMetadataUniversalIdentifier": "bbbc1130-cf5c-57e7-8c67-a1c50a883039"
    },
    {
      "universalIdentifier": "03b9c7f4-2aec-4844-9061-3cd79a0c8c08",
      type: FieldType.RELATION,
      "name": "booking",
      "label": "Booking",
      "icon": "IconCalendarCheck",
      "isNullable": true,
      "universalSettings": {
        "onDelete": OnDeleteAction.CASCADE,
        "relationType": RelationType.MANY_TO_ONE,
        "joinColumnName": "bookingId"
      },
      "relationTargetObjectMetadataUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "relationTargetFieldMetadataUniversalIdentifier": "b801340b-33d9-44ad-aef8-da0cf93c9bf8"
    },
    {
      "universalIdentifier": "ddde2fa4-72e7-4c76-9df2-72ea06ff58fe",
      type: FieldType.DATE_TIME,
      "name": "checkinAt",
      "label": "Check-in",
      "icon": "IconLogin2",
      "isNullable": true
    },
    {
      "universalIdentifier": "addd7a1a-9762-4bfa-95b8-e37eb5df52b2",
      type: FieldType.DATE_TIME,
      "name": "checkoutAt",
      "label": "Check-out",
      "icon": "IconLogout2",
      "isNullable": true
    },
    {
      "universalIdentifier": "4b53439d-9898-46a3-ab31-b78660ba9153",
      type: FieldType.TEXT,
      "name": "contactMethodId",
      "label": "Contact method ID",
      "icon": "IconAddressBook",
      "isNullable": true
    },
    {
      "universalIdentifier": "de7c6a0a-793c-442b-bd19-65330cd6ecde",
      type: FieldType.TEXT,
      "name": "guestName",
      "label": "Guest snapshot",
      "icon": "IconUser",
      "isNullable": true
    },
    {
      "universalIdentifier": "eaa629e6-8d84-46d3-8e9b-08651c3ecb7a",
      type: FieldType.RAW_JSON,
      "name": "metadata",
      "label": "Metadata",
      "icon": "IconJson",
      "isNullable": true
    },
    {
      "universalIdentifier": "52e816c7-7e4b-47bb-939f-e77444c7dae0",
      type: FieldType.DATE_TIME,
      "name": "monitorUntil",
      "label": "Monitor until",
      "icon": "IconPlayerStop",
      "isNullable": true
    },
    {
      "universalIdentifier": "948deda9-b07a-47ed-b571-f07112c1e5d2",
      type: FieldType.TEXT,
      "name": "name",
      "label": "Watch",
      "icon": "IconEye",
      "isNullable": true
    },
    {
      "universalIdentifier": "efff6f1c-514f-4876-8af5-cdee5eaab536",
      type: FieldType.TEXT,
      "name": "normalizedPhone",
      "label": "Normalized phone",
      "icon": "IconPhone",
      "isNullable": true
    },
    {
      "universalIdentifier": "00a8ba6f-8216-5416-8b3c-3cad2ad3d3cd",
      type: FieldType.RELATION,
      "name": "noteTargets",
      "label": "Notes",
      "description": "WhatsappContactWatches tied to the Note Target",
      "icon": "IconNotes",
      "isNullable": true,
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      },
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-fff0-4b44-be82-bda313884400",
      "relationTargetFieldMetadataUniversalIdentifier": "3c0267d9-65d3-50cc-be1b-1a64cc4fa373"
    },
    {
      "universalIdentifier": "0666a329-6dfc-4b02-8b0d-83adb447d282",
      type: FieldType.TEXT,
      "name": "propertyName",
      "label": "Property snapshot",
      "icon": "IconHome",
      "isNullable": true
    },
    {
      "universalIdentifier": "28fa0e40-94fa-48b6-85bd-7748c10dc761",
      type: FieldType.TEXT,
      "name": "serviceEventId",
      "label": "Activation event ID",
      "icon": "IconCalendarEvent",
      "isNullable": true
    },
    {
      "universalIdentifier": "c5532f51-34c5-4457-9b92-0237c5d0487f",
      type: FieldType.SELECT,
      "name": "status",
      "label": "Status",
      "icon": "IconActivity",
      "isNullable": true,
      "defaultValue": "'PENDING'",
      "options": [
        {
          "id": "5502df38-8f54-51f8-8bb5-9ab0cd64833a",
          "color": "yellow",
          "label": "Pending",
          "value": "PENDING",
          "position": 0
        },
        {
          "id": "f340a90a-02c6-53f4-b069-5a793799492a",
          "color": "green",
          "label": "Active",
          "value": "ACTIVE",
          "position": 1
        },
        {
          "id": "6463ef8f-1dd8-5e32-acbc-cf572d57a3ac",
          "color": "gray",
          "label": "Ended",
          "value": "ENDED",
          "position": 2
        },
        {
          "id": "d482f8ef-9967-566e-99d8-817181ce28ff",
          "color": "red",
          "label": "Needs review",
          "value": "NEEDS_REVIEW",
          "position": 3
        }
      ]
    },
    {
      "universalIdentifier": "709a8f38-2ae6-5ec6-add6-3f5dbd435759",
      type: FieldType.RELATION,
      "name": "taskTargets",
      "label": "Tasks",
      "description": "WhatsappContactWatches tied to the Task Target",
      "icon": "IconCheckbox",
      "isNullable": true,
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      },
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-5a9a-44e8-95df-771cd06d0fb1",
      "relationTargetFieldMetadataUniversalIdentifier": "b3c35575-27a9-50ba-bd2d-1156b18e40bf"
    },
    {
      "universalIdentifier": "d6c0d23f-1149-5776-8c7a-21b18e2198d8",
      type: FieldType.RELATION,
      "name": "timelineActivities",
      "label": "Timeline Activities",
      "description": "WhatsappContactWatches tied to the Timeline Activity",
      "icon": "IconTimelineEvent",
      "isNullable": true,
      "universalSettings": {
        "relationType": RelationType.ONE_TO_MANY
      },
      "relationTargetObjectMetadataUniversalIdentifier": "20202020-6736-4337-b5c4-8b39fae325a5",
      "relationTargetFieldMetadataUniversalIdentifier": "ae381edc-68c6-5206-aef2-ea47c94a6b30"
    },
    {
      "universalIdentifier": "b7119587-9ff3-4c20-9c60-b50ebb4cd6e1",
      type: FieldType.TEXT,
      "name": "watchKey",
      "label": "Watch key",
      "icon": "IconKey",
      "isNullable": true,
      "isUnique": true
    }
  ]
},
);
