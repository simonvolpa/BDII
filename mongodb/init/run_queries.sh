#!/bin/bash
echo "Ejecutando queries de MongoDB..."

# Ejecutar cada archivo de queries dentro del contenedor
docker exec -i mongo mongosh < ./queries/agentes.js
docker exec -i mongo mongosh < ./queries/clientes.js
docker exec -i mongo mongosh < ./queries/polizas.js
docker exec -i mongo mongosh < ./queries/siniestros.js

echo "✅ Todas las queries se ejecutaron correctamente."