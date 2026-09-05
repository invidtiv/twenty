import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  COMPANY_STARTUP_APPLICATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: COMPANY_STARTUP_APPLICATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'startupApplications',
  label: 'Startup Applications',
  icon: 'IconUserPlus',
  relationTargetObjectMetadataUniversalIdentifier:
    STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    STARTUP_APPLICATION_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
