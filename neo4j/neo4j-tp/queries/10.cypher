
//Pólizas suspendidas con estado del cliente:
//Busca todas las pólizas suspendidas y devuelve el nombre del cliente y si el cliente está activo.
MATCH (c:Client)-[:HAS]->(p:Policy {estado:"Suspendida"})
RETURN c.nombre AS Cliente, p.id AS Poliza, p.estado AS Estado_Poliza, c.activo AS Cliente_Activo;