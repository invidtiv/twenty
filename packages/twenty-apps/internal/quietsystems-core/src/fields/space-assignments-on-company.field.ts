import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  COMPANY_SPACE_ASSIGNMENTS_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: COMPANY_SPACE_ASSIGNMENTS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'spaceAssignments',
  label: 'Space Assignments',
  icon: 'IconBuildingWarehouse',
  relationTargetObjectMetadataUniversalIdentifier:
    SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    SPACE_ASSIGNMENT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
