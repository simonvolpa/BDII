//Siniestros tipo “Accidente” del último año:
//Filtra los siniestros del tipo “Accidente” ocurridos en los últimos 12 meses a partir de la fecha actual.
MATCH (c:Client)-[:HAS]->(p:Policy)<-[:ABOUT]-(s:Claim)
WHERE s.tipo = "Accidente" AND s.fecha >= date() - duration('P1Y')
RETURN c.nombre AS Cliente, s.tipo AS Tipo_Siniestro, s.fecha AS Fecha, s.monto AS Monto, s.estado AS Estado
ORDER BY s.fecha DESC;