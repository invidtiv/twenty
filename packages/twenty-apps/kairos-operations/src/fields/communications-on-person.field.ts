import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

export default defineField(
{
  "universalIdentifier": "83493694-a531-4500-9d72-860a841b0cd5",
  "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
  type: FieldType.RELATION,
  "name": "communications",
  "label": "Operational communications",
  "icon": "IconMessages",
  "relationTargetObjectMetadataUniversalIdentifier": "980a5656-1746-4ee2-be74-ee622ab24887",
  "relationTargetFieldMetadataUniversalIdentifier": "8eb24112-8dce-4247-bb25-7e43bbecdd8b",
  "universalSettings": {
    "relationType": RelationType.ONE_TO_MANY
  }
},
);
