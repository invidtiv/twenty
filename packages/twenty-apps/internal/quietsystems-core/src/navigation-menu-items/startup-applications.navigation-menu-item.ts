import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import {
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATIONS_NAV_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATIONS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: STARTUP_APPLICATIONS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Startup Applications',
  icon: 'IconUserPlus',
  position: 0,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: STARTUP_APPLICATIONS_VIEW_UNIVERSAL_IDENTIFIER,
});
