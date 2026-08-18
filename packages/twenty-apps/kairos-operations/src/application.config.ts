import { defineApplication } from 'twenty-sdk/define';

export default defineApplication(
{
  "universalIdentifier": "ef201904-ead2-44a6-b839-aa2db4787a93",
  "displayName": "Kairos Operations",
  "description": "Workspace-isolated operational CRM schema and idempotent Kairos integration boundary.",
  "applicationVariables": {
    "KAIROS_DEFAULT_TIMEZONE": {
      "universalIdentifier": "b98f36a6-16a4-46c4-9896-407501bd0cd0",
      "description": "Default operational timezone for Kairos records",
      "isSecret": false,
      "value": "Europe/Lisbon"
    },
    "KAIROS_INTERNAL_API_URL": {
      "universalIdentifier": "20251416-672f-4342-a521-6768739810e7",
      "description": "Container-local Twenty API origin used by Kairos logic functions",
      "isSecret": false,
      "value": "http://127.0.0.1:2020"
    }
  },
  "defaultRoleUniversalIdentifier": "ed373830-d398-4534-928c-ef53f4200117"
},
);
