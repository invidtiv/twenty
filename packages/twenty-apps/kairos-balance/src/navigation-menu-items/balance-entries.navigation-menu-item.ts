import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import { BALANCE_ENTRY_UNIVERSAL_IDENTIFIER } from '../objects/balance-entry.object';

export default defineNavigationMenuItem({
  universalIdentifier: '598d3ff6-f966-47c6-b670-a44da9e55c6a',
  name: 'Balance Entries',
  type: NavigationMenuItemType.OBJECT,
  icon: 'IconCoins',
  position: 12,
  targetObjectUniversalIdentifier: BALANCE_ENTRY_UNIVERSAL_IDENTIFIER,
});
