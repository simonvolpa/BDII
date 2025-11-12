//MONGO
# MongoDB — Instrucciones de ejecución

## 1) Levantar el contenedor e importar datos
cd mongodb/

```bash
docker compose down -v
docker compose up -d

## 2) Para correr (y ver el resultado) de las queries. El numero corresponde al orden de los enunciados del TP.

docker exec -i mongo mongosh < ./queries/1.js
docker exec -i mongo mongosh < ./queries/2.js
docker exec -i mongo mongosh < ./queries/3.js
docker exec -i mongo mongosh < ./queries/4.js
docker exec -i mongo mongosh < ./queries/6.js
docker exec -i mongo mongosh < ./queries/9.js
docker exec -i mongo mongosh < ./queries/13A.js ## Alta
docker exec -i mongo mongosh < ./queries/13B.js ## Baja
docker exec -i mongo mongosh < ./queries/13M.js ## Modificacion
docker exec -i mongo mongosh < ./queries/14.js
docker exec -i mongo mongosh < ./queries/15.js


// NEO4J
## 1) Levantar el contenedor e importar datos

cd neo4j/neo4j-tp
docker compose up -d
docker exec -it neo4j-tp cypher-shell -u neo4j -p neo4j123
:source /import/seed_neo4j.cypher

:exit

## 2) Para correr (y ver el resultado) de las queries. El numero corresponde al orden de los enunciados del TP.
docker exec -i neo4j-tp cypher-shell -u neo4j -p neo4j123 < ./queries/7.cypher
docker exec -i neo4j-tp cypher-shell -u neo4j -p neo4j123 < ./queries/8.cypher
docker exec -i neo4j-tp cypher-shell -u neo4j -p neo4j123 < ./queries/10.cypher
docker exec -i neo4j-tp cypher-shell -u neo4j -p neo4j123 < ./queries/11.cypher
docker exec -i neo4j-tp cypher-shell -u neo4j -p neo4j123 < ./queries/12.cypher