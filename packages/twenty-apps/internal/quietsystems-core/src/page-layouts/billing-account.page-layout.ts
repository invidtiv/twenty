import {
  PageLayoutTabLayoutMode,
  definePageLayout,
} from 'twenty-sdk/define';

import {
  BILLING_ACCOUNT_LOCALIZATION_TAB_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default definePageLayout({
  universalIdentifier: BILLING_ACCOUNT_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Billing Account Record Page',
  type: 'RECORD_PAGE',
  objectUniversalIdentifier: BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  tabs: [
    {
      universalIdentifier: BILLING_ACCOUNT_LOCALIZATION_TAB_UNIVERSAL_IDENTIFIER,
      title: 'Localization',
      position: 50,
      icon: 'IconLanguage',
      layoutMode: PageLayoutTabLayoutMode.CANVAS,
      widgets: [
        {
          universalIdentifier:
            BILLING_ACCOUNT_LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
          title: 'Invoice Localization Guardrails',
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
