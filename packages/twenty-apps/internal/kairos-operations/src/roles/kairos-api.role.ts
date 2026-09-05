import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineRole,
} from 'twenty-sdk/define';

import {
  BOOKING,
  COMMUNICATION,
  CONTACT_METHOD,
  KAIROS_API_ROLE_ID,
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

export default defineRole({
  universalIdentifier: KAIROS_API_ROLE_ID,
  label: 'Kairos Operations API',
  description:
    'Least-privilege role for Kairos ingestion, reconciliation, and operational queries.',
  icon: 'IconApi',
  canBeAssignedToUsers: false,
  canBeAssignedToAgents: false,
  canBeAssignedToApiKeys: true,
  canUpdateAllSettings: false,
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
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
});
