import {
  PageLayoutTabLayoutMode,
  definePageLayout,
} from 'twenty-sdk/define';

import {
  LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_LOCALIZATION_TAB_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default definePageLayout({
  universalIdentifier: STARTUP_APPLICATION_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Startup Application Record Page',
  type: 'RECORD_PAGE',
  objectUniversalIdentifier: STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  tabs: [
    {
      universalIdentifier:
        STARTUP_APPLICATION_LOCALIZATION_TAB_UNIVERSAL_IDENTIFIER,
      title: 'Localization',
      position: 50,
      icon: 'IconLanguage',
      layoutMode: PageLayoutTabLayoutMode.CANVAS,
      widgets: [
        {
          universalIdentifier:
            STARTUP_APPLICATION_LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
          title: 'Localization Guardrails',
          type: 'FRONT_COMPONENT',
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});
