import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import {
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENTS_NAV_UNIVERSAL_IDENTIFIER,
  SPACE_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: SPACE_ASSIGNMENTS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Space Assignments',
  icon: 'IconBuildingWarehouse',
  position: 2,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: SPACE_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
});
