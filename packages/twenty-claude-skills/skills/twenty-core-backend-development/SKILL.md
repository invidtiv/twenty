---
name: twenty-core-backend-development
description: "Implement Twenty backend/API behavior in NestJS modules with correct command workflows, middleware awareness, and safe module-level validation for GraphQL, REST, MCP, and worker paths."
---

# Twenty Core Backend Development

## Use This Skill When

- The task touches `packages/twenty-server` business logic or API behavior.
- You need to modify GraphQL/REST/MCP behavior, auth context, or worker processing.
- You need to add or change standard objects, workspace entities, metadata modules, or core modules.
- You need to work with message queues, cron jobs, database migrations, or CLI commands.
- You need backend-focused validation commands.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: TypeORM (core/metadata schemas); custom **TwentyORM** for workspace schemas
- **GraphQL**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) via `@graphql-yoga/nestjs`
- **Database**: PostgreSQL (multi-tenant: `core`, `metadata`, workspace-specific schemas)
- **Message Queue**: BullMQ (with sync driver for local dev)
- **Testing**: Jest
- **Linting**: Oxlint + oxfmt (not ESLint/Prettier)
- **Build**: Nx + Nest CLI

## Primary References

- `CLAUDE.md`
- `packages/twenty-server/project.json`
- `packages/twenty-server/src/main.ts`
- `packages/twenty-server/src/app.module.ts`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/server-commands.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/best-practices-server.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/folder-architecture-server.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/custom-objects.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/feature-flags.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/queue.mdx`

## Folder Architecture

```
packages/twenty-server/src/
├── main.ts                    # HTTP server bootstrap (NestFactory, sessions, CORS, uploads)
├── app.module.ts              # Root module — registers GraphQL, REST, MCP, middlewares
├── command/                   # CLI command entry (nest-commander)
│   ├── command.ts
│   └── command.module.ts
├── queue-worker/              # Background worker entry (BullMQ consumers)
│   ├── queue-worker.ts
│   └── queue-worker.module.ts
├── filters/                   # Global exception filters
├── guards/                    # Auth guards (WorkspaceAuthGuard, SettingsPermissionGuard, etc.)
├── engine/
│   ├── api/                   # API layer
│   │   ├── graphql/           # GraphQL schema builders, query runners, resolvers
│   │   ├── rest/              # REST API controllers and handlers
│   │   └── mcp/               # Model Context Protocol (MCP) endpoints
│   ├── core-modules/          # Core business modules (auth, billing, feature-flag, etc.)
│   ├── metadata-modules/      # Metadata management (objects, fields, relations, views)
│   ├── twenty-orm/            # Custom ORM for workspace-scoped entities
│   ├── workspace-datasource/  # Per-workspace DB connection management
│   ├── workspace-manager/     # Workspace lifecycle (create, migrate, seed, clean)
│   ├── dataloaders/           # GraphQL dataloader modules
│   ├── decorators/            # Custom NestJS decorators
│   └── middlewares/           # Express middlewares (auth context hydration)
├── modules/                   # Domain modules with standard objects & business logic
│   ├── <domain>/
│   │   ├── standard-objects/  # Workspace entity definitions (*.workspace-entity.ts)
│   │   ├── resolvers/         # GraphQL resolvers (when needed)
│   │   ├── services/          # Domain services
│   │   ├── jobs/              # Queue job handlers
│   │   ├── listeners/         # Event listeners
│   │   ├── commands/          # CLI sub-commands
│   │   └── crons/             # Cron jobs
│   └── modules.module.ts      # Aggregates all domain modules
└── database/
    ├── typeorm/               # Core/metadata TypeORM config
    ├── pg/                    # Postgres utilities
    ├── scripts/               # DB setup/truncate scripts
    └── clickHouse/            # ClickHouse analytics DB
