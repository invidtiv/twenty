
BEGIN;

-- Remove old manually-registered pages (now owned by the kairos-balance app)
DELETE FROM core."pageLayoutWidget" WHERE id IN (
  '028f7a00-efac-4762-9145-9644b1f86bf6',
  '60acf987-d57d-4c60-9af4-9897c7b603f6'
);
DELETE FROM core."pageLayoutTab" WHERE id IN (
  'ff87f6d9-1d3c-4d52-8553-ebbbaccfe00f',
  '98debde3-cd04-4d0a-b9b4-c991c4b583ab'
);
DELETE FROM core."pageLayout" WHERE id IN (
  '0d2246ed-61c3-4c3c-aa45-470968449a01',
  'bb0c655e-19a3-4ea2-a563-a205632a4361'
);
DELETE FROM core."navigationMenuItem" WHERE id IN (
  '81ccc997-ec93-4863-939f-84f21a84d900',
  '972bb622-71fe-4a53-93b8-33acda8242f3'
);
DELETE FROM core."frontComponent" WHERE id IN (
  'ff380511-5d33-469c-8884-e63ef7d2a029',
  '0035a202-0422-40e8-b285-08b754a72b01'
);

COMMIT;
