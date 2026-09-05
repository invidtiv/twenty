import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { TODAY_SERVICE_EVENTS_VIEW_ID } from 'src/views/today-service-events.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('today'), type: NavigationMenuItemType.VIEW,
  name: 'Today', icon: 'IconCalendarDue', position: 1,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: TODAY_SERVICE_EVENTS_VIEW_ID,
});
