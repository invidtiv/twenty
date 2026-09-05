---
name: twenty-customization-development
description: "Develop and customize the Twenty monorepo safely and quickly by routing tasks to the right package, following repository conventions, using the canonical Nx commands, and relying on concrete file references for frontend, backend, data, and app-extension work."
---

# Twenty Customization & Development

## Overview

Use this skill when an AI agent needs to implement or modify features in the Twenty monorepo.

This skill is optimized for two work modes:

1. **Core product customization** inside the monorepo (`twenty-front`, `twenty-server`, shared packages).
2. **App extension development** through Twenty SDK concepts (skills, agents, objects, views, logic functions).

It is the **orchestration skill** — it routes to more specific skills for deep domain work:
- Frontend UI work → `twenty-core-frontend-development`
- Backend/API work → `twenty-core-backend-development`
- App extension entities → `twenty-app-extension-authoring`
- AI skills/agents in apps → `twenty-app-ai-skills-and-agents`
- Database migrations → `twenty-database-upgrade-commands`
- Record presentation → `twenty-record-presentation`

## Monorepo Package Map

```
packages/
├── twenty-front/              # React SPA (Vite, Apollo, Jotai, Linaria)
├── twenty-server/             # NestJS backend (TypeORM, GraphQL Yoga, BullMQ)
├── twenty-shared/             # Cross-cutting types, utils, constants (build first)
├── twenty-ui/                 # Shared React component library
├── twenty-utils/              # Shared utility functions
├── twenty-sdk/                # App extension SDK (define* helpers, CLI)
├── twenty-client-sdk/         # Typed GraphQL client for app extensions
├── twenty-apps/               # Example/reference apps (hello-world, etc.)
├── create-twenty-app/         # Scaffold new Twenty apps
├── twenty-cli/                # CLI tooling
├── twenty-emails/             # Email templates
├── twenty-docs/               # Documentation (Mintlify)
├── twenty-website/            # Marketing website
├── twenty-e2e-testing/        # Playwright E2E tests
├── twenty-zapier/             # Zapier integration
├── twenty-companion/          # Companion features
├── twenty-docker/             # Docker configs
├── twenty-oxlint-rules/       # Custom lint rules
└── twenty-claude-skills/      # Agent skills (this package)
```

**Build order dependency**: `twenty-shared` must be built before `twenty-front` or `twenty-server`.

## High-Signal References

Read these first before changing code:

- Monorepo commands and conventions: `CLAUDE.md`
- Nx defaults and shared targets: `nx.json`
- Workspace package layout and runtime entrypoints: `package.json`
- Frontend project targets and GraphQL generation: `packages/twenty-front/project.json`
- Backend project targets, worker, and DB commands: `packages/twenty-server/project.json`
- Frontend root render entrypoint: `packages/twenty-front/src/index.tsx`
- Backend bootstrap and server config: `packages/twenty-server/src/main.ts`
- Backend module wiring and middleware chain: `packages/twenty-server/src/app.module.ts`
- Style guide: `packages/twenty-docs/developers/contribute/style-guide.mdx`
- Commands reference: `packages/twenty-docs/developers/contribute/commands.mdx`

## Task Routing (Where to Change)

### Frontend feature work

**Scope**: `packages/twenty-front/src/modules/*`, `packages/twenty-front/src/pages/*`, `packages/twenty-front/src/config/*`

**Use for**: UI behavior, page flows, client state, rendering, frontend GraphQL usage, routing, settings screens.

**Deep-dive skill**: `twenty-core-frontend-development`

### Backend/API/domain work

**Scope**: `packages/twenty-server/src/modules/*`, `packages/twenty-server/src/engine/*`, `packages/twenty-server/src/database/*`, `packages/twenty-server/src/command/*`, `packages/twenty-server/src/queue-worker/*`

**Use for**: Business logic, GraphQL/REST/MCP APIs, workspace auth flows, CLI commands, queue processing, schema/migration behavior.

**Deep-dive skill**: `twenty-core-backend-development`

### Shared contracts / cross-cutting types

**Scope**: `packages/twenty-shared/*`, `packages/twenty-ui/*`, `packages/twenty-utils/*`

**Use for**: Types, constants, and utilities that span frontend and backend. Changes here affect both sides.

**Build note**: `twenty-shared` must be rebuilt (`npx nx build twenty-shared`) before dependent packages pick up changes.

### App extension (SDK) work

**Scope**: App projects created with `create-twenty-app`, or `packages/twenty-apps/*`

**Use for**: Creating or evolving extension entities: `objects`, `fields`, `logic-functions`, `front-components`, `skills`, `agents`, `views`, `navigation-menu-items`, `page-layouts`, `command-menu-items`, `connection-providers`.

**Deep-dive skills**: `twenty-app-extension-authoring`, `twenty-app-ai-skills-and-agents`

### Database / migration work

**Scope**: `packages/twenty-server/src/database/*`, migration commands

**Use for**: Schema changes, data migrations, instance commands, workspace commands.

**Deep-dive skill**: `twenty-database-upgrade-commands`

## Cross-Cutting Conventions

Follow these repository rules while implementing anywhere in the monorepo:

### Tooling
- **Yarn 4** + **Nx** workflow (Node 24+).
- **Oxlint** + **oxfmt** for linting/formatting (not ESLint/Prettier).

### TypeScript
- Prefer **`type`** over `interface` unless extending third-party interfaces.
- Prefer **string literals** over enums (except GraphQL codegen enums and internal library APIs).
- **No `any`** — strict TypeScript enforced everywhere.
- **No type-only imports** — use regular imports (Oxlint `typescript/consistent-type-imports` enforces this).
- Use **Zod** for runtime validation of untyped objects.

