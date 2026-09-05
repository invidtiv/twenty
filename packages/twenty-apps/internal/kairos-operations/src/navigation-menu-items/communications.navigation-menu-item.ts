import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { COMMUNICATIONS_VIEW_ID } from 'src/views/communications.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('communications'), type: NavigationMenuItemType.VIEW,
  name: 'Communications', icon: 'IconMessages', position: 8,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: COMMUNICATIONS_VIEW_ID,
});
