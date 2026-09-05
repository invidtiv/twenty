import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  ASSET_VAULTS_VIEW_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_APPROVAL_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_FILES_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_LOCALIZATION_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  ASSET_VAULT_STYLING_JSON_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: ASSET_VAULTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Asset Vaults',
  objectUniversalIdentifier: ASSET_VAULT_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconFolderOpen',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    { universalIdentifier: '7fbfe160-895b-40e4-9a76-89acda6f2753', fieldMetadataUniversalIdentifier: ASSET_VAULT_NAME_FIELD_UNIVERSAL_IDENTIFIER, position: 0, isVisible: true, size: 220 },
    { universalIdentifier: '49f7e0dd-f95d-4385-8be2-402e096055db', fieldMetadataUniversalIdentifier: ASSET_VAULT_CATEGORY_FIELD_UNIVERSAL_IDENTIFIER, position: 1, isVisible: true, size: 180 },
    { universalIdentifier: '479531cc-925f-4448-ba1c-1d44c4d6401a', fieldMetadataUniversalIdentifier: ASSET_VAULT_LOCALIZATION_FIELD_UNIVERSAL_IDENTIFIER, position: 2, isVisible: true, size: 190 },
    { universalIdentifier: 'e5fe00a8-a82b-4397-9acd-e1b6f9d58b19', fieldMetadataUniversalIdentifier: ASSET_VAULT_APPROVAL_FIELD_UNIVERSAL_IDENTIFIER, position: 3, isVisible: true, size: 150 },
    { universalIdentifier: 'a44d38cb-dab5-44a6-baf1-0b8d3f7d0077', fieldMetadataUniversalIdentifier: ASSET_VAULT_FILES_FIELD_UNIVERSAL_IDENTIFIER, position: 4, isVisible: true, size: 180 },
    { universalIdentifier: '4f0d8092-b93d-4d05-b0d6-38e6932a0118', fieldMetadataUniversalIdentifier: ASSET_VAULT_STYLING_JSON_FIELD_UNIVERSAL_IDENTIFIER, position: 5, isVisible: false, size: 220 },
  ],
});
