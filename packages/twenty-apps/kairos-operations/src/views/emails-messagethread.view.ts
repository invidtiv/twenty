import { ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "73a99d48-554c-408d-a786-044f351d969f",
  "name": "Emails",
  "objectUniversalIdentifier": "20202020-849a-4c3e-84f5-a25a7d802271",
  type: ViewType.TABLE,
  "icon": "IconMail",
  "position": 1,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "13d47ad7-f8c2-46a8-810e-6d8b8c4d9602",
      "fieldMetadataUniversalIdentifier": "a8ddbf8c-1137-45d1-b89e-5ffbd83f67c8",
      "position": 0,
      "isVisible": true,
      "size": 360
    },
    {
      "universalIdentifier": "063bbf1d-f613-422b-a6be-c6b4628c48d3",
      "fieldMetadataUniversalIdentifier": "20202020-3115-404f-aade-e1154b28e35a",
      "position": 1,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "9e1b5af5-0cd5-4631-aa91-b3ecbdd84456",
      "fieldMetadataUniversalIdentifier": "71583a40-84a4-5ee6-85d5-1939c38da9ee",
      "position": 2,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "e2d97e09-2db2-422b-8171-38616b6fdfa8",
      "fieldMetadataUniversalIdentifier": "4169d73e-6223-5f86-901b-a7d77f9e2469",
      "position": 3,
      "isVisible": true,
      "size": 180
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "3fdc089d-4f41-49c3-a7d6-1b2e88279f9a",
      "fieldMetadataUniversalIdentifier": "71583a40-84a4-5ee6-85d5-1939c38da9ee",
      direction: ViewSortDirection.DESC
    }
  ]
},
);
