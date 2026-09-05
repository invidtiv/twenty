const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});
client.connect().then(async () => {
  console.log('Connected');
  try {
    const resMsg = await client.query('SELECT COUNT(*) FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."message";');
    console.log('Total messages:', resMsg.rows[0].count);

    const resAssoc = await client.query('SELECT COUNT(*), direction FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."messageChannelMessageAssociation" GROUP BY direction;');
    console.log('Associations by direction:', resAssoc.rows);

    const resAssocDetails = await client.query('SELECT * FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."messageChannelMessageAssociation";');
    console.log('All associations:', resAssocDetails.rows);

  } catch (err) {
    console.error('Error querying:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
