import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import {
  BILLING_ACCOUNTS_NAV_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNTS_VIEW_UNIVERSAL_IDENTIFIER,
  QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: BILLING_ACCOUNTS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  name: 'Billing Accounts',
  icon: 'IconReceipt',
  position: 1,
  folderUniversalIdentifier: QUIETSYSTEMS_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: BILLING_ACCOUNTS_VIEW_UNIVERSAL_IDENTIFIER,
});
