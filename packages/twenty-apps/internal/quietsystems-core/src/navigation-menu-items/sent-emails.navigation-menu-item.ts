import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  SENT_NAV_UNIVERSAL_IDENTIFIER,
  SENT_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: SENT_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Sent',
  icon: 'IconSend',
  position: 7,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: SENT_VIEW_UNIVERSAL_IDENTIFIER,
});
