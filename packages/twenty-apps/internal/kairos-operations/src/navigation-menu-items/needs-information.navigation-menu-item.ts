import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { NEEDS_INFORMATION_VIEW_ID } from 'src/views/needs-information.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('needsInformation'), type: NavigationMenuItemType.VIEW,
  name: 'Needs Information', icon: 'IconInfoTriangle', position: 3,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: NEEDS_INFORMATION_VIEW_ID,
});