```

### Key distinctions

| Layer | Scope | Example |
|-------|-------|---------|
| `engine/core-modules` | Server-wide (users, workspaces, auth, billing) | `FeatureFlagModule`, `AuthModule` |
| `engine/metadata-modules` | Schema metadata (object/field definitions) | `FieldMetadataModule`, `ObjectMetadataModule` |
| `modules` | Domain business logic + standard objects | `CalendarModule`, `MessagingModule` |
| `engine/api` | API transport (GraphQL, REST, MCP) | `CoreGraphQLApiModule`, `RestApiModule` |

## Canonical Commands

From repository root:

```bash
# Development
npx nx start twenty-server                           # Start dev server with watch
npx nx run twenty-server:worker                      # Start background worker with watch
npx nx run twenty-server:start:debug                 # Debug mode with watch

# Code quality
npx nx lint:diff-with-main twenty-server             # Lint changed files only (preferred)
npx nx lint:diff-with-main twenty-server --configuration=fix
npx nx lint twenty-server                            # Full lint (slower)
npx nx lint twenty-server --configuration=fix
npx nx typecheck twenty-server                       # TypeScript check
npx nx fmt twenty-server                             # Format (oxfmt)

# Testing
npx nx test twenty-server                            # Unit tests
npx nx run twenty-server:test:integration            # Integration tests
npx nx run twenty-server:test:integration:with-db-reset  # Integration tests + DB reset
npx nx run twenty-server:test:debug                  # Jest debug mode

# Database
npx nx database:reset twenty-server                  # Reset DB + seed dev data
npx nx run twenty-server:database:reset:no-seed      # Reset without seeding
npx nx run twenty-server:database:migrate:generate --name <name> --type <fast|slow>
npx nx run twenty-server:database:migrate            # Run instance commands (fast only)
npx nx run twenty-server:database:init               # Setup DB + run migrations
npx nx run twenty-server:database:init:prod          # Initialize for production

# CLI commands
npx nx run twenty-server:command -- <command>        # Run a CLI command
npx nx run twenty-server:command-no-deps -- <command> # Skip build deps

# Other
npx nx build twenty-server                           # Production build
npx nx run twenty-server:ts-node -- <script>         # Run script with ts-node
npx nx run twenty-server:ts-node-no-deps -- <script>
```

### Running a single test file (fastest)

```bash
cd packages/twenty-server && npx jest "pattern or filename"
# or
npx jest path/to/test.test.ts --config=packages/twenty-server/jest.config.mjs
```

## Module Patterns

### NestJS module conventions

- Every module lives in its own directory with a `<name>.module.ts` file.
- Import `TypeOrmModule.forFeature([Entity])` for metadata/core entities.
- Import `TwentyORMModule` or `WorkspaceDataSourceModule` for workspace-scoped data access.
- Export services that other modules need via the module's `exports` array.
- Keep modules **feature-scoped** — one module per bounded context.

### Standard module structure

```
src/modules/<domain>/
├── <domain>.module.ts
├── standard-objects/
│   └── <entity>.workspace-entity.ts
├── services/
│   └── <domain>.service.ts
├── resolvers/
│   └── <domain>.resolver.ts
├── jobs/
│   └── <job-name>.job.ts
├── listeners/
│   └── <event-name>.listener.ts
└── commands/
    └── <command-name>.command.ts
