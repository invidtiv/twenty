const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});
client.connect().then(async () => {
  console.log('Connected');
  try {
    // 1. Update messageFrom on messageThread
    const resFrom = await client.query(`
      UPDATE "workspace_dwvl3uyayhvsf860901nd9cdl"."messageThread" mt
      SET "messageFrom" = (
        SELECT string_agg(DISTINCT COALESCE(mp.handle, mp."displayName"), ', ')
        FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."message" m
        JOIN "workspace_dwvl3uyayhvsf860901nd9cdl"."messageParticipant" mp ON mp."messageId" = m.id
        WHERE m."messageThreadId" = mt.id AND mp.role = 'FROM'
      )
      WHERE mt."messageFrom" IS NULL;
    `);
    console.log('Updated messageFrom on messageThread:', resFrom.rowCount);

    // 2. Update messageTo on messageThread
    const resTo = await client.query(`
      UPDATE "workspace_dwvl3uyayhvsf860901nd9cdl"."messageThread" mt
      SET "messageTo" = (
        SELECT string_agg(DISTINCT COALESCE(mp.handle, mp."displayName"), ', ')
        FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."message" m
        JOIN "workspace_dwvl3uyayhvsf860901nd9cdl"."messageParticipant" mp ON mp."messageId" = m.id
        WHERE m."messageThreadId" = mt.id AND mp.role = 'TO'
      )
      WHERE mt."messageTo" IS NULL;
    `);
    console.log('Updated messageTo on messageThread:', resTo.rowCount);

    // 3. Update sender on messageChannelMessageAssociation
    const resSender = await client.query(`
      UPDATE "workspace_dwvl3uyayhvsf860901nd9cdl"."messageChannelMessageAssociation" ma
      SET sender = (
        SELECT COALESCE(mp.handle, mp."displayName")
        FROM "workspace_dwvl3uyayhvsf860901nd9cdl"."messageParticipant" mp
        WHERE mp."messageId" = ma."messageId" AND mp.role = 'FROM'
        LIMIT 1
      )
      WHERE ma.sender IS NULL;
    `);
    console.log('Updated sender on messageChannelMessageAssociation:', resSender.rowCount);

  } catch (err) {
    console.error('Error during updates:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
