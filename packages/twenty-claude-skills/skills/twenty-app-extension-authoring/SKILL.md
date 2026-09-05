---
name: twenty-app-extension-authoring
description: "Build and customize Twenty SDK apps (objects, fields, views, logic, layouts) with CLI-driven scaffolding, manifest-safe patterns, and direct references to the extension documentation in this monorepo."
---

# Twenty App Extension Authoring

## Use This Skill When

- The task is to build or customize a Twenty app extension rather than core monorepo behavior.
- You need to create/update entities like objects, fields, logic functions, views, navigation, layouts, front components, skills, agents, roles, or connection providers.
- You need app-extension CLI/testing/remotes/publishing guidance.
- You need to scaffold a new app from scratch.

## Primary References

### Getting started
- `packages/twenty-docs/developers/extend/apps/getting-started/quick-start.mdx`
- `packages/twenty-docs/developers/extend/apps/getting-started/concepts.mdx`
- `packages/twenty-docs/developers/extend/apps/getting-started/scaffolding.mdx`
- `packages/twenty-docs/developers/extend/apps/getting-started/project-structure.mdx`
- `packages/twenty-docs/developers/extend/apps/getting-started/troubleshooting.mdx`

### Config
- `packages/twenty-docs/developers/extend/apps/config/application.mdx`
- `packages/twenty-docs/developers/extend/apps/config/roles.mdx`
- `packages/twenty-docs/developers/extend/apps/config/install-hooks.mdx`
- `packages/twenty-docs/developers/extend/apps/config/public-assets.mdx`

### Data
- `packages/twenty-docs/developers/extend/apps/data/objects.mdx`
- `packages/twenty-docs/developers/extend/apps/data/extending-objects.mdx`
- `packages/twenty-docs/developers/extend/apps/data/relations.mdx`

### Logic
- `packages/twenty-docs/developers/extend/apps/logic/logic-functions.mdx`
- `packages/twenty-docs/developers/extend/apps/logic/skills-and-agents.mdx`
- `packages/twenty-docs/developers/extend/apps/logic/connections.mdx`

### Layout
- `packages/twenty-docs/developers/extend/apps/layout/views.mdx`
- `packages/twenty-docs/developers/extend/apps/layout/navigation-menu-items.mdx`
- `packages/twenty-docs/developers/extend/apps/layout/front-components.mdx`
- `packages/twenty-docs/developers/extend/apps/layout/page-layouts.mdx`
- `packages/twenty-docs/developers/extend/apps/layout/command-menu-items.mdx`

### Operations
- `packages/twenty-docs/developers/extend/apps/operations/cli.mdx`
- `packages/twenty-docs/developers/extend/apps/operations/testing.mdx`
- `packages/twenty-docs/developers/extend/apps/operations/publishing.mdx`

### Other
- `packages/create-twenty-app/src/constants/template/AGENTS.md`
- `packages/twenty-sdk/README.md`

## App Lifecycle & Concepts

A Twenty app is a TypeScript package that extends a workspace with custom entities. The SDK detects `export default defineEntity(...)` calls via AST analysis at build time and produces a manifest. Entities are validated at build time with full IDE autocompletion and type safety.

```
Scaffold  →  Dev (live sync)  →  Build  →  Deploy / Publish
npx create-twenty-app   yarn twenty dev     yarn twenty dev:build   yarn twenty app:publish --private
                                              yarn twenty app:publish (npm)
```

### Sandboxing

- **Logic functions** run in isolated Node.js processes with a typed API client scoped to the app's role permissions.
- **Front components** run in Web Workers using Remote DOM — sandboxed but rendering native DOM (not iframes).
- **Permissions** are enforced at the API level. The runtime token (`TWENTY_APP_ACCESS_TOKEN`) is derived from the role declared with `defineApplicationRole()`.

## Quick Start (New App)

```bash
npx create-twenty-app@latest my-twenty-app
cd my-twenty-app
yarn twenty dev          # live sync
yarn twenty dev --once   # single build + sync, exits
```

The scaffolder generates `application-config.ts`, a default role, a starter entity, CI workflows, and an integration test.

## Recommended Entity Scaffolding

Use `yarn twenty dev:add <entity>` instead of handwritten boilerplate when possible:

