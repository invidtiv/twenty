import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  RECEIVED_NAV_UNIVERSAL_IDENTIFIER,
  RECEIVED_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: RECEIVED_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Received',
  icon: 'IconMailHeart',
  position: 6,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: RECEIVED_VIEW_UNIVERSAL_IDENTIFIER,
});
