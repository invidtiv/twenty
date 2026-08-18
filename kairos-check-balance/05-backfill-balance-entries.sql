
BEGIN;

DELETE FROM workspace_1wgvd1injqtife6y4rvfbu3h5."_balanceEntry" WHERE "checkInId" = '86cff757-38d7-44c6-ae3e-78bfd6da144f';
DELETE FROM workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent" WHERE id = '86cff757-38d7-44c6-ae3e-78bfd6da144f';

INSERT INTO workspace_1wgvd1injqtife6y4rvfbu3h5."_balanceEntry"
  (id, name, "sourceKey", "checkInId", amount, rate, status,
   "createdAt", "updatedAt", "createdBySource", "createdByName",
   "updatedBySource", "updatedByName", position)
SELECT
  uuid_generate_v4(),
  se.title,
  se.id::text,
  se.id,
  se."checkValue",
  (CASE WHEN se."checkValue" >= 30 THEN 'NIGHT' ELSE 'DAY' END)::workspace_1wgvd1injqtife6y4rvfbu3h5."_balanceEntry_rate_enum",
  (CASE WHEN se.status = 'COMPLETED' THEN 'EARNED' ELSE 'EXPECTED' END)::workspace_1wgvd1injqtife6y4rvfbu3h5."_balanceEntry_status_enum",
  se."createdAt", now(), 'SYSTEM', 'Kairos Balance backfill',
  'SYSTEM', 'Kairos Balance backfill', 0
FROM workspace_1wgvd1injqtife6y4rvfbu3h5."_serviceEvent" se
WHERE se."eventType" = 'CHECK_IN'
  AND se."deletedAt" IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM workspace_1wgvd1injqtife6y4rvfbu3h5."_balanceEntry" e WHERE e."checkInId" = se.id
  );

COMMIT;