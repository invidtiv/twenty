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

    const inboxFields = [
      { name: 'message', metadataId: '8651aba3-ad88-43cf-a13e-6a29ac8da4e7', position: 0, universalIdentifier: '35c458a5-a7d5-4803-9a49-2819e259f69f', size: 300 },
      { name: 'sender', metadataId: 'be6b4dc6-507f-428e-bbf1-090fe27aa7cd', position: 1, universalIdentifier: '45166abf-06db-4bc1-87ab-15be06f01da8', size: 220 },
      { name: 'isImportant', metadataId: 'e0ceb951-0d39-443c-b052-b042f9860188', position: 2, universalIdentifier: 'fb93fd03-ef1a-4a72-8ddd-122785d99b34', size: 120 },
      { name: 'createdAt', metadataId: 'd526f7e7-4b9e-4cdb-a2bc-a0d912d8db16', position: 3, universalIdentifier: '385aec5f-3082-4601-96a2-76ed20cc934f', size: 160 }
    ];

    const receivedFields = [
      { name: 'message', metadataId: '8651aba3-ad88-43cf-a13e-6a29ac8da4e7', position: 0, universalIdentifier: 'b1db474d-63ae-4c26-aacc-a8cd46273510', size: 300 },
      { name: 'sender', metadataId: 'be6b4dc6-507f-428e-bbf1-090fe27aa7cd', position: 1, universalIdentifier: '6dcf6834-ee80-4556-9b74-cce87163338c', size: 220 },
      { name: 'isImportant', metadataId: 'e0ceb951-0d39-443c-b052-b042f9860188', position: 2, universalIdentifier: '89b77abc-a513-408a-867a-33602e40ab00', size: 120 },
      { name: 'createdAt', metadataId: 'd526f7e7-4b9e-4cdb-a2bc-a0d912d8db16', position: 3, universalIdentifier: '5cc31454-0298-4682-8d44-2a42bd0ab0b7', size: 160 }
    ];

    // First delete any existing view fields for these view IDs just in case
    await client.query(`DELETE FROM "core"."viewField" WHERE "viewId" IN ($1, $2);`, [inboxViewId, receivedViewId]);

    // Insert Inbox view fields
    for (const field of inboxFields) {
      const id = crypto.randomUUID();
      const query = `
        INSERT INTO "core"."viewField" (
          id, "universalIdentifier", "viewId", "fieldMetadataId", position, "isVisible", size, "workspaceId", "applicationId", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8, NOW(), NOW());
      `;
      await client.query(query, [id, field.universalIdentifier, inboxViewId, field.metadataId, field.position, field.size, workspaceId, applicationId]);
      console.log(`Inserted Inbox viewField for ${field.name}`);
    }

    // Insert Received view fields
    for (const field of receivedFields) {
      const id = crypto.randomUUID();
      const query = `
        INSERT INTO "core"."viewField" (
          id, "universalIdentifier", "viewId", "fieldMetadataId", position, "isVisible", size, "workspaceId", "applicationId", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8, NOW(), NOW());
      `;
      await client.query(query, [id, field.universalIdentifier, receivedViewId, field.metadataId, field.position, field.size, workspaceId, applicationId]);
      console.log(`Inserted Received viewField for ${field.name}`);
    }

  } catch (err) {
    console.error('Error inserting view fields:', err);
  }
  client.end();
}).catch(err => {
  console.error('Connection error:', err);
});
