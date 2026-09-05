const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});
client.connect().then(async () => {
  console.log('Connected');
  try {
    const inboxViewId = '89bfe7a0-f6f7-47e0-851b-303fced21af0';
    const receivedViewId = 'fe680a8b-8e0f-4554-aa19-4112a0bc0000';
    const res = await client.query(
      `DELETE FROM "core"."viewField" WHERE "viewId" IN ($1, $2);`,
      [inboxViewId, receivedViewId]
    );
    console.log('Deleted manually inserted view fields:', res.rowCount);
  } catch (err) {
    console.error('Error during deletion:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
