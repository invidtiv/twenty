import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import {
  BILLING_ACCOUNT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_INVOICE_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_NEXT_BILLING_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_SCHEDULE_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_STRIPE_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_TIER_FIELD_UNIVERSAL_IDENTIFIER,
  BILLING_ACCOUNT_TRANSACTION_HISTORY_FIELD_UNIVERSAL_IDENTIFIER,
  COMPANY_BILLING_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: BILLING_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'billingAccount',
  namePlural: 'billingAccounts',
  labelSingular: 'Billing Account',
  labelPlural: 'Billing Accounts',
  description:
    'Finance profile for a client startup, including subscription tier, invoice state, and Stripe references.',
  icon: 'IconReceipt',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier:
    BILLING_ACCOUNT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: BILLING_ACCOUNT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Billing Account Name',
      icon: 'IconReceipt',
    },
    {
      universalIdentifier: BILLING_ACCOUNT_TIER_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'subscriptionTier',
      label: 'Subscription Tier',
      icon: 'IconStack2',
      isNullable: true,
      options: [
        { id: 'faee37da-7df4-4c7d-ad8e-e7c57b478e70', value: 'STARTER', label: 'Starter', position: 0, color: 'gray' },
        { id: 'a31c77fa-9495-49ff-8b4b-679f6475a1fd', value: 'GROWTH', label: 'Growth', position: 1, color: 'blue' },
        { id: 'c6a48f5b-a148-4f64-b464-9bdbd106cafe', value: 'SCALE', label: 'Scale', position: 2, color: 'green' },
        { id: '212a079f-5afc-4a6f-9a01-6946b3b731f3', value: 'ENTERPRISE', label: 'Enterprise', position: 3, color: 'purple' },
      ],
    },
    {
      universalIdentifier: BILLING_ACCOUNT_STRIPE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'stripeCustomerId',
      label: 'Stripe Customer ID',
      icon: 'IconCreditCard',
      isNullable: true,
    },
    {
      universalIdentifier:
        BILLING_ACCOUNT_INVOICE_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'invoiceStatus',
      label: 'Invoice Status',
      icon: 'IconFileInvoice',
      defaultValue: "'NOT_STARTED'",
      options: [
        { id: '2024a948-26fb-4530-951d-50d9c67b8840', value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { id: '597902fd-8618-4920-a4e5-e7130df12c89', value: 'DRAFT', label: 'Draft', position: 1, color: 'blue' },
        { id: '0a0c43ff-6e9a-44f1-ac52-ad140f64fea0', value: 'SENT', label: 'Sent', position: 2, color: 'orange' },
        { id: '2ca2609e-d8c1-4c44-906e-2e925d0bb216', value: 'PAID', label: 'Paid', position: 3, color: 'green' },
        { id: '5c454926-e854-47ea-9944-a437ebc24730', value: 'OVERDUE', label: 'Overdue', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: BILLING_ACCOUNT_SCHEDULE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'billingSchedule',
      label: 'Billing Schedule',
      icon: 'IconCalendarDollar',
      defaultValue: "'MONTHLY'",
      options: [
        { id: '4f8c17d7-2250-4189-a399-00b3c8f113df', value: 'MONTHLY', label: 'Monthly', position: 0, color: 'blue' },
        { id: '5f3efd6b-8af6-4f83-be7f-7a170f73e688', value: 'QUARTERLY', label: 'Quarterly', position: 1, color: 'purple' },
        { id: 'a6f4ecf6-895e-421c-a52f-f5179a45f31f', value: 'ANNUAL', label: 'Annual', position: 2, color: 'green' },
      ],
    },
    {
      universalIdentifier:
        BILLING_ACCOUNT_NEXT_BILLING_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'nextBillingDate',
      label: 'Next Billing Date',
      icon: 'IconCalendarEvent',
      isNullable: true,
    },
    {
      universalIdentifier:
        BILLING_ACCOUNT_TRANSACTION_HISTORY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RAW_JSON,
      name: 'stripeTransactionHistory',
      label: 'Stripe Transaction History',
      icon: 'IconJson',
      isNullable: true,
    },
    {
      universalIdentifier: BILLING_ACCOUNT_COMPANY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RELATION,
      name: 'company',
      label: 'Company',
      icon: 'IconBuilding',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        COMPANY_BILLING_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'companyId',
      },
    },
  ],
});
