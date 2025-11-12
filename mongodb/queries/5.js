// Agentes activos con cantidad de pólizas asignadas (seguro ante id_agente vacío)


use("aseguradora");

printjson(
  db.agentes_export.aggregate([
    {
      $lookup: {
        from: "polizas_export",
        let: { agenteId: "$id_agente" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $ne: ["$id_agente", ""] },   // evitar vacíos
                  { $ne: ["$id_agente", null] }, // evitar nulos
                  { $eq: ["$id_agente", "$$agenteId"] }
                ]
              }
            }
          }
        ],
        as: "polizas_asignadas"
      }
    },
    {
      $addFields: {
        cantidad_polizas: { $size: "$polizas_asignadas" }
      }
    },
    {
      $project: {
        _id: 0,
        id_agente: 1,
        nombre: 1,
        apellido: 1,
        zona: 1,
        activo: 1,
        cantidad_polizas: 1
      }
    }
  ]).toArray()
);
