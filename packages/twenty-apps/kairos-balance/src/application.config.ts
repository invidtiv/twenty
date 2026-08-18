import { defineApplication } from 'twenty-sdk/define';

import { DEFAULT_ROLE_UNIVERSAL_IDENTIFIER } from './roles/default.role';

export const APPLICATION_UNIVERSAL_IDENTIFIER =
  'cf431edf-a0f4-418f-bd2e-a6c0a0f424f2';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Kairos Balance',
  description:
    'Native Twenty balance ledger for Kairos check-ins: each CHECK_IN Service Event becomes a Balance Entry through a workspace workflow. 25€ before 21:00, 30€ from 21:00 (Europe/Lisbon).',
  applicationVariables: {
    KAIROS_BALANCE_TIME_ZONE: {
      universalIdentifier: 'b98f36a6-16a4-46c4-9896-407501bd0cd1',
      description: 'Timezone for the 21:00 rate cut-off',
      value: 'Europe/Lisbon',
      isSecret: false,
    },
  },
  defaultRoleUniversalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
});
