import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { NAVIGATION_FOLDER_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAVIGATION_FOLDER_ID,
  type: NavigationMenuItemType.FOLDER,
  name: 'Kairos Operations',
  icon: 'IconClockCog',
  position: 0,
});
