use("aseguradora");
printjson(
  db.polizas_export.aggregate([
    { $match: { estado: "Activa" } },
    {
      $addFields: {
        fecha_inicio_date: {
          $dateFromString: {
            dateString: "$fecha_inicio",
            format: "%d/%m/%Y"
          }
        }
      }
    },
    { $sort: { fecha_inicio_date: 1 } },
    {
      $project: {
        _id: 0,
        nro_poliza: 1,
        id_cliente: 1,
        fecha_inicio: 1
      }
    }
  ]).toArray()
);
