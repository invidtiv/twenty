# Local CRM operations

The canonical checkout is `/home/bsdev/TS/twenty`, branch `kairos-completion-fix`.
`/home/bsdev/TS/twenty-v2.29-from` is a compatibility symlink to that same checkout.
The older `dev/local-features` branch remains in the repository; it has not been merged into the newer core.
Both unpublished branch commits and all existing local feature changes were preserved.
The active Hermes MCP adapter now lives with the current app at
`packages/twenty-apps/kairos-operations/integrations/hermes`; its old `internal/` path is a symlink.

## Build

Use Node 24.18.0 (also pinned by the upstream Dockerfile) and the checked-in Yarn 4.13.0 release.
Install dependencies with `node .yarn/releases/yarn-4.13.0.cjs install --immutable` when necessary.
The retained dependency installation is from the newer checkout.

```bash
# Rebuild the backend and its dependencies without the Nx artifact cache.
npm exec --yes --package=node@24.18.0 -- bash ops/local-crm/build-server.sh
# Focused existing Kairos source tests.
node --test packages/twenty-apps/kairos-operations/tests/*.test.cjs packages/twenty-server/test/kairos-*.test.cjs
# Standard upstream frontend and full image build commands (not live deployment).
# node node_modules/nx/dist/bin/nx.js build twenty-front
# docker build --target twenty -f packages/twenty-docker/twenty/Dockerfile -t twentycrm/twenty:source-candidate .
```

`twenty-shared:generateBarrels` explicitly sets `FORCE_COLOR=0`. Nx otherwise injects
`FORCE_COLOR=true`; combined with inherited `NO_COLOR`, Node emits a warning inside
the synchronous formatter's worker and the generator hangs. A bounded comparison
reproduced this with both native TypeScript and tsx on Node 24; disabling forced
colors lets the unchanged generator finish. This setting is scoped to generation.

Validated on 2026-10-31: the uncached backend plus all six prerequisite tasks passed
on Node 24.18.0; 42 focused Kairos tests and three MCP adapter tests passed, and the
rebuilt deployment CLI displayed its help successfully.

## Live deployment and recovery

`twenty-app-dev` on port 2020 remains the existing all-in-one v2.29.0 image.
Its PostgreSQL and app storage are Docker volumes; the checkout is not mounted.
The unfinished disposition-ledger source changes have **not** been deployed.
A backend build does not establish that the full source tree reproduces the live frontend,
installed dependencies, or image. The old `Dockerfile.kairos-runtime` depends on a missing
local build image and is a historical recipe, not the recovery path.

The exact running image is retained as `twentycrm/twenty-app-dev:consolidation-recovery-20261031`
and exported privately with its image ID verified. Full container configuration,
a validated recovery Compose file, Git bundle, source archives, file hashes and DB dump are in:
`/home/bsdev/reports/twenty-consolidation-20261031/private/`.

To recover a **missing** CRM container, load `private/live-image.tar.gz` with `docker load -i`,
then run `docker compose -f private/compose.recovery.json up -d` from the report directory.
The Compose file reuses the two existing external volumes and contains private runtime
configuration. Existing containers with the same name must be assessed before replacement.
Do not attach a second PostgreSQL process to either live database volume.

The separate `twenty-dev-db-1` is stopped with restart disabled after a complete logical
backup and successful isolated PostgreSQL 16 restore. Its container and volume are retained.
Intentional rollback: `docker update --restart=unless-stopped twenty-dev-db-1`, then
`docker start twenty-dev-db-1` (reopens port 5432). Development Compose remains opt-in.
