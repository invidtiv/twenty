import { ViewFilterOperand, ViewSortDirection, ViewType, ViewVisibility, defineView } from 'twenty-sdk/define';

export default defineView(
{
  "universalIdentifier": "1a508295-522c-4dac-b826-6d275d62b8ff",
  "name": "Today",
  "objectUniversalIdentifier": "35e25a5e-b749-4e7f-b018-bb441efbe138",
  type: ViewType.TABLE,
  "icon": "IconCalendarDue",
  "position": 0,
  "isCompact": false,
  visibility: ViewVisibility.WORKSPACE,
  "fields": [
    {
      "universalIdentifier": "d86c6a69-9592-4ba6-9a51-84c710721703",
      "fieldMetadataUniversalIdentifier": "474c021e-31f7-47cf-ab61-54ce3e8d6c44",
      "position": 0,
      "isVisible": true,
      "size": 183
    },
    {
      "universalIdentifier": "17290908-bb04-4769-ae28-6441377275f3",
      "fieldMetadataUniversalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
      "position": 1,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "8ee0650d-a91a-489b-84a5-f5c53c03d283",
      "fieldMetadataUniversalIdentifier": "bd896bce-0169-43b2-b443-ff230633b517",
      "position": 2,
      "isVisible": true,
      "size": 170
    },
    {
      "universalIdentifier": "466e580a-3ab1-4729-afa0-94769533c35e",
      "fieldMetadataUniversalIdentifier": "c0f49285-7d30-4857-b750-4e2184f9680f",
      "position": 3,
      "isVisible": true,
      "size": 200
    },
    {
      "universalIdentifier": "817e2829-0e93-404b-abe7-91945d9f75b4",
      "fieldMetadataUniversalIdentifier": "e68faee7-3490-4ac1-a45e-d16ea1fb0684",
      "position": 4,
      "isVisible": true,
      "size": 190
    },
    {
      "universalIdentifier": "67d95568-ba5b-4241-84fc-d250b3e04740",
      "fieldMetadataUniversalIdentifier": "3f9b745b-ed19-46f2-98a0-48b4eafa977b",
      "position": 5,
      "isVisible": true,
      "size": 150
    },
    {
      "universalIdentifier": "51101710-9d92-4535-9365-5c317bb9a15b",
      "fieldMetadataUniversalIdentifier": "5711b870-a6b0-4c40-9994-8a2d8fc1119f",
      "position": 6,
      "isVisible": true,
      "size": 220
    }
  ],
  "sorts": [
    {
      "universalIdentifier": "1e51457a-b38c-4557-a993-318de6c3c2b9",
      "fieldMetadataUniversalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
      direction: ViewSortDirection.ASC
    }
  ],
  "filters": [
    {
      "universalIdentifier": "549d2e1e-ade8-44f5-9d39-2101b2da56a0",
      "fieldMetadataUniversalIdentifier": "ddd6e50c-f61d-48d8-9812-e34ce1794738",
      operand: ViewFilterOperand.IS_TODAY,
      "value": "",
      "viewFilterGroupUniversalIdentifier": null,
      "positionInViewFilterGroup": null
    },
    {
      "universalIdentifier": "b6062d52-e951-4fea-8a54-1bc7e5991dfa",
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
