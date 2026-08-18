-- Kairos check-balance: "Check Balance" page (standalone page + front component)
BEGIN;

INSERT INTO core."frontComponent" (
  "workspaceId", "universalIdentifier", "applicationId", id, name, "createdAt", "updatedAt",
  description, "sourceComponentPath", "builtComponentPath", "componentName",
  "builtComponentChecksum", "isHeadless", "usesSdkClient"
) VALUES (
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '65a79808-9e41-48d3-b36f-82c87adbb93e',
  '21c89327-a290-4103-8beb-70cdec4a89ad', 'ff380511-5d33-469c-8884-e63ef7d2a029',
  'Check Balance', now(), now(),
  'Monthly check balance: 25€ before 21:00, 30€ from 21:00 (Europe/Lisbon). Scheduled check-ins count.',
  'src/front-components/check-balance.front-component.tsx',
  'src/front-components/check-balance.front-component.mjs',
  'CheckBalance',
  '616192cb8762beea0f700db5856eee36a77b6a60ba3bc89446292d509d60ca61',
  FALSE, FALSE
);

INSERT INTO core."pageLayout" (
  id, name, type, "workspaceId", "universalIdentifier", "applicationId",
  "createdAt", "updatedAt", "isSystemSideEffect"
) VALUES (
  '0d2246ed-61c3-4c3c-aa45-470968449a01', 'Check Balance', 'STANDALONE_PAGE',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '29288366-f383-4028-a1b5-0e23db2ee1a2',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), FALSE
);

INSERT INTO core."pageLayoutTab" (
  id, title, position, "pageLayoutId", "workspaceId", "universalIdentifier",
  "applicationId", "createdAt", "updatedAt", "layoutMode", "isActive", "isSystemSideEffect"
) VALUES (
  'ff87f6d9-1d3c-4d52-8553-ebbbaccfe00f', 'Balance', 0,
  '0d2246ed-61c3-4c3c-aa45-470968449a01',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '9f0c6781-1299-4f70-b70b-dc1a77484750',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), 'CANVAS', TRUE, FALSE
);

INSERT INTO core."pageLayoutWidget" (
  id, title, type, "gridPosition", configuration, "pageLayoutTabId",
  "workspaceId", "universalIdentifier", "applicationId", "createdAt", "updatedAt",
  "isActive", "isSystemSideEffect"
) VALUES (
  '028f7a00-efac-4762-9145-9644b1f86bf6', '', 'FRONT_COMPONENT',
  '{"row": 0, "column": 0, "rowSpan": 12, "columnSpan": 12}',
  '{"frontComponentId": "ff380511-5d33-469c-8884-e63ef7d2a029", "configurationType": "FRONT_COMPONENT"}',
  'ff87f6d9-1d3c-4d52-8553-ebbbaccfe00f',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '01acac5a-13d9-4675-b28a-96acf345b1d7',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), TRUE, FALSE
);

INSERT INTO core."navigationMenuItem" (
  id, name, type, icon, "pageLayoutId", "folderId", position,
  "workspaceId", "universalIdentifier", "applicationId", "createdAt", "updatedAt"
) VALUES (
  '81ccc997-ec93-4863-939f-84f21a84d900', 'Check Balance', 'PAGE_LAYOUT', 'IconCoins',
  '0d2246ed-61c3-4c3c-aa45-470968449a01',
  'fdca9b8e-a2e4-4ad4-aa2b-05bdf833d1c5', 11,
  '20202020-1c25-4d02-bf25-6aeccf7ea419', 'ac06b640-965b-4e64-a26d-42090f425e1d',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now()
);

COMMIT;
