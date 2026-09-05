import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import {
  COMPANY_STARTUP_APPLICATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_CAMPAIGN_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_CHECKPOINT_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_LANGUAGE_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_RECEIVED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'startupApplication',
  namePlural: 'startupApplications',
  labelSingular: 'Startup Application',
  labelPlural: 'Startup Applications',
  description:
    'Inbound incubator application or startup lead routed through QuietSystems triage.',
  icon: 'IconUserPlus',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier:
    STARTUP_APPLICATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: STARTUP_APPLICATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Startup Name',
      icon: 'IconBuilding',
    },
    {
      universalIdentifier: STARTUP_APPLICATION_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'source',
      label: 'Lead Source',
      icon: 'IconRoute',
      defaultValue: "'MANUAL'",
      options: [
        { id: '64d316d8-f26a-4cf2-8697-0998ac27a124', value: 'TYPEFORM', label: 'Typeform', position: 0, color: 'blue' },
        { id: '3f7029e5-d269-4254-9e63-5e7a90ef90db', value: 'WEBFLOW', label: 'Webflow', position: 1, color: 'green' },
        { id: 'b86e9077-e39f-47a9-9d46-f430137d6598', value: 'EMAIL', label: 'Shared email', position: 2, color: 'orange' },
        { id: '2f13c29b-e6bb-498e-b245-d452e7e2731c', value: 'REFERRAL', label: 'Referral', position: 3, color: 'purple' },
        { id: 'cd17a1be-0687-4308-bb7f-5223351eb93b', value: 'MANUAL', label: 'Manual', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: STARTUP_APPLICATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'applicantStatus',
      label: 'Applicant Status',
      icon: 'IconProgressCheck',
      defaultValue: "'RECEIVED'",
      options: [
        { id: 'd7dc7e69-56cf-4022-ae55-af515ba76e81', value: 'RECEIVED', label: 'Received', position: 0, color: 'gray' },
        { id: '8130863b-9fe5-4569-9de9-4e98ae72cb37', value: 'TRIAGE', label: 'In triage', position: 1, color: 'orange' },
        { id: '11888869-2223-4f6e-8d67-b4afc6f33500', value: 'QUALIFIED', label: 'Qualified', position: 2, color: 'blue' },
        { id: 'f2ca7bc4-3c8b-4d9e-99ce-c1f72e455116', value: 'ONBOARDED', label: 'Onboarded', position: 3, color: 'green' },
        { id: 'e8251e5c-9c72-4cf6-90d5-cd0eb8593eda', value: 'REJECTED', label: 'Rejected', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier:
        STARTUP_APPLICATION_CAMPAIGN_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'campaignAttribution',
      label: 'Campaign Attribution',
      icon: 'IconChartBar',
      isNullable: true,
    },
    {
      universalIdentifier:
        STARTUP_APPLICATION_CHECKPOINT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.MULTI_SELECT,
      name: 'onboardingCheckpoints',
      label: 'Onboarding Checkpoints',
      icon: 'IconListCheck',
      isNullable: true,
      options: [
        { id: 'fc321750-f4b4-46ba-8cf9-7d3314e64099', value: 'INTAKE_REVIEW', label: 'Intake review', position: 0, color: 'gray' },
        { id: 'fbeb901b-efea-43c6-9159-193731c792cb', value: 'DILIGENCE', label: 'Diligence', position: 1, color: 'blue' },
        { id: 'a50cc020-72e6-4266-b6db-d9717ab3e302', value: 'BRANDING', label: 'Branding', position: 2, color: 'purple' },
        { id: 'da53c8f0-67cd-43d9-a1ba-4167136a9b6d', value: 'FINANCE_SETUP', label: 'Finance setup', position: 3, color: 'green' },
        { id: '9028cef3-a7c0-4852-9e80-9b0443cdbf42', value: 'OPS_SETUP', label: 'Ops setup', position: 4, color: 'orange' },
      ],
    },
    {
      universalIdentifier:
        STARTUP_APPLICATION_LANGUAGE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'activeLanguageProfile',
      label: 'Active Language Profile',
      icon: 'IconLanguage',
      defaultValue: "'EN'",
      options: [
        { id: '25a44654-3077-468f-a707-3e97ff9900ce', value: 'EN', label: 'English', position: 0, color: 'blue' },
        { id: '2b658f50-b054-4709-a85f-0e29ff41df90', value: 'ES', label: 'Spanish', position: 1, color: 'yellow' },
        { id: '174511a3-eed3-4b05-9f0f-6dd73b961349', value: 'FR_FR_PARISIAN', label: 'French (FR-FR Parisian)', position: 2, color: 'red' },
        { id: '2daacba9-64b8-4a88-9c18-39fd4d00db08', value: 'PT_PT_PRE_AO', label: 'Portuguese (PT-PT pre-AO: projecto / recepção / acção)', position: 3, color: 'green' },
      ],
    },
    {
      universalIdentifier: STARTUP_APPLICATION_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'triageNotes',
      label: 'Triage Notes',
      icon: 'IconNotes',
      isNullable: true,
    },
    {
      universalIdentifier:
        STARTUP_APPLICATION_RECEIVED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'intakeReceivedAt',
      label: 'Intake Received At',
      icon: 'IconClock',
      isNullable: true,
    },
    {
      universalIdentifier:
        STARTUP_APPLICATION_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RELATION,
      name: 'company',
      label: 'Company',
      icon: 'IconBuilding',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        COMPANY_STARTUP_APPLICATIONS_FIELD_UNIVERSAL_IDENTIFIER,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'companyId',
      },
    },
  ],
});
