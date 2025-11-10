use("aseguradora");
printjson(
  db.clientes_export.aggregate([
    {
      $lookup: {
        from: "polizas_export",
        localField: "id_cliente",
        foreignField: "id_cliente",
        as: "polizas"
      }
    },
    { $unwind: "$vehiculos" },
    { $unwind: "$polizas" },
    {
      $project: {
        _id: 0,
        nombre: 1,
        apellido: 1,
        "vehiculos.patente": 1,
        "vehiculos.marca": 1,
        "vehiculos.modelo": 1,
        "polizas.nro_poliza": 1,
        "polizas.estado": 1
      }
    }
  ]).toArray()
);
