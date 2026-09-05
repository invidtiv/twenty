import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineRole,
} from 'twenty-sdk/define';

import {
  BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  FINANCE_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineRole({
  universalIdentifier: FINANCE_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'QuietSystems Finance',
  description:
    'Finance can manage billing accounts, invoice status, Stripe transaction history, and related client company records.',
  icon: 'IconReceipt',
  canBeAssignedToUsers: true,
  canBeAssignedToAgents: true,
  canBeAssignedToApiKeys: true,
  canUpdateAllSettings: false,
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  objectPermissions: [
    {
      objectUniversalIdentifier: BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
  ],
});
