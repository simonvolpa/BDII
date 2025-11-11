MATCH (n)-[r]-(m) RETURN n,r,m;


//Pólizas suspendidas con estado del cliente:
//Busca todas las pólizas suspendidas y devuelve el nombre del cliente y si el cliente está activo.
MATCH (c:Client)-[:HAS]->(p:Policy {estado:"Suspendida"})
RETURN c.nombre AS Cliente, p.id AS Poliza, p.estado AS Estado_Poliza, c.activo AS Cliente_Activo;

//Top 10 clientes por cobertura total:
//Suma el valor de cobertura_total de todas las pólizas por cliente y devuelve los 10 con mayor cobertura.
MATCH (c:Client)-[:HAS]->(p:Policy)
WITH c, sum(p.cobertura_total) AS cobertura_total
RETURN c.nombre AS Cliente, cobertura_total
ORDER BY cobertura_total DESC
LIMIT 10;

//Siniestros tipo “Accidente” del último año:
//Filtra los siniestros del tipo “Accidente” ocurridos en los últimos 12 meses a partir de la fecha actual.
MATCH (c:Client)-[:HAS]->(p:Policy)<-[:ABOUT]-(s:Claim)
WHERE s.tipo = "Accidente" AND s.fecha >= date() - duration('P1Y')
RETURN c.nombre AS Cliente, s.tipo AS Tipo_Siniestro, s.fecha AS Fecha, s.monto AS Monto, s.estado AS Estado
ORDER BY s.fecha DESC;

//Clientes con más de un vehículo asegurado:
//Cuenta los vehículos asegurados por cliente y muestra solo aquellos con más de uno.
MATCH (c:Client)-[:OWNS]->(v:Vehicle {asegurado:true})
WITH c, count(v) AS cantidad
WHERE cantidad > 1 // todos tienen 1 por lo que devuelve 0 resultados
RETURN c.nombre AS Cliente, cantidad AS Cantidad_Vehiculos
ORDER BY cantidad DESC;

//Agentes y cantidad de siniestros asociados:
//Cuenta cuántos siniestros están asociados a las pólizas de cada agente (siniestros por agente).
MATCH (a:Agent)<-[:ASSIGNED_TO]-(p:Policy)<-[:ABOUT]-(s:Claim)
RETURN a.nombre AS Agente, count(s) AS Cantidad_Siniestros
ORDER BY Cantidad_Siniestros DESC;

