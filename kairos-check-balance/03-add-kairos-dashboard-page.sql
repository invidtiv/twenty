-- Kairos check-balance: "Kairos Dashboard" page (charts + lists)
BEGIN;

INSERT INTO core."frontComponent" (
  "workspaceId", "universalIdentifier", "applicationId", id, name, "createdAt", "updatedAt",
  description, "sourceComponentPath", "builtComponentPath", "componentName",
  "builtComponentChecksum", "isHeadless", "usesSdkClient"
) VALUES (
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '48381de1-d231-4168-9719-c9e9c8de602b',
  '21c89327-a290-4103-8beb-70cdec4a89ad', '0035a202-0422-40e8-b285-08b754a72b01',
  'Kairos Dashboard', now(), now(),
  'Charts and lists for Kairos check-in earnings: monthly bars, 21:00 split donut, upcoming and completed check-in lists.',
  'src/front-components/kairos-dashboard.front-component.tsx',
  'src/front-components/kairos-dashboard.front-component.mjs',
  'KairosDashboard',
  'ed2b9adc8d37a939160cc2e331ae92953a9a361134aae76bb74666cc60081017',
  FALSE, FALSE
);

INSERT INTO core."pageLayout" (
  id, name, type, "workspaceId", "universalIdentifier", "applicationId",
  "createdAt", "updatedAt", "isSystemSideEffect"
) VALUES (
  'bb0c655e-19a3-4ea2-a563-a205632a4361', 'Kairos Dashboard', 'STANDALONE_PAGE',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', '25cacf61-f88c-4332-8f35-320af1e7dd88',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), FALSE
);

INSERT INTO core."pageLayoutTab" (
  id, title, position, "pageLayoutId", "workspaceId", "universalIdentifier",
  "applicationId", "createdAt", "updatedAt", "layoutMode", "isActive", "isSystemSideEffect"
) VALUES (
  '98debde3-cd04-4d0a-b9b4-c991c4b583ab', 'Dashboard', 0,
  'bb0c655e-19a3-4ea2-a563-a205632a4361',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', 'fe3e7c81-f7e5-4b46-8e59-63c272e4e39b',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), 'CANVAS', TRUE, FALSE
);

INSERT INTO core."pageLayoutWidget" (
  id, title, type, "gridPosition", configuration, "pageLayoutTabId",
  "workspaceId", "universalIdentifier", "applicationId", "createdAt", "updatedAt",
  "isActive", "isSystemSideEffect"
) VALUES (
  '60acf987-d57d-4c60-9af4-9897c7b603f6', '', 'FRONT_COMPONENT',
  '{"row": 0, "column": 0, "rowSpan": 12, "columnSpan": 12}',
  '{"frontComponentId": "0035a202-0422-40e8-b285-08b754a72b01", "configurationType": "FRONT_COMPONENT"}',
  '98debde3-cd04-4d0a-b9b4-c991c4b583ab',
  '20202020-1c25-4d02-bf25-6aeccf7ea419', 'ac9521e2-8cdf-412b-a5af-646140a1a671',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now(), TRUE, FALSE
);

INSERT INTO core."navigationMenuItem" (
  id, name, type, icon, "pageLayoutId", "folderId", position,
  "workspaceId", "universalIdentifier", "applicationId", "createdAt", "updatedAt"
) VALUES (
  '972bb622-71fe-4a53-93b8-33acda8242f3', 'Kairos Dashboard', 'PAGE_LAYOUT', 'IconChartBarHorizontal',
  'bb0c655e-19a3-4ea2-a563-a205632a4361',
  'fdca9b8e-a2e4-4ad4-aa2b-05bdf833d1c5', 12,
  '20202020-1c25-4d02-bf25-6aeccf7ea419', 'f6602be6-bfeb-4299-80be-e7e5dce1342d',
  '21c89327-a290-4103-8beb-70cdec4a89ad', now(), now()
);

COMMIT;
