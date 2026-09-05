import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import {
  ASSET_VAULTS_NAV_UNIVERSAL_IDENTIFIER,
  ASSET_VAULTS_VIEW_UNIVERSAL_IDENTIFIER,
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: ASSET_VAULTS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Asset Vaults',
  icon: 'IconFolderOpen',
  position: 3,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: ASSET_VAULTS_VIEW_UNIVERSAL_IDENTIFIER,
});
