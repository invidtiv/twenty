import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineApplicationRole,
} from 'twenty-sdk/define';

import {
  BOOKING,
  COMMUNICATION,
  CONTACT_METHOD,
  DEFAULT_ROLE_ID,
  PROPERTY,
  SERVICE_EVENT,
  SOURCE_RECORD,
  WHATSAPP_CONTACT_WATCH,
} from 'src/constants/identifiers';

const mutableObjectPermission = (objectUniversalIdentifier: string) => ({
  objectUniversalIdentifier,
  canReadObjectRecords: true,
  canUpdateObjectRecords: true,
  canSoftDeleteObjectRecords: false,
  canDestroyObjectRecords: false,
});

const readOnlyObjectPermission = (objectUniversalIdentifier: string) => ({
  objectUniversalIdentifier,
  canReadObjectRecords: true,
  canUpdateObjectRecords: false,
  canSoftDeleteObjectRecords: false,
  canDestroyObjectRecords: false,
});

export default defineApplicationRole({
  universalIdentifier: DEFAULT_ROLE_ID,
  label: 'Kairos Operations function role',
  description:
    'Least-privilege record access for Kairos ingestion, reconciliation, and operational queries.',
  icon: 'IconRobot',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToUsers: false,
  canBeAssignedToAgents: false,
  canBeAssignedToApiKeys: false,
  objectPermissions: [
    mutableObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
    ),
    mutableObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
    ),
    readOnlyObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread.universalIdentifier,
    ),
    readOnlyObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.message.universalIdentifier,
    ),
    readOnlyObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageParticipant
        .universalIdentifier,
    ),
    readOnlyObjectPermission(
      STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageChannelMessageAssociation
        .universalIdentifier,
    ),
    mutableObjectPermission(PROPERTY.object),
    mutableObjectPermission(BOOKING.object),
    mutableObjectPermission(CONTACT_METHOD.object),
    mutableObjectPermission(SERVICE_EVENT.object),
    mutableObjectPermission(COMMUNICATION.object),
    mutableObjectPermission(SOURCE_RECORD.object),
    mutableObjectPermission(WHATSAPP_CONTACT_WATCH.object),
  ],
  fieldPermissions: [],
  permissionFlagUniversalIdentifiers: [],
});
