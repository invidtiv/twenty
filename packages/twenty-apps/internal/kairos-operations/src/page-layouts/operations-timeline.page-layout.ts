import { PageLayoutTabLayoutMode, definePageLayout } from 'twenty-sdk/define';

import {
  OPERATIONS_TIMELINE_FRONT_COMPONENT_ID,
  OPERATIONS_TIMELINE_PAGE_LAYOUT_ID,
  OPERATIONS_TIMELINE_PAGE_TAB_ID,
  OPERATIONS_TIMELINE_WIDGET_ID,
} from 'src/constants/identifiers';

export default definePageLayout({
  universalIdentifier: OPERATIONS_TIMELINE_PAGE_LAYOUT_ID,
  name: 'Operations Timeline',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier: OPERATIONS_TIMELINE_PAGE_TAB_ID,
      title: 'Timeline',
      position: 0,
      icon: 'IconTimeline',
      layoutMode: PageLayoutTabLayoutMode.CANVAS,
      widgets: [
        {
          universalIdentifier: OPERATIONS_TIMELINE_WIDGET_ID,
          title: ' ',
          type: 'FRONT_COMPONENT',
          gridPosition: { row: 0, column: 0, rowSpan: 12, columnSpan: 12 },
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              OPERATIONS_TIMELINE_FRONT_COMPONENT_ID,
          },
        },
      ],
    },
  ],
});
