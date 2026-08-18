import { PageLayoutTabLayoutMode, definePageLayout } from 'twenty-sdk/define';

import { KAIROS_DASHBOARD_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from '../front-components/kairos-dashboard.front-component';

export const KAIROS_DASHBOARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER =
  '2f55422e-4228-4b20-8620-c082fca54268';

export default definePageLayout({
  universalIdentifier: KAIROS_DASHBOARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Kairos Dashboard',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier: '044ec152-4277-491c-b0ff-a7296934cdeb',
      title: 'Dashboard',
      position: 0,
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: '0de1f4ed-6cf8-4cd1-b0e0-566f6ae57ee6',
          title: 'Kairos Dashboard',
          type: 'FRONT_COMPONENT',
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              KAIROS_DASHBOARD_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});
