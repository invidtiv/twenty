#!/usr/bin/env bash
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major!==24 || minor<5) throw new Error("Use Node 24.5+; validated with 24.18.0")'
export NX_DAEMON=false
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"
node node_modules/nx/dist/bin/nx.js build twenty-server --parallel=1 --skip-nx-cache
