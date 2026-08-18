import { ViewCalendarLayout, ViewFilterOperand, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "6d7c6b1e-7956-4108-9fc9-90d645967bc2",
  "name": "Operations Calendar",
  "objectUniversalIdentifier": "35e25a5e-b749-4e7f-b018-bb441efbe138",
  type: ViewType.CALENDAR,
  calendarLayout: ViewCalendarLayout.MONTH,
  "calendarFieldMetadataUniversalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
  "icon": "IconCalendarEvent",
  "position": 1,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "14ff607a-b601-4647-9442-a583bea5e613",
      "fieldMetadataUniversalIdentifier": "474c021e-31f7-47cf-ab61-54ce3e8d6c44",
      "position": 0,
      "isVisible": true,
      "size": 240
    },
    {
      "universalIdentifier": "58d6ba95-417c-4184-803a-bd66a9193f8a",
      "fieldMetadataUniversalIdentifier": "c0f49285-7d30-4857-b750-4e2184f9680f",
      "position": 1,
      "isVisible": true,
      "size": 200
    },
    {
      "universalIdentifier": "da1b8441-2fff-4574-b600-e1374323bf49",
      "fieldMetadataUniversalIdentifier": "e68faee7-3490-4ac1-a45e-d16ea1fb0684",
      "position": 2,
      "isVisible": true,
      "size": 190
    },
    {
      "universalIdentifier": "f5c06427-627e-45cf-aecd-ea13bfcdd69d",
      "fieldMetadataUniversalIdentifier": "3f9b745b-ed19-46f2-98a0-48b4eafa977b",
      "position": 3,
      "isVisible": true,
      "size": 150
    },
    {
      "universalIdentifier": "f9150f5b-3a2a-473f-b4a4-b25d737ce29a",
      "fieldMetadataUniversalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
      "position": 4,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "5dfa1c29-ce2d-4a1b-bd75-30ebf315fb88",
      "fieldMetadataUniversalIdentifier": "bd896bce-0169-43b2-b443-ff230633b517",
      "position": 5,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "03969daa-28cf-4b14-aa70-ab8bf3097bbd",
      "fieldMetadataUniversalIdentifier": "5711b870-a6b0-4c40-9994-8a2d8fc1119f",
      "position": 6,
      "isVisible": true,
      "size": 220
    }
  ],
  "filters": [
    {
      "universalIdentifier": "e756969c-42c3-49c1-9e44-88aceecdb39f",
      "fieldMetadataUniversalIdentifier": "3f9b745b-ed19-46f2-98a0-48b4eafa977b",
      operand: ViewFilterOperand.IS_NOT,
      "value": [
        "CANCELLED",
        "COMPLETED"
      ],
      "viewFilterGroupUniversalIdentifier": null,
      "positionInViewFilterGroup": null
    }
  ]
},
);
