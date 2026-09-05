import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineRole,
} from 'twenty-sdk/define';

import {
  ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
  SALES_ROLE_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineRole({
  universalIdentifier: SALES_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'QuietSystems Sales',
  description:
    'Sales can manage startup application qualification and read brand assets needed for client handoff.',
  icon: 'IconTargetArrow',
  canBeAssignedToUsers: true,
  canBeAssignedToAgents: true,
  canUpdateAllSettings: false,
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  objectPermissions: [
    {
      objectUniversalIdentifier: STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier: ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
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
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.message.universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageParticipant
          .universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS
          .messageChannelMessageAssociation.universalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: false,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    },
  ],
  fieldPermissions: [
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
      fieldUniversalIdentifier: MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
      canUpdateFieldValue: false,
    },
    {
      objectUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
      fieldUniversalIdentifier: MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
      canUpdateFieldValue: false,
    },
  ],
});

