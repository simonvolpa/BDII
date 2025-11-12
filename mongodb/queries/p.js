// Agentes activos con cantidad de pólizas asignadas
// Asegurando base 'aseguradora'

use

printjson(
  db.agentes_export.aggregate([
    {
      $lookup: {
        from: "polizas_export",
        localField: "id_agente",
        foreignField: "id_agente",
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
