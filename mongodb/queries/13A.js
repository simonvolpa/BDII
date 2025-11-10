use("aseguradora");

db.clientes_export.insertOne({
  id_cliente: 9999,
  nombre: "Mariano",
  apellido: "Gómez",
  dni: 36542987,
  email: "mariano.gomez@gmail.com",
  telefono: 1123456789,
  direccion: "Av. Libertador 456",
  ciudad: "Mendoza",
  provincia: "Mendoza",
  activo: "True",
  vehiculos: [
    {
      patente: "AB123CD",
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2023
    }
  ]
});
