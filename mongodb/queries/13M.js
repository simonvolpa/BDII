// Modificación (actualizar)
use('aseguradora')
db.clientes_export.updateOne(
    { id_cliente: 9999 },
    { $set: { email: "nuevo_email@hotmail.com", activo: "False" } }
)