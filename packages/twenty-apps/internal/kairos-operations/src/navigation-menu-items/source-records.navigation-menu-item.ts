import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { SOURCE_RECORDS_VIEW_ID } from 'src/views/source-records.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('sourceRecords'), type: NavigationMenuItemType.VIEW,
  name: 'Source Records', icon: 'IconDatabase', position: 9,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: SOURCE_RECORDS_VIEW_ID,
});