```bash
yarn twenty dev:add object
yarn twenty dev:add field
yarn twenty dev:add logicFunction
yarn twenty dev:add frontComponent
yarn twenty dev:add role
yarn twenty dev:add skill
yarn twenty dev:add agent
yarn twenty dev:add view
yarn twenty dev:add navigationMenuItem
yarn twenty dev:add pageLayout
```

Pass `--path <dir>` for a custom output directory. Pass the entity type directly to skip the interactive picker.

## Core Development Loop

```bash
# Development
yarn twenty dev                      # watch + live sync
yarn twenty dev --once               # single build + sync (CI, scripts)
yarn twenty dev --verbose            # detailed build logs and traces
yarn twenty dev:typecheck            # tsc --noEmit

# Logic function execution & logs
yarn twenty dev:function:exec -n <name> -p '{"key":"value"}'
yarn twenty dev:function:exec -u <uuid>
yarn twenty dev:function:exec --postInstall
yarn twenty dev:function:exec --preInstall
yarn twenty dev:function:logs -n <name>

# Remotes
yarn twenty remote:add               # add a server (opens browser for OAuth)
yarn twenty remote:add --local       # auto-detect localhost:2020 / 3000
yarn twenty remote:add --url <url> --api-key <key> --as <name>
yarn twenty remote:list
yarn twenty remote:use <name>

# App lifecycle
yarn twenty app:uninstall --yes
yarn twenty app:install
yarn twenty app:publish --private    # deploy tarball to server
yarn twenty app:publish              # publish to npm / marketplace
yarn twenty app:publish --tag beta
yarn twenty dev:catalog-sync         # force marketplace sync
```

Credentials are stored in `~/.twenty/config.json`.

## Entity Types Quick Reference

Every entity is declared with `export default defineEntity(...)` from `twenty-sdk/define`. File organization is up to you — AST-based detection finds them anywhere in `src/`.

| Entity | Define function | Purpose |
|--------|----------------|---------|
| **Application** | `defineApplication` | App identity, variables, marketplace metadata |
| **Role** | `defineRole` / `defineApplicationRole` | Permission sets |
| **Object** | `defineObject` | Custom record types |
| **Field** | `defineField` | Add fields to objects you don't own |
| **Relation** | `defineField` with `FieldType.RELATION` | Bidirectional links |
| **Logic Function** | `defineLogicFunction` | Server-side TS with triggers |
| **Skill** | `defineSkill` | Reusable AI instructions |
| **Agent** | `defineAgent` | AI assistants with custom prompts |
| **Connection Provider** | `defineConnectionProvider` | OAuth for third-party APIs |
| **View** | `defineView` | Pre-configured record list views |
| **Navigation Menu Item** | `defineNavigationMenuItem` | Sidebar entries |
| **Page Layout** | `definePageLayout` / `definePageLayoutTab` | Record detail page tabs/widgets |
| **Front Component** | `defineFrontComponent` | Sandboxed React UI |
| **Command Menu Item** | `defineCommandMenuItem` | Cmd+K / quick actions |
| **Install Hooks** | `definePreInstallLogicFunction` / `definePostInstallLogicFunction` | Pre/post install logic |

## Execution Pattern

1. Start from app intent: data model, behavior, UI placement, AI behavior.
2. Define/adjust `application-config.ts` and the default role (`defineApplicationRole`) first.
3. Add entities with `dev:add` commands or hand-author when needed.
4. Ensure user-facing object/view/nav coherence:
   - Every user-facing custom object needs at least one `ViewKey.INDEX` view.
   - Every view needs a `NavigationMenuItemType.VIEW` menu item to appear in the sidebar.
5. Validate via `yarn twenty dev --once` and tests when needed.

## Key Patterns

### Application Config (`defineApplication`)

Exactly one per app. Declares identity, `applicationVariables` (env vars for functions/components), optional `serverVariables` (for OAuth credentials), and marketplace metadata (`logoUrl`, `screenshots`, `author`, etc.).

- `applicationVariables` with `isSecret: false` are available in front components via `getApplicationVariable('VAR')`.
- `applicationVariables` with `isSecret: true` are only injected into logic functions (`process.env.VAR`).
- The default role is auto-detected from the file using `defineApplicationRole()` — do not set `defaultRoleUniversalIdentifier` manually.

