

//Clientes activos con sus pólizas vigentes
use('aseguradora')
db.clientes.aggregate([
    {
        $match: { activo: "True" } // solo clientes activos
    },
    {
        $lookup: {
            from: "polizas",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "polizas_cliente"
        }
    },
    {
        $unwind: "$polizas_cliente"
    },
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
])


//Vehículos asegurados con su cliente y póliza
use('aseguradora')
db.clientes.aggregate([
    {
        $lookup: {
            from: "polizas",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "polizas"
        }
    },
    {
        $unwind: "$vehiculos"
    },
    {
        $unwind: "$polizas"
    },
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
])


//Clientes sin pólizas activas
use('aseguradora')
db.clientes.find(
    {
        id_cliente: {
            $nin: db.polizas.distinct("id_cliente", { estado: "Activa" })
        }
    },
    { _id: 0, id_cliente:1, nombre: 1, apellido: 1, email: 1 }
)



//Pólizas vencidas con el nombre del cliente
use('aseguradora')
db.clientes.find(
    {
        id_cliente: {
            $in: db.polizas.distinct("id_cliente", { estado: "Vencida" })
        }
    },
    { _id: 0, id_cliente: 1, nombre: 1, apellido: 1 }
)




//ABM de clientes// Alta (crear)
use('aseguradora')
// ALTA
db.clientes.insertOne({
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
})
use('aseguradora')
db.clientes.findOne({ id_cliente: 9999 })

// Baja (eliminar)
use('aseguradora')
db.clientes.deleteOne({ dni: 36542987 })

// Modificación (actualizar)
use('aseguradora')
db.clientes.updateOne(
    { id_cliente: 9999 },
    { $set: { email: "nuevo_email@hotmail.com", activo: "False" } }
)