import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PERSON_FIELDS } from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PERSON_FIELDS.personType,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.MULTI_SELECT,
  name: 'personType',
  label: 'Person type',
  icon: 'IconUsersGroup',
  options: [
    { value: 'GUEST', label: 'Guest', position: 0, color: 'green' },
    { value: 'COORDINATOR', label: 'Coordinator', position: 1, color: 'blue' },
    { value: 'COLLEAGUE', label: 'Colleague', position: 2, color: 'turquoise' },
    { value: 'OWNER', label: 'Owner', position: 3, color: 'purple' },
    { value: 'OPERATOR', label: 'Operator', position: 4, color: 'orange' },
    { value: 'OTHER', label: 'Other', position: 5, color: 'gray' },
  ],
});
