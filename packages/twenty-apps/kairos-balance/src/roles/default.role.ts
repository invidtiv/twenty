import { SystemPermissionFlag, defineRole } from 'twenty-sdk/define';

import { BALANCE_ENTRY_UNIVERSAL_IDENTIFIER } from '../objects/balance-entry.object';
import {
  PROPERTY_UNIVERSAL_IDENTIFIER,
  SERVICE_EVENT_UNIVERSAL_IDENTIFIER,
} from '../constants/kairos';

export const DEFAULT_ROLE_UNIVERSAL_IDENTIFIER =
  '89bd7eb3-3224-4686-8e06-338b66130fb2';

export default defineRole({
  universalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Kairos Balance role',
  description:
    'Role used by the Kairos Balance app functions to maintain balance entries.',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: false,
  canBeAssignedToApiKeys: false,
  objectPermissions: [
    {
      objectUniversalIdentifier: BALANCE_ENTRY_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier: SERVICE_EVENT_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier: PROPERTY_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
  ],
  permissionFlagUniversalIdentifiers: [SystemPermissionFlag.APPLICATIONS],
});