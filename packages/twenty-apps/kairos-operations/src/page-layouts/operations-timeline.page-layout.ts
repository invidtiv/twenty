import { PageLayoutTabLayoutMode, definePageLayout } from 'twenty-sdk/define';

export default definePageLayout(
{
  "universalIdentifier": "bafcb905-f890-4944-8074-76aa1577b511",
  "name": "Operations Timeline",
  "type": "STANDALONE_PAGE",
  "tabs": [
    {
      "universalIdentifier": "091eede1-b417-451b-9fd4-edca8007d8ad",
      "title": "Timeline",
      "position": 0,
      "icon": "IconTimeline",
      layoutMode: PageLayoutTabLayoutMode.CANVAS,
      "widgets": [
        {
          "universalIdentifier": "a3cbf47d-7368-471d-af6b-f27baea95e6c",
          "title": " ",
          "type": "FRONT_COMPONENT",
          "configuration": {
            "configurationType": "FRONT_COMPONENT",
            "frontComponentUniversalIdentifier": "50210c2d-e1c2-40ba-a7c9-f5282c7f0824"
          }
        }
      ]
    }
  ]
},
);
