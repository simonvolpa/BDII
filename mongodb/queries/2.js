use("aseguradora");
printjson(
  db.siniestros_export.aggregate([
    { $match: { estado: "Abierto" } },
    {
      $lookup: {
        from: "polizas_export",
        localField: "nro_poliza",
        foreignField: "nro_poliza",
        as: "poliza_info"
      }
    },
    { $unwind: "$poliza_info" },
    {
      $lookup: {
        from: "clientes_export",
        localField: "poliza_info.id_cliente",
        foreignField: "id_cliente",
        as: "cliente_info"
      }
    },
    { $unwind: "$cliente_info" },
    {
      $project: {
        _id: 0,
        tipo: 1,
        monto_estimado: 1,
        "cliente_info.nombre": 1,
        "cliente_info.apellido": 1
      }
    }
  ]).toArray()
);
