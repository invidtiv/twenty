const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});
client.connect().then(async () => {
  console.log('Connected');
  try {
    const uuids = ['22b9949b-46af-4ae3-a4c3-c122e960fe4c', '9b11039c-46ff-4267-afd9-595a36936a71'];
    
    // 1. Delete view fields
    const resFields = await client.query('DELETE FROM "core"."viewField" WHERE "viewId" IN (SELECT id FROM "core"."view" WHERE "universalIdentifier" = ANY($1));', [uuids]);
    console.log('Deleted view fields:', resFields.rowCount);

    // 2. Delete view sorts
    const resSorts = await client.query('DELETE FROM "core"."viewSort" WHERE "viewId" IN (SELECT id FROM "core"."view" WHERE "universalIdentifier" = ANY($1));', [uuids]);
    console.log('Deleted view sorts:', resSorts.rowCount);

    // 3. Delete view filters
    const resFilters = await client.query('DELETE FROM "core"."viewFilter" WHERE "viewId" IN (SELECT id FROM "core"."view" WHERE "universalIdentifier" = ANY($1));', [uuids]);
    console.log('Deleted view filters:', resFilters.rowCount);

    // 4. Delete view filter groups
    const resFilterGroups = await client.query('DELETE FROM "core"."viewFilterGroup" WHERE "viewId" IN (SELECT id FROM "core"."view" WHERE "universalIdentifier" = ANY($1));', [uuids]);
    console.log('Deleted view filter groups:', resFilterGroups.rowCount);

    // 5. Delete view groups
    const resGroups = await client.query('DELETE FROM "core"."viewGroup" WHERE "viewId" IN (SELECT id FROM "core"."view" WHERE "universalIdentifier" = ANY($1));', [uuids]);
    console.log('Deleted view groups:', resGroups.rowCount);

    // 6. Delete views
    const resViews = await client.query('DELETE FROM "core"."view" WHERE "universalIdentifier" = ANY($1);', [uuids]);
    console.log('Deleted views:', resViews.rowCount);

  } catch (err) {
    console.error('Error during deletion:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
