import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineRole,
} from 'twenty-sdk/define';

import {
  ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  OPS_ROLE_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineRole({
  universalIdentifier: OPS_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'QuietSystems Ops',
  description:
    'Operations can manage space assignments, lease dates, work-order state, and client asset vault records.',
  icon: 'IconBuildingWarehouse',
  canBeAssignedToUsers: true,
  canBeAssignedToAgents: true,
  canUpdateAllSettings: false,
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  objectPermissions: [
    {
      objectUniversalIdentifier: SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier: ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
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
  ],
});
