//Agentes y cantidad de siniestros asociados:
//Cuenta cuántos siniestros están asociados a las pólizas de cada agente (siniestros por agente).
MATCH (a:Agent)<-[:ASSIGNED_TO]-(p:Policy)<-[:ABOUT]-(s:Claim)
RETURN a.nombre AS Agente, count(s) AS Cantidad_Siniestros
ORDER BY Cantidad_Siniestros DESC;
