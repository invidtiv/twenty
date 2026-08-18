import { PageLayoutTabLayoutMode, definePageLayout } from 'twenty-sdk/define';

import { CHECK_BALANCE_TABLE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from '../front-components/check-balance-table.front-component';

export const CHECK_BALANCE_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER =
  '6922b339-4066-4882-8143-9e23f2688027';

export default definePageLayout({
  universalIdentifier: CHECK_BALANCE_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Check Balance',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier: 'fe551e67-b933-4d42-8d59-f5e4f7e7c557',
      title: 'Balance',
      position: 0,
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: '3a0563ff-1078-4ad3-8db2-9491a2370cd3',
          title: 'Check Balance',
          type: 'FRONT_COMPONENT',
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              CHECK_BALANCE_TABLE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});
