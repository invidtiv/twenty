import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { READY_BOOKINGS_VIEW_ID } from 'src/views/ready-bookings.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('ready'), type: NavigationMenuItemType.VIEW,
  name: 'Ready', icon: 'IconCircleCheck', position: 4,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: READY_BOOKINGS_VIEW_ID,
});
