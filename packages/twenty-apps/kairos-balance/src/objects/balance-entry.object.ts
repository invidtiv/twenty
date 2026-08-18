import { FieldType, NumberDataType, defineObject } from 'twenty-sdk/define';

export const BALANCE_ENTRY_UNIVERSAL_IDENTIFIER =
  '58d3a32d-e1df-47e7-8362-63eafc3d524a';

export const NAME_FIELD_UNIVERSAL_IDENTIFIER =
  'c04e13f8-ac3e-405b-a1ca-2cf023a0eb2c';

export const SOURCE_KEY_FIELD_UNIVERSAL_IDENTIFIER =
  '336c2212-a008-481f-8f5f-fd705063d528';

export const CHECK_IN_ID_FIELD_UNIVERSAL_IDENTIFIER =
  'c5ef6abc-2a5b-4042-b88b-0cdda61b80e8';

export const AMOUNT_FIELD_UNIVERSAL_IDENTIFIER =
  'ce8375c7-9681-49db-9cbe-acfe87b2dfb1';

export const RATE_FIELD_UNIVERSAL_IDENTIFIER =
  'd9fd65c2-9f03-4679-9117-ed03c2f939a6';

export const STATUS_FIELD_UNIVERSAL_IDENTIFIER =
  '24a8b973-ff71-442e-82aa-fa18f72dfc88';

export default defineObject({
  universalIdentifier: BALANCE_ENTRY_UNIVERSAL_IDENTIFIER,
  nameSingular: 'balanceEntry',
  namePlural: 'balanceEntries',
  labelSingular: 'Balance Entry',
  labelPlural: 'Balance Entries',
  description:
    'Ledger entry earned per check-in: 25€ before 21:00, 30€ from 21:00.',
  icon: 'IconCoins',
  labelIdentifierFieldMetadataUniversalIdentifier:
    NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      label: 'Name',
      icon: 'IconAbc',
      name: 'name',
    },
    {
      universalIdentifier: SOURCE_KEY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      label: 'Source key',
      description:
        'Idempotency key for the workflow: the check-in Service Event id.',
      icon: 'IconKey',
      name: 'sourceKey',
      isUnique: true,
    },
    {
      universalIdentifier: CHECK_IN_ID_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.UUID,
      label: 'Check-in id',
      description:
        'The Kairos CHECK_IN Service Event this entry was earned from.',
      icon: 'IconCalendarCheck',
      name: 'checkInId',
    },
    {
      universalIdentifier: AMOUNT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      label: 'Amount (€)',
      icon: 'IconCurrencyEuro',
      name: 'amount',
      universalSettings: { dataType: NumberDataType.FLOAT },
      isNullable: false,
      defaultValue: 0,
    },
    {
      universalIdentifier: RATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      label: 'Rate',
      icon: 'IconClockCog',
      name: 'rate',
      options: [
        {
          id: '1a7b8d5e-2b6a-4c9d-8e3f-5d6c7b8a9e0f',
          value: 'DAY',
          label: 'Day · before 21:00 · 25€',
          position: 0,
          color: 'green',
        },
        {
          id: '2b8c9e6f-3c7d-4d9e-9f4a-6e7d8c9b0a1f',
          value: 'NIGHT',
          label: 'Night · from 21:00 · 30€',
          position: 1,
          color: 'amber',
        },
      ],
    },
    {
      universalIdentifier: STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      label: 'Status',
      icon: 'IconStatus',
      name: 'status',
      defaultValue: "'EXPECTED'",
      options: [
        {
          id: 'dfa2fa39-e633-4535-a79d-c77ebb14b3a8',
          value: 'EXPECTED',
          label: 'Expected',
          position: 0,
          color: 'gray',
        },
        {
          id: '4adfc488-a4e2-4db4-8a90-1c345db64c64',
          value: 'EARNED',
          label: 'Earned',
          position: 1,
          color: 'green',
        },
      ],
    },
  ],
});
