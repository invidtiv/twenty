import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import { QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.FOLDER,
  name: 'QuietSystems',
  icon: 'IconBuildingSkyscraper',
  position: -1,
});
