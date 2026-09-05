import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import {
  ASSET_VAULT_APPROVAL_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_FILES_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_LOCALIZATION_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_STYLING_JSON_FIELD_UNIVERSAL_IDENTIFIER,
  COMPANY_ASSET_VAULTS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'assetVault',
  namePlural: 'assetVaults',
  labelSingular: 'Asset Vault',
  labelPlural: 'Asset Vaults',
  description:
    'Client brand and styling asset register for PDFs, logos, and structured style parameters.',
  icon: 'IconFolderOpen',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier:
    ASSET_VAULT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: ASSET_VAULT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Asset Vault Name',
      icon: 'IconFolder',
    },
    {
      universalIdentifier: ASSET_VAULT_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'assetCategory',
      label: 'Asset Category',
      icon: 'IconTags',
      defaultValue: "'BRAND_GUIDELINES'",
      options: [
        { id: 'fa73f567-7fbc-4795-a3d8-1571c7655d62', value: 'BRAND_GUIDELINES', label: 'Brand guidelines PDF', position: 0, color: 'blue' },
        { id: '328b6a2e-7f86-413d-ab5b-5e81d5f6e99e', value: 'LOGO_SVG', label: 'Logo SVG', position: 1, color: 'green' },
        { id: 'b2effb61-9387-45b5-8f83-31aecfa5881e', value: 'STYLE_JSON', label: 'Style JSON', position: 2, color: 'purple' },
        { id: '38f31765-992d-4a15-a453-4bd568a53d02', value: 'CONTRACT', label: 'Contract', position: 3, color: 'orange' },
      ],
    },
    {
      universalIdentifier: ASSET_VAULT_FILES_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.FILES,
      name: 'files',
      label: 'Files',
      icon: 'IconPaperclip',
      isNullable: true,
      universalSettings: { maxNumberOfValues: 10 },
    },
    {
      universalIdentifier:
        ASSET_VAULT_STYLING_JSON_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RAW_JSON,
      name: 'stylingParameters',
      label: 'Styling Parameters JSON',
      icon: 'IconJson',
      isNullable: true,
    },
    {
      universalIdentifier:
        ASSET_VAULT_LOCALIZATION_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'localizationProfile',
      label: 'Localization Profile',
      icon: 'IconLanguage',
      defaultValue: "'EN'",
      options: [
        { id: '9798004f-7680-497f-9f45-1d118c81a28f', value: 'EN', label: 'English', position: 0, color: 'blue' },
        { id: '4d7b8ba4-0a45-4891-a0ba-1372f71cef48', value: 'ES', label: 'Spanish', position: 1, color: 'yellow' },
        { id: 'c3deb29c-e18e-4786-ab7d-099a022cbb59', value: 'FR_FR_PARISIAN', label: 'French (FR-FR Parisian)', position: 2, color: 'red' },
        { id: 'c86e5380-6648-4833-ab5d-ae99a1e4d6e3', value: 'PT_PT_PRE_AO', label: 'Portuguese (PT-PT pre-AO: projecto / recepção / acção)', position: 3, color: 'green' },
      ],
    },
    {
      universalIdentifier: ASSET_VAULT_APPROVAL_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'approvalStatus',
      label: 'Approval Status',
      icon: 'IconChecks',
      defaultValue: "'DRAFT'",
      options: [
        { id: 'd7e4b794-f2ae-4eef-b6d1-24f78bcab564', value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { id: '45cf3ea2-bbd5-4008-8a6f-25630c1b4e89', value: 'IN_REVIEW', label: 'In review', position: 1, color: 'orange' },
        { id: '6e55d38d-4c32-4ff1-87aa-c70b24094cc8', value: 'APPROVED', label: 'Approved', position: 2, color: 'green' },
        { id: '33afa8c9-00d4-4ca0-8cb6-0af8f9372838', value: 'ARCHIVED', label: 'Archived', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: ASSET_VAULT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RELATION,
      name: 'company',
      label: 'Company',
      icon: 'IconBuilding',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        COMPANY_ASSET_VAULTS_FIELD_UNIVERSAL_IDENTIFIER,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'companyId',
      },
    },
  ],
});
