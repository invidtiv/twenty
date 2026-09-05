---
name: twenty-database-upgrade-commands
description: "Handle Twenty database reset, initialization, migration generation, and upgrade command workflows with correct fast/slow instance-command patterns and validation order."
---

# Twenty Database Upgrade Commands

## Use This Skill When

- A task changes backend entities/schema.
- You need to generate or run instance/workspace upgrade commands.
- You need safe DB lifecycle commands during development.

## Primary References

- `packages/twenty-server/project.json`
- `packages/twenty-server/docs/UPGRADE_COMMANDS.md`
- `CLAUDE.md`
- `packages/twenty-docs/developers/contribute/capabilities/backend-development/server-commands.mdx`

## Canonical Commands

From repository root:

```bash
npx nx database:reset twenty-server
npx nx run twenty-server:database:init
npx nx run twenty-server:database:migrate
npx nx run twenty-server:database:migrate:generate --name <name> --type <fast|slow>
```

## Upgrade Model

- **Fast instance commands**: immediate schema upgrades.
- **Slow instance commands**: run data migration first (`runDataMigration`) then schema finalization.
- **Workspace commands**: iterate active/suspended workspaces for per-workspace backfills.

Execution order (per `UPGRADE_COMMANDS.md`):

1. Instance fast
2. Instance slow
3. Workspace commands

## Execution Pattern

1. Confirm change needs schema and/or data migration.
2. Generate command with correct `--type` (`fast` or `slow`).
3. Implement both `up` and `down` for instance commands.
4. Run migrate/reset/init flows as required by task scope.
5. Validate with integration tests if behavior depends on migrated state.

## Guardrails

- Never hand-edit auto-registration constants for commands.
- Never delete or rewrite committed migration logic retroactively.
- Prefer additive, reversible migrations with explicit rollback paths.