```

## API Layers

### GraphQL

Three separate GraphQL endpoints are registered in `app.module.ts`:

| Endpoint | Module | Purpose |
|----------|--------|---------|
| `/graphql` | `CoreGraphQLApiModule` | Workspace data CRUD (auto-generated from metadata) |
| `/metadata` | `MetadataGraphQLApiModule` | Schema management (objects, fields, views) |
| `/admin-panel` | `AdminPanelGraphQLApiModule` | Admin operations |

Middlewares applied to all GraphQL routes:
- `GraphQLHydrateRequestFromTokenMiddleware` — extracts auth from JWT/API key
- `WorkspaceAuthContextMiddleware` — loads workspace context

Resolver pattern:
```ts
@MetadataResolver()
@UsePipes(ResolverValidationPipe)
@UseFilters(AuthGraphqlApiExceptionFilter)
@UseGuards(WorkspaceAuthGuard)
export class MyResolver { ... }
```

### REST

- Base: `/rest/` (core API), `/rest/metadata/` (metadata API)
- Middleware: `RestCoreMiddleware` + `WorkspaceAuthContextMiddleware`
- Controllers in `engine/api/rest/core/` and `engine/api/rest/metadata/`

### MCP (Model Context Protocol)

- Endpoint: `/mcp`
- Middleware: `McpMethodGuardMiddleware`
- Located in `engine/api/mcp/`

## Standard Objects / Workspace Entities

Standard objects are defined as TypeScript classes extending `BaseWorkspaceEntity`:

```ts
// src/modules/<domain>/standard-objects/<name>.workspace-entity.ts
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { FieldMetadataType } from 'twenty-shared/types';
import { EntityRelation } from 'src/engine/workspace-manager/workspace-migration/types/entity-relation.interface';

export class PersonWorkspaceEntity extends BaseWorkspaceEntity {
  name: string;
  email: string;
  company: EntityRelation<CompanyWorkspaceEntity>;
  companyId: string;
}
```

Key points:
- Extend `BaseWorkspaceEntity` for automatic `id`, `createdAt`, `updatedAt`, etc.
- Relations use `EntityRelation<T>` for the relation side and `<name>Id` for the foreign key.
- Objects are registered in metadata tables and TwentyORM generates the actual DB schema dynamically.
- Custom objects are created via the `/metadata` GraphQL API and computed into the workspace GraphQL schema.

## TwentyORM

TwentyORM is a custom abstraction over TypeORM for workspace-scoped entities:

- `BaseWorkspaceEntity` — base class for all workspace entities
- `TwentyORMModule` — registers the ORM globally
- `GlobalWorkspaceDataSourceModule` — provides workspace-scoped data sources
- `WorkspaceDataSourceModule` — per-workspace connection injection

Use `WorkspaceDataSourceModule` in modules that need to query workspace data:
```ts
@Module({
  imports: [WorkspaceDataSourceModule],
  providers: [MyService],
})
export class MyModule {}
```

## Message Queue & Workers

Queue system is based on BullMQ with a sync driver fallback for local dev.

Available queues (`MessageQueue` enum):
- `messagingQueue`, `calendarQueue`, `emailQueue`, `webhookQueue`
- `workflowQueue`, `billingQueue`, `workspaceQueue`
- `contactCreationQueue`, `entityEventsToDbQueue`
- `deleteCascadeQueue`, `logicFunctionQueue`, `triggerQueue`
- `aiQueue`, `aiStreamQueue`, `delayedJobsQueue`

### Creating a queue job

```ts
// Job class
@Processor(MessageQueue.messagingQueue)
export class MyJob {
  @Process(MyJob.name)
  async handle({ data }: MessageQueueJob<MyPayload>): Promise<void> {
    // job logic
  }
}
```

### Enqueuing work

```ts
constructor(
  @Inject(MessageQueue.messagingQueue)
  private readonly messageQueueService: MessageQueueService,
) {}

