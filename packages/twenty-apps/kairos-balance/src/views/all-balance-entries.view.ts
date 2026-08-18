import { ViewSortDirection, ViewType, defineView } from 'twenty-sdk/define';

import {
  AMOUNT_FIELD_UNIVERSAL_IDENTIFIER,
  BALANCE_ENTRY_UNIVERSAL_IDENTIFIER,
  CHECK_IN_ID_FIELD_UNIVERSAL_IDENTIFIER,
  NAME_FIELD_UNIVERSAL_IDENTIFIER,
  RATE_FIELD_UNIVERSAL_IDENTIFIER,
  STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from '../objects/balance-entry.object';

export const ALL_BALANCE_ENTRIES_VIEW_UNIVERSAL_IDENTIFIER =
  '0a354176-2b9f-4f4a-a66f-a696030e26fb';

export default defineView({
  universalIdentifier: ALL_BALANCE_ENTRIES_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'All Balance Entries',
  objectUniversalIdentifier: BALANCE_ENTRY_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconCoins',
  position: 0,
  fields: [
    {
      universalIdentifier: '604e10da-48be-4371-9777-40f7ab3408aa',
      fieldMetadataUniversalIdentifier: NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '4a4860e2-8cd7-455f-abf5-78973b4493a2',
      fieldMetadataUniversalIdentifier:
        CHECK_IN_ID_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '9ba70b4c-65e6-4e78-ba47-dfbfbf8d3a10',
      fieldMetadataUniversalIdentifier: RATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 190,
    },
    {
      universalIdentifier: '7f2b5c8d-df1d-4126-9f7a-b3c23e0f175f',
      fieldMetadataUniversalIdentifier: STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: 'c080e4eb-399f-400b-87d5-53534be1a7c1',
      fieldMetadataUniversalIdentifier: AMOUNT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 120,
    },
  ],
  sorts: [
    {
      universalIdentifier: '2478cb74-f809-48fb-a338-7dcf22707c3a',
      fieldMetadataUniversalIdentifier: AMOUNT_FIELD_UNIVERSAL_IDENTIFIER,
      direction: ViewSortDirection.DESC,
    },
  ],
});