### Roles & Permissions (`defineApplicationRole` / `defineRole`)

- Exactly one `defineApplicationRole()` per app. It controls what logic functions and front components can access.
- Use `defineRole()` for any additional roles.
- Follow least-privilege: start from the scaffolded broad-read role and progressively restrict `objectPermissions`, `fieldPermissions`, and `permissionFlags`.
- Use `STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS` from `twenty-sdk/define` to reference built-in objects.

### Objects & Fields (`defineObject` / `defineField`)

- `universalIdentifier` must be a stable UUID v4, kept constant across deployments.
- Inline fields inside `defineObject` do **not** need `objectUniversalIdentifier`.
- Use `defineField` to extend standard Twenty objects (Person, Company, etc.) or objects from other apps.
- Base fields (`id`, `name`, `createdAt`, etc.) are added automatically — do not declare them.

### Relations

Relations are always bidirectional. You need **two** `FieldType.RELATION` fields that cross-reference each other via `relationTargetFieldMetadataUniversalIdentifier`.

- **MANY_TO_ONE** side holds the foreign key (`joinColumnName`).
- **ONE_TO_MANY** side is the inverse.
- Export field IDs as named constants to avoid circular import issues.
- Use `OnDeleteAction.CASCADE`, `SET_NULL`, `RESTRICT`, or `NO_ACTION` on the MANY_TO_ONE side.

### Logic Functions (`defineLogicFunction`)

Handler receives typed payloads based on trigger:

| Trigger | Settings key | Payload type | Import from |
|---------|-------------|--------------|-------------|
| HTTP route | `httpRouteTriggerSettings` | `RoutePayload` | `twenty-sdk/logic-function` |
| Cron | `cronTriggerSettings` | (none) | — |
| Database event | `databaseEventTriggerSettings` | `DatabaseEventPayload` | `twenty-sdk/logic-function` |
| AI tool | `toolTriggerSettings` | Inferred from `inputSchema` | — |
| Workflow action | `workflowActionTriggerSettings` | Inferred from `inputSchema` | — |

- HTTP routes are exposed under `/s/<path>`.
- Use `forwardedRequestHeaders` to whitelist headers you need in the handler.
- AI tools need a good `description` — agents rely on it to decide when to call the tool.
- Input schemas can be inferred automatically; provide them explicitly for richer typing.

### Typed API Clients

| Client | Import | Endpoint | Notes |
|--------|--------|----------|-------|
| `CoreApiClient` | `twenty-client-sdk/core` | `/graphql` | Generated from workspace schema at dev/build time |
| `MetadataApiClient` | `twenty-client-sdk/metadata` | `/metadata` | Pre-built; includes `uploadFile` method |

Credentials (`TWENTY_API_URL`, `TWENTY_APP_ACCESS_TOKEN`) are injected automatically — no manual setup needed.

### Front Components (`defineFrontComponent`)

- Run in a Web Worker. Node built-ins are **not** available — only browser APIs and npm packages.
- Use `twenty-sdk/ui` for Twenty UI primitives (Button, Tag, Status, Chip, Avatar, etc.).
- **Non-headless** (default) renders visible UI in the side panel or as a widget.
- **Headless** (`isHeadless: true`) mounts invisibly — use with `Command`, `CommandLink`, `CommandModal`, or `CommandOpenSidePanelPage` from `twenty-sdk/command` for one-click actions.
- Surface front components via `defineCommandMenuItem` (Cmd+K / quick action) or embed as widgets in `definePageLayout`.

Runtime hooks (`twenty-sdk/front-component`):
- `useUserId()`, `useSelectedRecordIds()`, `useFrontComponentId()`
- `getApplicationVariable('VAR')` — non-secret vars only
- `navigate()`, `enqueueSnackbar()`, `closeSidePanel()`, `openSidePanelPage()`, `unmountFrontComponent()`

### Views (`defineView`)

- `key: ViewKey.INDEX` is the canonical list view for an object.
- `fields` controls column visibility, order, and size.
- `filters` can be pre-applied. Match operands to field types — an invalid combo is rejected at sync time.
- A view is invisible in the sidebar until paired with a `NavigationMenuItemType.VIEW` menu item.

