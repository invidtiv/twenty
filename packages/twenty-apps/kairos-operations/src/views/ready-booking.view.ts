import { ViewFilterOperand, ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "e0316cf4-29ea-4169-ab14-9aac27f36377",
  "name": "Ready",
  "objectUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  type: ViewType.TABLE,
  "icon": "IconCircleCheck",
  "position": 2,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "c56dde1f-05ab-41da-ba2f-7a9edfa79881",
      "fieldMetadataUniversalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
      "position": 0,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "051b39c2-0dec-40ed-9943-f6569f1552c3",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      "position": 1,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "852dbdda-c1d9-492a-a8f3-a7a9243eb01a",
      "fieldMetadataUniversalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
      "position": 2,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "b2c82a72-a79a-4e27-81eb-1305db154b6a",
      "fieldMetadataUniversalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      "position": 3,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "5570b11f-d7b7-4ef8-9fdb-98ad02610a9c",
      "fieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      "position": 4,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "9fa05e37-71a0-4a30-bf8b-929823b7ae13",
      "fieldMetadataUniversalIdentifier": "755a18b8-2fd1-43c6-931e-436edb682ebb",
      "position": 5,
      "isVisible": true,
      "size": 150
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "6c8624b9-52d4-43e1-bd47-e5264df63b2d",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      direction: ViewSortDirection.ASC
    }
  ],
  "filters": [
    {
      "universalIdentifier": "ebdf7e3c-3560-41a1-a083-fe919908b383",
      "fieldMetadataUniversalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      operand: ViewFilterOperand.IS,
      "value": [
        "READY"
      ],
      "viewFilterGroupUniversalIdentifier": null,
      "positionInViewFilterGroup": null
    },
    {
      "universalIdentifier": "f11d7b08-4787-4fcc-b2ad-cde3a4b9d965",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      operand: ViewFilterOperand.IS_IN_FUTURE,
      "value": "",
      "viewFilterGroupUniversalIdentifier": null,
      "positionInViewFilterGroup": null
    },
    {
      "universalIdentifier": "405b1117-1670-430b-8e58-62db5b8f60a5",
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
