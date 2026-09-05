import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import {
  COMPANY_SPACE_ASSIGNMENTS_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_LEASE_END_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_LEASE_START_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_OCCUPANCY_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_WORK_ORDER_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENT_WORK_ORDER_SUMMARY_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: SPACE_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'spaceAssignment',
  namePlural: 'spaceAssignments',
  labelSingular: 'Space Assignment',
  labelPlural: 'Space Assignments',
  description:
    'Operations record for workspace occupancy, lease dates, and facilities work-order state.',
  icon: 'IconBuildingWarehouse',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier:
    SPACE_ASSIGNMENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: SPACE_ASSIGNMENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Space Assignment Name',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier:
        SPACE_ASSIGNMENT_OCCUPANCY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'occupancyStatus',
      label: 'Occupancy Status',
      icon: 'IconDoor',
      defaultValue: "'UNASSIGNED'",
      options: [
        { id: '37c80cc1-f5bb-4237-bc0b-65b2b6bd5af8', value: 'UNASSIGNED', label: 'Unassigned', position: 0, color: 'gray' },
        { id: 'bdb437e1-ef42-4dab-a499-d36cbf3c5c14', value: 'RESERVED', label: 'Reserved', position: 1, color: 'blue' },
        { id: '9164941d-8692-4101-87be-2bac00f33854', value: 'OCCUPIED', label: 'Occupied', position: 2, color: 'green' },
        { id: '5bccadcf-d11a-42fe-8c7f-f1cc378bbe38', value: 'PAUSED', label: 'Paused', position: 3, color: 'orange' },
      ],
    },
    {
      universalIdentifier:
        SPACE_ASSIGNMENT_LEASE_START_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'leaseStartDate',
      label: 'Lease Start Date',
      icon: 'IconCalendarPlus',
      isNullable: true,
    },
    {
      universalIdentifier: SPACE_ASSIGNMENT_LEASE_END_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'leaseEndDate',
      label: 'Lease End Date',
      icon: 'IconCalendarMinus',
      isNullable: true,
    },
    {
      universalIdentifier:
        SPACE_ASSIGNMENT_WORK_ORDER_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'workOrderStatus',
      label: 'Work Order Status',
      icon: 'IconTool',
      defaultValue: "'CLEAR'",
      options: [
        { id: '175cbfd2-4328-4130-aff2-1172e34e830c', value: 'CLEAR', label: 'Clear', position: 0, color: 'green' },
        { id: '0fc01a2c-d920-43ce-aa77-4118aa8c77db', value: 'OPEN', label: 'Open', position: 1, color: 'orange' },
        { id: '7ce0b62d-9a62-4831-8e7d-b7acc003c83f', value: 'BLOCKED', label: 'Blocked', position: 2, color: 'red' },
        { id: 'b11e1ca2-2ff2-47d2-a054-f5f1c5b7033f', value: 'DONE', label: 'Done', position: 3, color: 'blue' },
      ],
    },
    {
      universalIdentifier:
        SPACE_ASSIGNMENT_WORK_ORDER_SUMMARY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'workOrderSummary',
      label: 'Work Order Summary',
      icon: 'IconClipboardList',
      isNullable: true,
    },
    {
      universalIdentifier: SPACE_ASSIGNMENT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RELATION,
      name: 'company',
      label: 'Company',
      icon: 'IconBuilding',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        COMPANY_SPACE_ASSIGNMENTS_FIELD_UNIVERSAL_IDENTIFIER,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'companyId',
      },
    },
  ],
});
