import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  SPAM_NAV_UNIVERSAL_IDENTIFIER,
  SPAM_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: SPAM_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Spam',
  icon: 'IconAlertTriangle',
  position: 8,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: SPAM_VIEW_UNIVERSAL_IDENTIFIER,
});
