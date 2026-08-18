import { defineRole } from 'twenty-sdk/define';

export default defineRole(
{
  "universalIdentifier": "ed373830-d398-4534-928c-ef53f4200117",
  "label": "Kairos Operations function role",
  "description": "Least-privilege record access for Kairos ingestion, reconciliation, and operational queries.",
  "icon": "IconRobot",
  "canReadAllObjectRecords": false,
  "canUpdateAllObjectRecords": false,
  "canSoftDeleteAllObjectRecords": false,
  "canDestroyAllObjectRecords": false,
  "canUpdateAllSettings": false,
  "canBeAssignedToUsers": false,
  "canBeAssignedToAgents": false,
  "canBeAssignedToApiKeys": false,
  "objectPermissions": [
    {
      "objectUniversalIdentifier": "20202020-e674-48e5-a542-72570eee7213",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "20202020-1ba1-48ba-bc83-ef7e5990ed10",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "20202020-849a-4c3e-84f5-a25a7d802271",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": false,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "20202020-3f6b-4425-80ab-e468899ab4b2",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": false,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "20202020-a433-4456-aa2d-fd9cb26b774a",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": false,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "20202020-ad1e-4127-bccb-d83ae04d2ccb",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": false,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "82c6e180-c624-4e8a-86e8-f5890f8adf6a",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "5535c4e3-5781-4a81-8bbf-332e89a8ed52",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "d2ccfff1-20f4-494c-a889-bd1dec55a533",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "35e25a5e-b749-4e7f-b018-bb441efbe138",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "980a5656-1746-4ee2-be74-ee622ab24887",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "90d7133e-f132-495f-949f-07f5450b53e4",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    },
    {
      "objectUniversalIdentifier": "55adfa8c-5759-4b46-9c88-17a449f3b0b2",
      "canReadObjectRecords": true,
      "canUpdateObjectRecords": true,
      "canSoftDeleteObjectRecords": false,
      "canDestroyObjectRecords": false
    }
  ]
},
);