### Naming
- **Variables**: camelCase, descriptive (`email` not `value`, `fieldMetadata` not `fm`).
- **Constants**: SCREAMING_SNAKE_CASE.
- **Types/Classes**: PascalCase.
- **Files/directories**: kebab-case (`.component.tsx`, `.service.ts`, `.entity.ts`, `.workspace-entity.ts`, `.resolver.ts`).
- **Event handlers**: `handleClick` (not `onClick` for the handler function).
- **Component props**: prefix with component name (`ButtonProps`).
- **Styled components**: prefix with `Styled` (`StyledTitle`).

### Imports
- Use **aliases** instead of relative paths:
  - `~` → `src/`
  - `@` → `src/modules/`
  - `@testing` → `src/testing/`
  - `twenty-ui/*` → shared UI subpaths

### Exports
- Prefer **named exports**; avoid default exports unless existing local conventions require one.
- Reuse helpers from `twenty-shared` where applicable (`isDefined`, `isNonEmptyString`, `isNonEmptyArray`).

### File size guidance
- Components under **300 lines**.
- Services under **500 lines**.

Source: `CLAUDE.md`, `packages/twenty-docs/developers/contribute/style-guide.mdx`.

## Canonical Commands

Run from repository root:

### Full dev loop

```bash
yarn start                       # Frontend + backend + worker concurrently
```

### Targeted package run

```bash
npx nx start twenty-front
npx nx start twenty-server
npx nx run twenty-server:worker
```

### Build (dependency order matters)

```bash
npx nx build twenty-shared       # Must be built first
npx nx build twenty-front
npx nx build twenty-server
npx nx build twenty-ui
```

### Lint (prefer diff-first)

```bash
npx nx lint:diff-with-main twenty-front
npx nx lint:diff-with-main twenty-server
npx nx lint:diff-with-main twenty-front --configuration=fix
npx nx lint:diff-with-main twenty-server --configuration=fix
```

### Full lint (slower)

```bash
npx nx lint twenty-front
npx nx lint twenty-server
npx nx lint twenty-front --configuration=fix
npx nx lint twenty-server --configuration=fix
```

### Format

```bash
npx nx fmt twenty-front
npx nx fmt twenty-server
```

### Typecheck

```bash
npx nx typecheck twenty-front
npx nx typecheck twenty-server
```

### Tests

```bash
# Frontend
npx nx test twenty-front
npx nx run twenty-front:storybook:serve:dev
npx nx run twenty-front:storybook:test
npx nx run twenty-front:storybook:coverage

# Backend
npx nx test twenty-server
npx nx run twenty-server:test:unit
npx nx run twenty-server:test:integration
npx nx run twenty-server:test:integration:with-db-reset

# Single file (fastest)
cd packages/{project} && npx jest "pattern or filename"
# or
npx jest path/to/test.test.ts --config=packages/{project}/jest.config.mjs
```

### GraphQL codegen

```bash
npx nx run twenty-front:graphql:generate
npx nx run twenty-front:graphql:generate --configuration=metadata
```

### Translations

```bash
npx nx run twenty-front:lingui:extract
npx nx run twenty-front:lingui:compile
```

### Database lifecycle

```bash
npx nx database:reset twenty-server
npx nx run twenty-server:database:reset:no-seed
npx nx run twenty-server:database:init
npx nx run twenty-server:database:migrate
npx nx run twenty-server:database:migrate:generate --name <name> --type <fast|slow>
npx nx run twenty-server:database:init:prod
npx nx run twenty-server:database:migrate:prod
```

### CLI commands

```bash
npx nx run twenty-server:command -- <command-name>
npx nx run twenty-server:command-no-deps -- <command-name>
```

### ts-node scripts

```bash
npx nx run twenty-server:ts-node -- <script>
npx nx run twenty-server:ts-node-no-deps -- <script>
npx nx run twenty-server:ts-node-no-deps-transpile-only -- <script>
```

## AI Agent Execution Playbook

For each request:

1. **Classify change type**: frontend, backend, full-stack, shared, extension SDK, database.
2. **Route to the right skill**:
   - Frontend-only → `twenty-core-frontend-development`
   - Backend-only → `twenty-core-backend-development`
   - App extension → `twenty-app-extension-authoring`
   - AI skills/agents in apps → `twenty-app-ai-skills-and-agents`
   - DB migrations → `twenty-database-upgrade-commands`
3. **Locate nearest module** using package boundaries above before editing.
4. **Apply minimal patch** in the narrowest scope possible.
5. **Run nearest validation first** (targeted lint/test/typecheck), then expand if needed.
6. **Report with file-level references** and exact command results.

## Extension-Specific Guardrails

When generating Twenty app extension entities (from `create-twenty-app` template guidance):

- Use `yarn twenty dev:add <entityType>` to scaffold entities whenever possible.
- Ensure generated UUIDs are valid UUID v4.
- Avoid creating object entities without index views when user-facing.
- Avoid creating views without corresponding navigation menu items.
- Ensure front components are responsive to fixed widget dimensions unless intentionally scroll-based.

Reference: `packages/create-twenty-app/src/constants/template/AGENTS.md`.

## Definition of Done

A customization task is complete only if:

- Changes are placed in the correct package and module boundary.
- Lint/typecheck/test commands relevant to touched code pass.
- If `twenty-shared` or `twenty-ui` changed, dependent packages were rebuilt and validated.
- DB-related changes include appropriate migration/command generation steps.
- The handoff includes touched files and the verification commands run.
