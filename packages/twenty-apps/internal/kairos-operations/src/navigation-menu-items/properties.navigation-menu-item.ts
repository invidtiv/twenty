import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { PROPERTIES_VIEW_ID } from 'src/views/properties.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('properties'), type: NavigationMenuItemType.VIEW,
  name: 'Properties', icon: 'IconBuildingEstate', position: 6,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: PROPERTIES_VIEW_ID,
});
