import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import { CHECK_BALANCE_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER } from '../page-layouts/check-balance.page-layout';

export default defineNavigationMenuItem({
  universalIdentifier: 'd110e033-7820-42c9-997d-b728c0bf2906',
  name: 'Check Balance',
  type: NavigationMenuItemType.PAGE_LAYOUT,
  icon: 'IconCurrencyEuro',
  position: 14,
  pageLayoutUniversalIdentifier:
    CHECK_BALANCE_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
});
