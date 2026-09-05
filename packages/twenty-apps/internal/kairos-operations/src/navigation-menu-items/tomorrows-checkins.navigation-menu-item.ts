import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { TOMORROWS_CHECKINS_VIEW_ID } from 'src/views/tomorrows-checkins.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('tomorrowsCheckins'), type: NavigationMenuItemType.VIEW,
  name: "Tomorrow's Check-ins", icon: 'IconCalendarTomorrow', position: 0,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: TOMORROWS_CHECKINS_VIEW_ID,
});
