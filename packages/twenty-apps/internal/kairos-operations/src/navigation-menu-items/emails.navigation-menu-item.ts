import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { EMAILS_VIEW_ID } from 'src/views/emails.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('emails'),
  type: NavigationMenuItemType.VIEW,
  name: 'Emails',
  icon: 'IconMail',
  position: 10,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID,
  viewUniversalIdentifier: EMAILS_VIEW_ID,
});
