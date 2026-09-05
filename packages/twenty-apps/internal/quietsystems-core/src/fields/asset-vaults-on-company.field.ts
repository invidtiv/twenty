import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  ASSET_VAULT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPANY_ASSET_VAULTS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: COMPANY_ASSET_VAULTS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'assetVaults',
  label: 'Asset Vaults',
  icon: 'IconFolderOpen',
  relationTargetObjectMetadataUniversalIdentifier:
    ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    ASSET_VAULT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
