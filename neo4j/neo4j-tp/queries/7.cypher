//Top 10 clientes por cobertura total:
//Suma el valor de cobertura_total de todas las pólizas por cliente y devuelve los 10 con mayor cobertura.
MATCH (c:Client)-[:HAS]->(p:Policy)
WITH c, sum(p.cobertura_total) AS cobertura_total
RETURN c.nombre AS Cliente, cobertura_total
ORDER BY cobertura_total DESC
LIMIT 10;