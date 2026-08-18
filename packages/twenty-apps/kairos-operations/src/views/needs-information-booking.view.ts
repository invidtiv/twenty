import { ViewFilterGroupLogicalOperator, ViewFilterOperand, ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "ae2215a3-f9ea-40e6-b4fb-1861ce8e192e",
  "name": "Needs Information",
  "objectUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  type: ViewType.TABLE,
  "icon": "IconInfoTriangle",
  "position": 1,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "698e095c-501f-4f1b-a3fc-05d4cc74d060",
      "fieldMetadataUniversalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
      "position": 0,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "d74bb242-be1b-49f6-ac78-2606a05b39b1",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      "position": 1,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "9a096e4b-dbf1-4188-9941-afeaeb06e8ab",
      "fieldMetadataUniversalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
      "position": 2,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "7c9ce5f5-a559-43b8-92f1-39007e0a761f",
      "fieldMetadataUniversalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      "position": 3,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "659a29cf-d8ed-4464-84c8-6813f702c525",
      "fieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      "position": 4,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "365f3808-a745-45a1-8de7-34f1b9a9fdc2",
      "fieldMetadataUniversalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      "position": 5,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "3356d186-ebfd-4410-b2d4-3c85c01e4b3d",
      "fieldMetadataUniversalIdentifier": "2528d4cd-d904-47d0-8841-3448314a3977",
      "position": 6,
      "isVisible": true,
      "size": 300
    },
    {
      "universalIdentifier": "a3fb323a-edc5-461e-b1cc-c63e854c8bfc",
      "fieldMetadataUniversalIdentifier": "3239c76c-53c7-4c2f-88e9-f84e773be608",
      "position": 7,
      "isVisible": true,
      "size": 150
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "7fff9e88-ed39-4054-8913-05947eb17874",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      direction: ViewSortDirection.ASC
    }
  ],
  "filters": [
    {
      "universalIdentifier": "1b8e15fb-3eb3-4029-9221-2614d6065d51",
      "fieldMetadataUniversalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      operand: ViewFilterOperand.IS_NOT,
      "value": [
        "READY"
      ],
      "viewFilterGroupUniversalIdentifier": "1f147506-37cc-4255-8c96-0ced5d319ef8",
      "positionInViewFilterGroup": 0
    },
    {
      "universalIdentifier": "0deedb2e-6db3-49c2-81ce-229e6cf31d64",
      "fieldMetadataUniversalIdentifier": "3239c76c-53c7-4c2f-88e9-f84e773be608",
      operand: ViewFilterOperand.IS,
      "value": true,
      "viewFilterGroupUniversalIdentifier": "1f147506-37cc-4255-8c96-0ced5d319ef8",
      "positionInViewFilterGroup": 1
    },
    {
      "universalIdentifier": "ee712244-042d-40e2-880e-d28b2bc19106",
      "fieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      operand: ViewFilterOperand.IS_EMPTY,
      "value": "",
      "viewFilterGroupUniversalIdentifier": "1f147506-37cc-4255-8c96-0ced5d319ef8",
      "positionInViewFilterGroup": 2
    }
  ],
  "filterGroups": [
    {
      "universalIdentifier": "1f147506-37cc-4255-8c96-0ced5d319ef8",
      logicalOperator: ViewFilterGroupLogicalOperator.OR,
      "positionInViewFilterGroup": 0
    }
  ]
},
);
