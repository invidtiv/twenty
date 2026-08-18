#!/usr/bin/env bash
# Re-apply the Kairos check-balance changes to a (re)created container.
set -euo pipefail
cd "$(dirname "$0")"
CONTAINER="${CONTAINER:-twenty-app-dev}"

# 1. DB: checkValue field, trigger, backfill, view columns
docker exec -i "$CONTAINER" psql "postgres://twenty:twenty@127.0.0.1:5432/default" \
  -v ON_ERROR_STOP=1 < 01-add-check-value-field.sql

# 2. Install the Kairos Balance SDK app (objects, views, pages, components)
echo "Install the app from packages/twenty-apps/kairos-balance:"
echo "  cd <repo>/packages/twenty-apps/kairos-balance"
echo "  yarn install"
echo "  NODE_OPTIONS=--preserve-symlinks yarn twenty remote:add --url http://127.0.0.1:2020 --api-key \$TWENTY_API_KEY --as kairos"
echo "  NODE_OPTIONS=--preserve-symlinks yarn twenty apply -f"

# 3. DB: workflows (check-in created/updated -> Balance Entry)
docker exec -i "$CONTAINER" psql "postgres://twenty:twenty@127.0.0.1:5432/default" \
  -v ON_ERROR_STOP=1 < 04-create-workflows.sql

# 4. DB: backfill balance entries for existing check-ins
docker exec -i "$CONTAINER" psql "postgres://twenty:twenty@127.0.0.1:5432/default" \
  -v ON_ERROR_STOP=1 < 05-backfill-balance-entries.sql

# 5. Restart so the server picks up metadata, bundles and trigger maps
docker restart "$CONTAINER"
echo "Re-applied. Verify with: ./balance.sh"
