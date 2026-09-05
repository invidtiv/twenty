import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  IMPORTANT_NAV_UNIVERSAL_IDENTIFIER,
  IMPORTANT_VIEW_UNIVERSAL_IDENTIFIER,
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: IMPORTANT_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Important',
  icon: 'IconStar',
  position: 9,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: IMPORTANT_VIEW_UNIVERSAL_IDENTIFIER,
});
