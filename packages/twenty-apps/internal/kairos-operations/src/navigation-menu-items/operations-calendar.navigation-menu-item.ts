import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { OPERATIONS_CALENDAR_VIEW_ID } from 'src/views/operations-calendar.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('operationsCalendar'),
  type: NavigationMenuItemType.VIEW,
  name: 'Operations Calendar',
  icon: 'IconCalendarEvent',
  position: 3,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID,
  viewUniversalIdentifier: OPERATIONS_CALENDAR_VIEW_ID,
});
