const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});
client.connect().then(async () => {
  console.log('Connected');
  try {
    const fieldsRes = await client.query(`
      SELECT vf.id, vf."viewId", vf.position, fm.name as "fieldName", v.name as "viewName"
      FROM "core"."viewField" vf
      JOIN "core"."view" v ON v.id = vf."viewId"
      JOIN "core"."fieldMetadata" fm ON fm.id = vf."fieldMetadataId"
      WHERE v.id IN ('89bfe7a0-f6f7-47e0-851b-303fced21af0', 'fe680a8b-8e0f-4554-aa19-4112a0bc0000')
      ORDER BY v.name, vf.position;
    `);
    console.log('Inbox/Received View Fields:', fieldsRes.rows);

    const filtersRes = await client.query(`
      SELECT vf.id, vf."viewId", vf.operand, vf.value, fm.name as "fieldName", v.name as "viewName"
      FROM "core"."viewFilter" vf
      JOIN "core"."view" v ON v.id = vf."viewId"
      JOIN "core"."fieldMetadata" fm ON fm.id = vf."fieldMetadataId"
      WHERE v.id IN ('89bfe7a0-f6f7-47e0-851b-303fced21af0', 'fe680a8b-8e0f-4554-aa19-4112a0bc0000');
    `);
    console.log('Inbox/Received View Filters:', filtersRes.rows);
  } catch (err) {
    console.error('Error querying:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});






































