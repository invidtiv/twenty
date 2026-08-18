import { FieldType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "80397f7b-0a62-4c57-8b19-4635ff897422",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.SELECT,
  "name": "preferredContactMethod",
  "label": "Preferred contact method",
  "icon": "IconMessageCircle",
  "defaultValue": "'UNKNOWN'",
  "options": [
    {
      "value": "WHATSAPP",
      "label": "WhatsApp",
      "position": 0,
      "color": "green",
      "id": "8e2cea64-1072-5982-b0c3-8e639b3666df"
    },
    {
      "value": "PHONE",
      "label": "Phone",
      "position": 1,
      "color": "blue",
      "id": "c16fa4ab-b283-5c2d-93dd-c98045fd7ddc"
    },
    {
      "value": "EMAIL",
      "label": "Email",
      "position": 2,
      "color": "orange",
      "id": "19ec5837-1bc3-554a-bef5-f4035bf6292e"
    },
    {
      "value": "UNKNOWN",
      "label": "Unknown",
      "position": 3,
      "color": "gray",
      "id": "99d361ab-3627-5c78-a42f-aab65104c0aa"
    }
  ]
},
);
