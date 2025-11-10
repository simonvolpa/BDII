use("aseguradora");
printjson(
  db.clientes_export.find(
    {
      id_cliente: {
        $in: db.polizas_export.distinct("id_cliente", { estado: "Vencida" })
      }
    },
    { _id: 0, id_cliente: 1, nombre: 1, apellido: 1 }
  ).toArray()
);