async doSomething() {
  await this.messageQueueService.add<MyPayload>({
    id: 'unique-id',
    name: MyJob.name,
    data: { ... },
  });
}
```

The worker process runs via `npx nx run twenty-server:worker`.

## Feature Flags

Feature flags are workspace-level toggles.

To add a new flag:
1. Add to `FeatureFlagKey` type in `feature-flag.entity.ts`
2. Add to `FeatureFlagKeys` enum in `feature-flag.entity.ts`
3. Backend usage: `@Gate({ featureFlag: 'IS_FEATURENAME_ENABLED' })`
4. Frontend usage: `const isEnabled = useIsFeatureEnabled('IS_FEATURENAME_ENABLED');`
5. Enable in DB: set `value = true` in `core.featureFlag` table for the workspace

## Auth, Guards & Middleware

### Middleware chain (from `app.module.ts`)

| Route | Middlewares |
|-------|-------------|
| `/graphql`, `/metadata`, `/admin-panel` | `GraphQLHydrateRequestFromTokenMiddleware` → `WorkspaceAuthContextMiddleware` |
| `/mcp` | `McpMethodGuardMiddleware` |
| `/rest/*` | `RestCoreMiddleware` → `WorkspaceAuthContextMiddleware` |

### Common guards

- `WorkspaceAuthGuard` — validates workspace auth context
- `SettingsPermissionGuard(PermissionFlagType.*)` — checks workspace settings permissions
- `NoPermissionGuard` — explicitly skips permission checks

### Auth decorators

- `@AuthWorkspace()` — injects the current `WorkspaceEntity`
- `@AuthUserWorkspaceId()` — injects the current user's workspace member ID
- `@AuthUser()` — injects the current user

## Database & Migrations

### Schema structure

| Schema | Purpose |
|--------|---------|
| `core` | Server-wide data (users, workspaces, auth, billing, feature flags) |
| `metadata` | Schema definitions (objects, fields, relations, views) |
| `workspace_<id>` | Per-workspace data (actual records) |

### Migration types

- **Fast instance commands** — lightweight, run automatically on server start
- **Slow instance commands** — heavy migrations, run manually via `database:migrate --include-slow`

### Generating migrations

```bash
npx nx run twenty-server:database:migrate:generate --name <name> --type <fast|slow>
```

### Core/metadata migrations (TypeORM)

```bash
npx nx run twenty-server:database:migrate:generate  # TypeORM migration for core/metadata
```

## CLI Commands

CLI commands use `nest-commander` and run via:
```bash
npx nx run twenty-server:command -- <command-name> [args]
```

Command modules are registered in `src/command/command.module.ts`.

Example locations:
- `src/modules/*/commands/*.command.ts`
- `src/engine/core-modules/*/commands/*.command.ts`

## Best Practices

### Follow a modular approach

Break code into reusable NestJS modules with clear boundaries. Each module encapsulates a feature and exports only what other modules need.

### Single-responsibility services

Create services with a clear, single responsibility. Expose them via module `exports` for cross-module use through dependency injection.

### Avoid `any`

Never use `any`. Always define interfaces/types for objects, function parameters, and return values. TypeScript inference is your friend — don't disable it.

### Keep changes module-scoped

- Avoid cross-cutting changes across multiple domains.
- Respect Nest module boundaries — import what you need, don't reach into another module's internals.
- Do not modify unrelated middleware chains in `app.module.ts`.

### Preserve auth context

Auth middleware runs before resolvers/controllers. Do not bypass `WorkspaceAuthGuard` unless explicitly required and documented.

## Execution Pattern

1. Identify whether the change belongs in `engine/core-modules`, `engine/metadata-modules`, `modules`, `engine/api`, or `database`.
2. Follow existing module conventions — match the folder structure and wiring patterns.
3. If adding a new entity, define the workspace entity in `modules/<domain>/standard-objects/`.
4. If adding a resolver, use `@MetadataResolver()` + standard guard/filter/pipe stack.
5. If adding a queue job, register the processor and enqueue from a service.
6. Validate with diff lint + typecheck + nearest tests.
7. If data model changes are required, use the migration workflow.
8. Summarize behavior changes with touched routes/resolvers/commands.

## Guardrails

- Keep changes module-scoped and avoid cross-cutting churn.
- Do not modify unrelated middleware chains in `app.module.ts`.
- Respect existing bootstrap/config patterns in `main.ts`.
- Never use `any` — always provide explicit types.
- Export services via module `exports`, not by importing files directly.
- Use `WorkspaceAuthGuard` on all new resolvers/controllers unless explicitly exempted.
- Queue jobs must be idempotent — they may be retried.
- If data model changes are required, hand off to migration workflow skill.
- Integration tests require a running DB — use `with-db-reset` when schema changed.
- Prefer `lint:diff-with-main` over full `lint` for faster feedback.
