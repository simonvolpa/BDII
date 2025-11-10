use("aseguradora");
printjson(
  db.clientes_export.find(
    {
      id_cliente: {
        $nin: db.clientes_export.distinct("id_cliente", { activo: "True" })
      }
    },
    { _id: 0, id_cliente: 1, nombre: 1, apellido: 1, email: 1, activo: 1 }
  ).toArray()
);
