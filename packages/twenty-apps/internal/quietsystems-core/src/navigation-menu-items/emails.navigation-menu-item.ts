import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  EMAILS_NAV_UNIVERSAL_IDENTIFIER,
  EMAILS_VIEW_UNIVERSAL_IDENTIFIER,
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: EMAILS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Emails',
  icon: 'IconMail',
  position: 4,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: EMAILS_VIEW_UNIVERSAL_IDENTIFIER,
});
