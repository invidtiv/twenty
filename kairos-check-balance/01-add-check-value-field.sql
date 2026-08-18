-- Kairos check-balance: add checkValue field to Service Event (CHECK_IN events only)
-- 25 EUR when the check-in starts before 21:00 (Europe/Lisbon), 30 EUR from 21:00.
-- Scheduled check-ins count in the monthly tally (per user rule).

BEGIN;

-- 1. Column on _serviceEvent
ALTER TABLE workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent"
  ADD COLUMN IF NOT EXISTS "checkValue" double precision;

-- 2. Field metadata so Twenty exposes checkValue in GraphQL / UI
INSERT INTO core."fieldMetadata" (
  id, "objectMetadataId", type, name, label, "defaultValue", description, icon,
  options, settings, "isActive", "isSystem", "isUIReadOnly", "isNullable",
  "workspaceId", "isLabelSyncedWithName", "relationTargetFieldMetadataId",
  "relationTargetObjectMetadataId", "morphId", "createdAt", "updatedAt",
  "universalIdentifier", "applicationId", "isUIEditable", "isSystemSideEffect", "overrides"
)
SELECT 'da869c48-84d2-44db-88d4-df8f7365a775', 'abf6c238-93e6-42aa-ba0d-6e9908e59615', 'NUMBER', 'checkValue', 'Check value (€)',
       NULL, 'Earned per check: 25€ when the check-in starts before 21:00, 30€ from 21:00 (Europe/Lisbon).',
       'IconCurrencyEuro', NULL, NULL, TRUE, FALSE, FALSE, TRUE,
       '20202020-1c25-4d02-bf25-6aeccf7ea419', FALSE, NULL, NULL, NULL, now(), now(),
       '5701242b-2e84-4d33-aad8-bbe5c573ff2d', '21c89327-a290-4103-8beb-70cdec4a89ad', TRUE, FALSE, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM core."fieldMetadata"
  WHERE "objectMetadataId" = 'abf6c238-93e6-42aa-ba0d-6e9908e59615' AND name = 'checkValue'
);

-- 3. Trigger: keep checkValue correct on insert / startsAt or eventType change
CREATE OR REPLACE FUNCTION workspace_1wgvd1injqtife6y4rvfbu3h5.kairos_compute_check_value()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW."eventType" = 'CHECK_IN' AND NEW."startsAt" IS NOT NULL THEN
    NEW."checkValue" := CASE
      WHEN (NEW."startsAt" AT TIME ZONE 'Europe/Lisbon')::time < TIME '21:00' THEN 25
      ELSE 30
    END;
  ELSE
    NEW."checkValue" := NULL;
  END IF;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS kairos_check_value_trigger
  ON workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent";
CREATE TRIGGER kairos_check_value_trigger
  BEFORE INSERT OR UPDATE OF "startsAt", "eventType"
  ON workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent"
  FOR EACH ROW
  EXECUTE FUNCTION workspace_1wgvd1injqtife6y4rvfbu3h5.kairos_compute_check_value();

-- 4. Backfill existing CHECK_IN events
UPDATE workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent"
SET "checkValue" = CASE
  WHEN ("startsAt" AT TIME ZONE 'Europe/Lisbon')::time < TIME '21:00' THEN 25
  ELSE 30
END
WHERE "eventType" = 'CHECK_IN' AND "startsAt" IS NOT NULL AND "deletedAt" IS NULL;

-- 5. Show the column (with SUM) in the "Check-ins" and "All" views
INSERT INTO core."viewField" (
  "universalIdentifier", id, "fieldMetadataId", "isVisible", size, position,
  "aggregateOperation", "viewId", "workspaceId", "createdAt", "updatedAt",
  "applicationId", "isActive", "isSystemSideEffect"
)
SELECT uuid_generate_v4(), uuid_generate_v4(), fm.id, TRUE, 120,
       COALESCE((SELECT MAX(position) FROM core."viewField" WHERE "viewId" = 'c5dd22da-37c4-4321-a006-71ddecffa94f'), 0) + 1,
       'SUM', 'c5dd22da-37c4-4321-a006-71ddecffa94f', '20202020-1c25-4d02-bf25-6aeccf7ea419',
       now(), now(), '21c89327-a290-4103-8beb-70cdec4a89ad', TRUE, FALSE
FROM core."fieldMetadata" fm
WHERE fm."objectMetadataId" = 'abf6c238-93e6-42aa-ba0d-6e9908e59615' AND fm.name = 'checkValue'
  AND NOT EXISTS (
    SELECT 1 FROM core."viewField"
    WHERE "viewId" = 'c5dd22da-37c4-4321-a006-71ddecffa94f' AND "fieldMetadataId" = fm.id
  );

INSERT INTO core."viewField" (
  "universalIdentifier", id, "fieldMetadataId", "isVisible", size, position,
  "aggregateOperation", "viewId", "workspaceId", "createdAt", "updatedAt",
  "applicationId", "isActive", "isSystemSideEffect"
)
SELECT uuid_generate_v4(), uuid_generate_v4(), fm.id, TRUE, 120,
       COALESCE((SELECT MAX(position) FROM core."viewField" WHERE "viewId" = 'bcea343a-9b27-47d4-b28f-f56abb84aaa3'), 0) + 1,
       'SUM', 'bcea343a-9b27-47d4-b28f-f56abb84aaa3', '20202020-1c25-4d02-bf25-6aeccf7ea419',
       now(), now(), '21c89327-a290-4103-8beb-70cdec4a89ad', TRUE, FALSE
FROM core."fieldMetadata" fm
WHERE fm."objectMetadataId" = 'abf6c238-93e6-42aa-ba0d-6e9908e59615' AND fm.name = 'checkValue'
  AND NOT EXISTS (
    SELECT 1 FROM core."viewField"
    WHERE "viewId" = 'bcea343a-9b27-47d4-b28f-f56abb84aaa3' AND "fieldMetadataId" = fm.id
  );

COMMIT;
