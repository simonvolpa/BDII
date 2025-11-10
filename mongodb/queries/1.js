// Clientes activos con sus pólizas vigentes
use("aseguradora");

printjson(
  db.clientes_export.aggregate([
    {
      $match: { activo: "True" } // solo clientes activos
    },
    {
      $lookup: {
        from: "polizas_export",
        localField: "id_cliente",
        foreignField: "id_cliente",
        as: "polizas_cliente"
      }
    },
    { $unwind: "$polizas_cliente" },
    {
      $match: { "polizas_cliente.estado": "Activa" } // pólizas vigentes
    },
    {
      $project: {
        _id: 0,
        nombre: 1,
        apellido: 1,
        "polizas_cliente.nro_poliza": 1,
        "polizas_cliente.tipo": 1,
        "polizas_cliente.fecha_inicio": 1,
        "polizas_cliente.fecha_fin": 1
      }
    }
  ]).toArray()
);
