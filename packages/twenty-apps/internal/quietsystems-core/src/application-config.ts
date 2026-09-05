import { defineApplication } from 'twenty-sdk/define';

import { APPLICATION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'QuietSystems Core CRM',
  description:
    'Core QuietSystems CRM schema, department views, localization guardrails, and intake webhook adapter.',
  author: 'QuietSystems',
  category: 'CRM',
  websiteUrl: 'https://quietsystems.eu',
  emailSupport: 'support@quietsystems.eu',
});
