//Clientes con más de un vehículo asegurado:
//Cuenta los vehículos asegurados por cliente y muestra solo aquellos con más de uno.
MATCH (c:Client)-[:OWNS]->(v:Vehicle {asegurado:true})
WITH c, count(v) AS cantidad
WHERE cantidad > 1 // todos tienen 1 por lo que devuelve 0 resultados
RETURN c.nombre AS Cliente, cantidad AS Cantidad_Vehiculos
ORDER BY cantidad DESC;