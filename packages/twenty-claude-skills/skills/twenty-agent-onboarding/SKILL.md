---
name: twenty-agent-onboarding
description: "Onboard new AI agents and API keys onto Twenty CRM, configure permissions and roles, generate API key tokens, and verify connection status."
---

# Twenty Agent Onboarding

## Use This Skill When

- You need to onboard/register a new AI agent or external integration onto the Twenty CRM.
- You need to manage, update, or verify permissions and roles for an agent or API key.
- You need to generate API key tokens for agent authentication.

## Primary References

- `packages/twenty-server/src/engine/core-modules/api-key/api-key.entity.ts`
- `packages/twenty-server/src/engine/core-modules/api-key/services/api-key.service.ts`
- `packages/twenty-server/src/engine/metadata-modules/ai/ai-agent/entities/agent.entity.ts`
- `packages/twenty-server/src/engine/metadata-modules/ai/ai-agent-role/ai-agent-role.service.ts`
- `packages/twenty-docs/user-guide/ai/capabilities/permissions-access-control.mdx`

## Onboarding Methods

### 1. External Agents (API Key Integration)
For external agents interacting with Twenty's GraphQL or REST APIs, you must generate an API key and assign a role (e.g. Admin or a custom API role).

#### via CLI (Development/Test Environments Only)
You can generate an API key and automatically obtain the JWT token with the following command:
```bash
npx nx run twenty-server:command --args="workspace:generate-api-key -w <workspace-id> -n '<agent-name>' -e <days-to-expiry>"
```
*Note: If `-e` (expires-in) is omitted, the key defaults to a non-expiring key (100 years).*

#### via GraphQL
1. Create the API key record:
   ```graphql
   mutation CreateApiKey($input: CreateApiKeyInput!) {
     createApiKey(input: $input) {
       id
       name
       expiresAt
     }
   }
   ```
2. Generate the JWT token for the API key:
   ```graphql
   mutation GenerateApiKeyToken($apiKeyId: UUID!, $expiresAt: DateTime) {
     generateApiKeyToken(apiKeyId: $apiKeyId, expiresAt: $expiresAt) {
       token
     }
   }
   ```
3. Assign a role to the API key:
   ```graphql
   mutation AssignRoleToApiKey($apiKeyId: UUID!, $roleId: UUID!) {
     assignRoleToApiKey(apiKeyId: $apiKeyId, roleId: $roleId)
   }
   ```

### 2. Native AI Agents (Internal CRM Agents)
For autonomous agents running natively within Twenty's automation/workflow engine, you must create a native `Agent` entity and assign an agent-compatible role.

#### via GraphQL
1. Create the Agent entity:
   ```graphql
   mutation CreateOneAgent($input: CreateAgentInput!) {
     createOneAgent(input: $input) {
       id
       name
       label
       modelId
     }
   }
   ```
2. Assign a role to the Agent:
   - *Note: Standard Admin roles cannot be assigned to agents by default (`canBeAssignedToAgents` is `false`). You must assign a role that has `canBeAssignedToAgents: true`.*
   - Assign role:
     ```graphql
     mutation AssignRoleToAgent($agentId: UUID!, $roleId: UUID!) {
       assignRoleToAgent(agentId: $agentId, roleId: $roleId)
     }
     ```

## Database Verification (PostgreSQL MCP)

To inspect and verify agents, API keys, and their assigned roles in the PostgreSQL database, use the following tables:
- **API Keys**: `core.apiKey`
- **Native Agents**: `metadata.agent`
- **Roles**: `core.role` (inspect properties `canBeAssignedToApiKeys`, `canBeAssignedToAgents`, `canBeAssignedToUsers`)
- **Role Assignments (Targets)**: `metadata.roleTarget` (links a role to `apiKeyId`, `agentId`, or `userWorkspaceId` under constraints)

### Common Verification Queries
- **Find all active API Keys for a workspace**:
  ```sql
  SELECT id, name, "expiresAt" FROM core."apiKey" WHERE "workspaceId" = 'YOUR_WORKSPACE_ID' AND "revokedAt" IS NULL;
  ```
- **Find role assignments for API keys/agents**:
  ```sql
  SELECT rt.id, r.label, rt."apiKeyId", rt."agentId"
  FROM metadata."roleTarget" rt
  JOIN core.role r ON rt."roleId" = r.id
  WHERE rt."workspaceId" = 'YOUR_WORKSPACE_ID';
  ```

## Guardrails

- **Token Security**: The generated JWT token is returned only once at creation time. Keep it secure and do not expose it in logs or public outputs.
- **Role Assignment Constraints**:
  - API keys can be assigned roles where `canBeAssignedToApiKeys` is `true` (such as the default Admin role).
  - Native Agents can only be assigned roles where `canBeAssignedToAgents` is `true`. Always check this column in the database or GraphQL schema before attempting assignments.
- **Principle of Least Privilege**: Avoid assigning the standard Admin role to integrations unless fully required. Prefer creating scoped roles with specific permissions for each agent.
