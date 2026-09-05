import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  NAVIGATION_FOLDER_ID,
  OPERATIONS_TIMELINE_PAGE_LAYOUT_ID,
  navigationId,
} from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('operationsTimeline'),
  type: NavigationMenuItemType.PAGE_LAYOUT,
  name: 'Operations Timeline',
  icon: 'IconTimeline',
  position: 2,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID,
  pageLayoutUniversalIdentifier: OPERATIONS_TIMELINE_PAGE_LAYOUT_ID,
});
