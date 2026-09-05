import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  SPACE_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_LEASE_END_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_LEASE_START_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OCCUPANCY_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_WORK_ORDER_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_WORK_ORDER_SUMMARY_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: SPACE_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Space Assignments',
  objectUniversalIdentifier: SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconBuildingWarehouse',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    { universalIdentifier: 'bb23ecb9-3918-4e56-a092-30f93b5366aa', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_NAME_FIELD_UNIVERSAL_IDENTIFIER, position: 0, isVisible: true, size: 220 },
    { universalIdentifier: '9a8e9b12-072b-456a-ad00-4bd8aa17da42', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_OCCUPANCY_FIELD_UNIVERSAL_IDENTIFIER, position: 1, isVisible: true, size: 150 },
    { universalIdentifier: 'b63e520c-cc1e-4839-8766-260e10f6714f', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_WORK_ORDER_STATUS_FIELD_UNIVERSAL_IDENTIFIER, position: 2, isVisible: true, size: 160 },
    { universalIdentifier: '2076abc5-f986-49b5-aba3-35a39fe2635a', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_LEASE_START_FIELD_UNIVERSAL_IDENTIFIER, position: 3, isVisible: true, size: 150 },
    { universalIdentifier: '1fc87b6b-9cce-4b47-b275-16974521d4c1', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_LEASE_END_FIELD_UNIVERSAL_IDENTIFIER, position: 4, isVisible: true, size: 150 },
    { universalIdentifier: 'dbb03fea-52ff-4c7b-950d-af47a6beb27b', fieldMetadataUniversalIdentifier: SPACE_ASSIGNMENT_WORK_ORDER_SUMMARY_FIELD_UNIVERSAL_IDENTIFIER, position: 5, isVisible: true, size: 260 },
  ],
});
