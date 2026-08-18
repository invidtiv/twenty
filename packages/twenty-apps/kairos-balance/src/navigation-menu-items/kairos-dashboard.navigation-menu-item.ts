import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';

import { KAIROS_DASHBOARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER } from '../page-layouts/kairos-dashboard.page-layout';

export default defineNavigationMenuItem({
  universalIdentifier: '6e5a30fb-d57a-488b-a059-f7e76f0b7c28',
  name: 'Kairos Dashboard',
  type: NavigationMenuItemType.PAGE_LAYOUT,
  icon: 'IconChartBarHorizontal',
  position: 13,
  pageLayoutUniversalIdentifier:
    KAIROS_DASHBOARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
});
