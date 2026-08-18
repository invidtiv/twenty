#!/usr/bin/env bash
# Print the Kairos check balance: monthly analysis + grand tally.
set -euo pipefail
cd "$(dirname "$0")"
set -a; source /home/bsdev/.hermes/profiles/kairos/.env; set +a
curl -s -X POST http://127.0.0.1:2020/s/kairos/query \
  -H "Authorization: Bearer $TWENTY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"operation":"getCheckBalance"}' | python3 balance_printer.py
