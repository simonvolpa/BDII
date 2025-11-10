#!/usr/bin/env bash
set -e

DB="${MONGO_INITDB_DATABASE:-aseguradora}"

echo "==> Importando colecciones JSON a la base '$DB'..."
shopt -s nullglob
for f in /import/*.json; do
  coll="$(basename "$f" .json)"
  echo "  - Importando $coll desde $(basename "$f")"
  mongoimport \
    --db "$DB" \
    --collection "$coll" \
    --file "$f" \
    --jsonArray \
    --drop
done
echo "==> Importación finalizada."
