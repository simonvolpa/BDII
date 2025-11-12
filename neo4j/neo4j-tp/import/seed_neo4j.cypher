////////////////////////////////////////////////////////////////////////
// 1) CONSTRAINTS (ids únicos por tipo de nodo)
////////////////////////////////////////////////////////////////////////
CREATE CONSTRAINT client_id IF NOT EXISTS FOR (c:Client)  REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT agent_id  IF NOT EXISTS FOR (a:Agent)   REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT vehicle_id IF NOT EXISTS FOR (v:Vehicle) REQUIRE v.id IS UNIQUE;
CREATE CONSTRAINT policy_id  IF NOT EXISTS FOR (p:Policy)  REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT claim_id   IF NOT EXISTS FOR (s:Claim)   REQUIRE s.id IS UNIQUE;

////////////////////////////////////////////////////////////////////////
// 2) HELPERS: función para parsear fechas dd/mm/yyyy (o d/m/yyyy)
////////////////////////////////////////////////////////////////////////
/*
  Uso: WITH split('15/1/2025','/') AS f
       RETURN date({day:toInteger(f[0]), month:toInteger(f[1]), year:toInteger(f[2])})
*/

////////////////////////////////////////////////////////////////////////
// 3) CLIENTES
////////////////////////////////////////////////////////////////////////
LOAD CSV WITH HEADERS FROM 'file:///clientes.csv' AS c
MERGE (x:Client {id: toInteger(c.id_cliente)})
SET x.nombre     = c.nombre,
    x.apellido   = c.apellido,
    x.dni        = toInteger(c.dni),
    x.email      = c.email,
    x.telefono   = c.telefono,
    x.direccion  = c.direccion,
    x.ciudad     = c.ciudad,
    x.provincia  = c.provincia,
    x.activo     = toBoolean(c.activo);

////////////////////////////////////////////////////////////////////////
// 4) AGENTES
////////////////////////////////////////////////////////////////////////
LOAD CSV WITH HEADERS FROM 'file:///agentes.csv' AS a
MERGE (x:Agent {id: toInteger(a.id_agente)})
SET x.nombre    = a.nombre,
    x.apellido  = a.apellido,
    x.matricula = a.matricula,
    x.telefono  = a.telefono,
    x.email     = a.email,
    x.zona      = a.zona,
    x.activo    = toBoolean(a.activo);

////////////////////////////////////////////////////////////////////////
// 5) VEHICULOS  (Client)-[:OWNS]->(Vehicle)
////////////////////////////////////////////////////////////////////////
LOAD CSV WITH HEADERS FROM 'file:///vehiculos.csv' AS v
MATCH (c:Client {id: toInteger(v.id_cliente)})
MERGE (x:Vehicle {id: toInteger(v.id_vehiculo)})
SET x.marca     = v.marca,
    x.modelo    = v.modelo,
    x.anio      = toInteger(v.anio),
    x.patente   = v.patente,
    x.nro_chasis= v.nro_chasis,
    x.asegurado = toBoolean(v.asegurado)
MERGE (c)-[:OWNS]->(x);

////////////////////////////////////////////////////////////////////////
// 6) POLIZAS  (Client)-[:HAS]->(Policy)-[:ASSIGNED_TO]->(Agent)
////////////////////////////////////////////////////////////////////////
LOAD CSV WITH HEADERS FROM 'file:///polizas.csv' AS p
WITH p,
     split(p.fecha_inicio,'/') AS fi,
     split(p.fecha_fin,'/')    AS ff
MATCH (c:Client {id: toInteger(p.id_cliente)})
MATCH (a:Agent  {id: toInteger(p.id_agente)})
MERGE (x:Policy {id: p.nro_poliza})
SET x.tipo            = p.tipo,
    x.fecha_inicio    = date({day:toInteger(fi[0]), month:toInteger(fi[1]), year:toInteger(fi[2])}),
    x.fecha_fin       = date({day:toInteger(ff[0]), month:toInteger(ff[1]), year:toInteger(ff[2])}),
    x.prima_mensual   = toFloat(p.prima_mensual),
    x.cobertura_total = toFloat(p.cobertura_total),
    x.estado          = p.estado
MERGE (c)-[:HAS]->(x)
MERGE (x)-[:ASSIGNED_TO]->(a);

////////////////////////////////////////////////////////////////////////
// 7) SINIESTROS  (Claim)-[:ABOUT]->(Policy) y (Claim)-[:FILED_BY]->(Client)
////////////////////////////////////////////////////////////////////////
LOAD CSV WITH HEADERS FROM 'file:///siniestros.csv' AS s
WITH s, split(s.fecha,'/') AS f
MATCH (p:Policy {id: s.nro_poliza})
// hallar el cliente de esa póliza:
MATCH (c:Client)-[:HAS]->(p)
MERGE (x:Claim {id: toInteger(s.id_siniestro)})
SET x.fecha        = date({day:toInteger(f[0]), month:toInteger(f[1]), year:toInteger(f[2])}),
    x.tipo         = s.tipo,
    x.monto        = toFloat(s.monto_estimado),
    x.descripcion  = s.descripcion,
    x.estado       = s.estado
MERGE (x)-[:ABOUT]->(p)
MERGE (x)-[:FILED_BY]->(c);
