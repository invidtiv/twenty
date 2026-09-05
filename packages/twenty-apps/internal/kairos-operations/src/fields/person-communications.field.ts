import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { COMMUNICATION, PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.communications,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.RELATION,
  name: 'communications',
  label: 'Operational communications',
  icon: 'IconMessages',
  relationTargetObjectMetadataUniversalIdentifier: COMMUNICATION.object,
  relationTargetFieldMetadataUniversalIdentifier: COMMUNICATION.fields.person,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
