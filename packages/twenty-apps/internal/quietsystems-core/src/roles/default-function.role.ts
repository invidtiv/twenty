import { defineApplicationRole } from 'twenty-sdk/define';

import { DEFAULT_FUNCTION_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineApplicationRole({
  universalIdentifier: DEFAULT_FUNCTION_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'QuietSystems CRM default function role',
  description:
    'Runtime role for QuietSystems CRM automation functions. Read/write access is needed for intake, billing, operations, and asset synchronization; destructive access is disabled.',
  icon: 'IconRobot',
  canUpdateAllSettings: false,
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canBeAssignedToUsers: false,
  canBeAssignedToAgents: false,
  canBeAssignedToApiKeys: false,
});
