import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BILLING_ACCOUNTS_VIEW_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_INVOICE_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_NEXT_BILLING_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_SCHEDULE_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_STRIPE_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_TIER_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: BILLING_ACCOUNTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Billing Accounts',
  objectUniversalIdentifier: BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconReceipt',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    { universalIdentifier: '84c1a62b-c8e6-481f-b4d7-777d2c97ad37', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_NAME_FIELD_UNIVERSAL_IDENTIFIER, position: 0, isVisible: true, size: 220 },
    { universalIdentifier: '33f34d92-630d-4dd4-a605-802390ab79b7', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_TIER_FIELD_UNIVERSAL_IDENTIFIER, position: 1, isVisible: true, size: 150 },
    { universalIdentifier: 'ceddd7db-6bf1-4f00-834c-8e5bd868f4f0', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_INVOICE_STATUS_FIELD_UNIVERSAL_IDENTIFIER, position: 2, isVisible: true, size: 150 },
    { universalIdentifier: '3dc359ce-808e-4ccd-997c-08f97854e644', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_SCHEDULE_FIELD_UNIVERSAL_IDENTIFIER, position: 3, isVisible: true, size: 150 },
    { universalIdentifier: 'e2b1f042-1893-498e-b12f-c0e19c1e9c08', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_NEXT_BILLING_FIELD_UNIVERSAL_IDENTIFIER, position: 4, isVisible: true, size: 160 },
    { universalIdentifier: '902270e6-4f08-436c-8d78-225b1d2c1a72', fieldMetadataUniversalIdentifier: BILLING_ACCOUNT_STRIPE_FIELD_UNIVERSAL_IDENTIFIER, position: 5, isVisible: true, size: 220 },
  ],
});
