import json
import sys

d = json.load(sys.stdin)
if not d.get("ok"):
    print("error:", d)
    sys.exit(1)
b = d["balance"]
print(f'{"Month":<10}{"Checks":>7}{"<21h":>6}{">=21h":>7}{"Amount":>9}{"Balance":>10}')
for m in b["months"]:
    print(f'{m["month"]:<10}{m["checks"]:>7}{m["before21"]:>6}{m["after21"]:>7}{m["amount"]:>8}€{m["balance"]:>9}€')
print(f'\nTOTAL: {b["totalChecks"]} checks → {b["totalAmount"]}€')
