import { ViewFilterGroupLogicalOperator, ViewFilterOperand, ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "caf1736f-5442-4aab-897a-563d6e878cb2",
  "name": "Problems / Human Review",
  "objectUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
  type: ViewType.TABLE,
  "icon": "IconAlertTriangle",
  "position": 3,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "c1d0bf80-c6d8-40dd-92cc-a50f17af52ad",
      "fieldMetadataUniversalIdentifier": "645a4580-4dbc-476c-821e-5fa907dbb07f",
      "position": 0,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "2d61ad1d-2a57-4ec7-904f-1b2c3f4f0af8",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      "position": 1,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "c8743840-832a-44cd-8f04-bfe03f00b2ef",
      "fieldMetadataUniversalIdentifier": "5148a52d-0657-4d70-ace8-864ea11584ac",
      "position": 2,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "7b245abd-0080-4f83-ac1f-13738212da72",
      "fieldMetadataUniversalIdentifier": "6e18badf-e8bf-4204-8b1c-baf533ba2351",
      "position": 3,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "8fe5599b-b142-479f-b5b1-fd44c1b336f0",
      "fieldMetadataUniversalIdentifier": "a9c91804-a412-4a60-98f5-326a1f7671b6",
      "position": 4,
      "isVisible": true,
      "size": 220
    },
    {
      "universalIdentifier": "61d2b1ae-bc4f-4f33-a5a9-e5cfc99f08e0",
      "fieldMetadataUniversalIdentifier": "3972438d-4732-422f-b886-21b23e6b7d6e",
      "position": 5,
      "isVisible": true,
      "size": 180
    },
    {
      "universalIdentifier": "bbcd52b8-a919-4eb5-8ee2-91bb54d163d1",
      "fieldMetadataUniversalIdentifier": "fd72020a-d71e-49ad-a5ed-f08db4c82b67",
      "position": 6,
      "isVisible": true,
      "size": 140
    },
    {
      "universalIdentifier": "7f63b437-4f6d-45b2-adff-5e5cd502bde8",
      "fieldMetadataUniversalIdentifier": "2528d4cd-d904-47d0-8841-3448314a3977",
      "position": 7,
      "isVisible": true,
      "size": 300
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "3fe157eb-232e-4cea-b395-6606d1987248",
      "fieldMetadataUniversalIdentifier": "69faba04-200a-4e31-ba6a-fa6d2832a356",
      direction: ViewSortDirection.ASC
    }
  ],
  "filters": [
    {
      "universalIdentifier": "0c4c1bf3-628b-495e-a7f5-22a601e0c2c8",
      "fieldMetadataUniversalIdentifier": "3239c76c-53c7-4c2f-88e9-f84e773be608",
      operand: ViewFilterOperand.IS,
      "value": true,
      "viewFilterGroupUniversalIdentifier": "bc41ed8e-b0f9-4cc4-a43a-5bd95627daab",
      "positionInViewFilterGroup": 0
    },
    {
      "universalIdentifier": "dfad017c-1a4a-4c51-8207-005200f3985d",
      "fieldMetadataUniversalIdentifier": "755a18b8-2fd1-43c6-931e-436edb682ebb",
      operand: ViewFilterOperand.IS,
      "value": [
        "PROBLEM"
      ],
      "viewFilterGroupUniversalIdentifier": "bc41ed8e-b0f9-4cc4-a43a-5bd95627daab",
      "positionInViewFilterGroup": 1
    },
    {
      "universalIdentifier": "06e1f4e0-7af3-452a-ad31-322ece6ff9f5",
      "fieldMetadataUniversalIdentifier": "fd72020a-d71e-49ad-a5ed-f08db4c82b67",
      operand: ViewFilterOperand.IS,
      "value": [
        "HIGH",
        "CRITICAL"
      ],
      "viewFilterGroupUniversalIdentifier": "bc41ed8e-b0f9-4cc4-a43a-5bd95627daab",
      "positionInViewFilterGroup": 2
    }
  ],
  "filterGroups": [
    {
      "universalIdentifier": "bc41ed8e-b0f9-4cc4-a43a-5bd95627daab",
      logicalOperator: ViewFilterGroupLogicalOperator.OR,
      "positionInViewFilterGroup": 0
    }
  ]
},
);
