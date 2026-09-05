import { defineApplication } from 'twenty-sdk/define';

import { APPLICATION_ID } from 'src/constants/identifiers';
import { kairosId } from 'src/constants/kairos-id';

export default defineApplication({
  universalIdentifier: APPLICATION_ID,
  displayName: 'Kairos Operations',
  description:
    'Workspace-isolated operational CRM schema and idempotent Kairos integration boundary.',
  author: 'Kairos',
  category: 'Productivity',
  applicationVariables: {
    KAIROS_DEFAULT_TIMEZONE: {
      universalIdentifier: 'b98f36a6-16a4-46c4-9896-407501bd0cd0',
      description: 'Default operational timezone for Kairos records',
      value: 'Europe/Lisbon',
      isSecret: false,
    },
    KAIROS_INTERNAL_API_URL: {
      universalIdentifier: kairosId('applicationVariable.internalApiUrl'),
      description:
        'Container-local Twenty API origin used by Kairos logic functions',
      value: 'http://127.0.0.1:2020',
      isSecret: false,
    },
  },
});
