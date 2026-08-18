import { FieldType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "e0bc7f60-3a2b-43d5-9e6c-adbd82f3825e",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.MULTI_SELECT,
  "name": "personType",
  "label": "Person type",
  "icon": "IconUsersGroup",
  "options": [
    {
      "value": "GUEST",
      "label": "Guest",
      "position": 0,
      "color": "green",
      "id": "2a24297d-a739-5cbc-98a2-5865be839a04"
    },
    {
      "value": "COORDINATOR",
      "label": "Coordinator",
      "position": 1,
      "color": "blue",
      "id": "f1e19da8-41ee-5689-876f-dce1ad2d8ce8"
    },
    {
      "value": "COLLEAGUE",
      "label": "Colleague",
      "position": 2,
      "color": "turquoise",
      "id": "827c19cd-5bc8-57ec-ac81-854e939be878"
    },
    {
      "value": "OWNER",
      "label": "Owner",
      "position": 3,
      "color": "purple",
      "id": "cc74e0ff-3de2-56b2-9c24-d51b3a1b70ac"
    },
    {
      "value": "OPERATOR",
      "label": "Operator",
      "position": 4,
      "color": "orange",
      "id": "f9c4bde0-5d94-53f7-9883-966ebba94930"
    },
    {
      "value": "OTHER",
      "label": "Other",
      "position": 5,
      "color": "gray",
      "id": "5c98fdfb-0238-59fb-9b9b-299543a3e9b4"
    }
  ]
},
);
