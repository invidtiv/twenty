import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  BILLING_ACCOUNT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPANY_BILLING_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: COMPANY_BILLING_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'billingAccounts',
  label: 'Billing Accounts',
  icon: 'IconReceipt',
  relationTargetObjectMetadataUniversalIdentifier:
    BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    BILLING_ACCOUNT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
