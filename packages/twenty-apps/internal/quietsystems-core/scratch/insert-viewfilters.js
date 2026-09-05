const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/default'
});

client.connect().then(async () => {
  console.log('Connected');
  try {
    const inboxViewId = '89bfe7a0-f6f7-47e0-851b-303fced21af0';
    const receivedViewId = 'fe680a8b-8e0f-4554-aa19-4112a0bc0000';
    const workspaceId = 'eb02fe5a-3c9b-4a31-aefc-60093ea09fe9';
    const applicationId = 'd23cde6d-e6a1-4071-8531-5ea8992502f8';

    const directionFieldId = '8adbf166-0903-4d32-991f-110dbef7e1fa';
    const isSpamFieldId = '6a1c502e-753d-4e4b-9180-e08254efe1e8';

    const filters = [
      {
        viewId: inboxViewId,
        universalIdentifier: '14e27aa2-109b-4c33-8834-a4f4df30f31c',
        fieldMetadataId: directionFieldId,
        operand: 'IS',
        value: JSON.stringify(JSON.stringify(['INCOMING']))
      },
      {
        viewId: inboxViewId,
        universalIdentifier: '8db63189-0169-4c8e-b4d4-5ff5e75589f1',
        fieldMetadataId: isSpamFieldId,
        operand: 'IS',
        value: JSON.stringify(JSON.stringify(false))
      },
      {
        viewId: receivedViewId,
        universalIdentifier: '9c072ba9-3554-47f0-a2d6-227745572663',
        fieldMetadataId: directionFieldId,
        operand: 'IS',
        value: JSON.stringify(JSON.stringify(['INCOMING']))
      }
    ];

    // First delete any existing filters for these views
    await client.query(`DELETE FROM "core"."viewFilter" WHERE "viewId" IN ($1, $2);`, [inboxViewId, receivedViewId]);

    // Insert filters
    for (const filter of filters) {
      const id = crypto.randomUUID();
      const query = `
        INSERT INTO "core"."viewFilter" (
          id, "universalIdentifier", "viewId", "fieldMetadataId", operand, value, "workspaceId", "applicationId", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW());
      `;
      await client.query(query, [
        id,
        filter.universalIdentifier,
        filter.viewId,
        filter.fieldMetadataId,
        filter.operand,
        filter.value,
        workspaceId,
        applicationId
      ]);
      console.log(`Inserted double-JSON-encoded viewFilter for view ${filter.viewId}`);
    }

  } catch (err) {
    console.error('Error inserting view filters:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