### Navigation Menu Items (`defineNavigationMenuItem`)

| Type | Required field | Behavior |
|------|---------------|----------|
| `VIEW` | `viewUniversalIdentifier` | Opens a saved view |
| `LINK` | `link` | External URL |
| `FOLDER` | `name` | Groups nested items |
| `OBJECT` | `targetObjectUniversalIdentifier` | Opens object's default index page |
| `PAGE_LAYOUT` | `pageLayoutUniversalIdentifier` | Opens a standalone page layout |

### Page Layouts (`definePageLayout` / `definePageLayoutTab`)

- Use `definePageLayout` when you own the entire detail page (your custom object).
- Use `definePageLayoutTab` to add a single tab to an existing layout (standard objects or your own).
- Widgets can render front components, relation lists, or other built-in types.
- Use higher `position` values (e.g., 50) to place custom tabs after built-in ones.

### Skills & Agents (`defineSkill` / `defineAgent`)

- **Skills** define reusable AI instructions (`content`).
- **Agents** are AI assistants with a custom system `prompt` and optional `modelId`.
- Both are alpha — functional but still evolving.

### Connection Providers (`defineConnectionProvider`)

- Declare OAuth handshake details (`authorizationEndpoint`, `tokenEndpoint`, `scopes`).
- Store actual `client_id` / `client_secret` in `defineApplication.serverVariables` (entered by server admin, not committed to repo).
- In logic functions, use `listConnections({ providerName })` to get fresh access tokens (auto-refreshed).
- Callback URL to whitelist: `https://<server>/apps/oauth/callback`.

### Install Hooks (`definePreInstallLogicFunction` / `definePostInstallLogicFunction`)

- **Pre-install**: runs before metadata migration. Synchronous, blocks install, failure aborts with no schema changes. Use for backups, validation, data rekeying before destructive migrations.
- **Post-install**: runs after metadata migration + SDK generation. Async by default (queued with 3 retries); opt into sync with `shouldRunSynchronously: true`. Use for seeding data, registering external resources.
- Both receive `InstallPayload: { previousVersion?: string; newVersion: string }`.
- Neither runs in `yarn twenty dev` mode — use `yarn twenty dev:function:exec --postInstall` / `--preInstall` to trigger manually.
- At most one of each per app.

### Testing

The scaffold ships with Vitest. Integration tests use programmatic SDK APIs (`appBuild`, `appDeploy`, `appInstall`, `appUninstall` from `twenty-sdk/cli`) against a real Twenty server.

```bash
yarn test        # run integration tests
yarn test:watch  # watch mode
yarn twenty dev:typecheck
```

CI workflow (`ci.yml`) spins up an ephemeral Twenty test instance automatically — no secrets needed.

### Publishing

Two paths:
1. **Tarball** (`yarn twenty app:publish --private`) — deploy directly to a server for internal/private use.
2. **npm** (`yarn twenty app:publish`) — list in the Twenty marketplace. Requires `"twenty-app"` in `package.json` `keywords`.

- Bump `package.json` `version` (semver) for updates. Same/lower versions are rejected.
- Declare `engines.twenty` in `package.json` for server version compatibility (e.g., `">=2.3.0"`).
- Marketplace syncs from npm hourly; force with `yarn twenty dev:catalog-sync`.

## Guardrails

- Keep all `universalIdentifier` values as valid UUID v4 and **stable** after first publication. Changing them creates duplicate entities.
- Avoid creating user-facing objects without an index view (`ViewKey.INDEX`).
- Avoid creating views without navigation menu items — users won't find them.
- Ensure front components are responsive to widget dimensions unless intentionally scroll-based.
- Keep entity declarations manifest-friendly: `export default defineEntity(...)`.
- Do not commit OAuth secrets or API keys — use `serverVariables` / `applicationVariables`.
- Pre-install and post-install hooks must be idempotent (retries and upgrades may re-run them).
- `CoreApiClient` is generated at dev/build time — it will throw if used before running `yarn twenty dev` or `yarn twenty dev:build`.
- Front components cannot use Node built-in modules; logic functions can.
