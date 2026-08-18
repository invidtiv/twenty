import { ViewFilterOperand, ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "672261ed-5a7a-42e9-9429-6f517289d480",
  "name": "Tomorrow's Check-ins",
  "objectUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  type: ViewType.TABLE,
  "icon": "IconCalendarTomorrow",
  "position": 0,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "075ec7ed-60ec-472e-893c-a7b5c87a0c5e",
      "fieldMetadataUniversalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
      "position": 0,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "394c40e4-17d1-44d6-99eb-d246b6f1c8d9",
      "fieldMetadataUniversalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
      "position": 1,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "888e0c5b-d429-4af8-b980-20917a9fc67f",
      "fieldMetadataUniversalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      "position": 2,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "b1a06e95-5b77-4ef5-b1ed-504828095dc3",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      "position": 3,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "cfccf15d-4d46-4f55-86be-166553999020",
      "fieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      "position": 4,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "44663d99-7b71-49fe-b2c3-8a9b4d6b81d9",
      "fieldMetadataUniversalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      "position": 5,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "8e6dac9a-8464-4be8-87d7-71bbccaabd2a",
      "fieldMetadataUniversalIdentifier": "2528d4cd-d904-47d0-8841-3448314a3977",
      "position": 6,
      "isVisible": true,
      "size": 260
    },
    {
      "universalIdentifier": "68ac5edc-f432-44ae-a1dc-0c1ecc325cba",
      "fieldMetadataUniversalIdentifier": "755a18b8-2fd1-43c6-931e-436edb682ebb",
      "position": 7,
      "isVisible": true,
      "size": 150
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "90e90106-10e8-4ff4-ba76-c6836261d5db",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      direction: ViewSortDirection.ASC
    }
  ],
  "filters": [
    {
      "universalIdentifier": "c4bf904a-851c-498e-a045-2fb2e28d98b5",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      operand: ViewFilterOperand.IS_RELATIVE,
      "value": "NEXT_1_DAY;;Europe/Lisbon;;",
      "viewFilterGroupUniversalIdentifier": null,
      "positionInViewFilterGroup": null
    },
    {
      "universalIdentifier": "b5f4c69c-b4f8-4cbb-abfc-308fe9a26531",
      "fieldMetadataUniversalIdentifier": "755a18b8-2fd1-43c6-931e-436edb682ebb",
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
