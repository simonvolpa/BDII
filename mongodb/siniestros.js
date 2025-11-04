//Siniestros abiertos con tipo, monto y cliente afectado
use('aseguradora')
db.siniestros.aggregate([
    {
        $match: { estado: "Abierto" } // solo siniestros abiertos
    },
    {
        $lookup: {
            from: "polizas",
            localField: "nro_poliza",
            foreignField: "nro_poliza",
            as: "poliza_info"
        }
    },
    { $unwind: "$poliza_info" },
    {
        $lookup: {
            from: "clientes",
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
])

//Alta de nuevos siniestros
use('aseguradora')
db.siniestros.insertOne({
    id_siniestro: 9003,
    nro_poliza: "POL1003",
    fecha: "05/11/2025",
    tipo: "Incendio",
    monto_estimado: 750000,
    descripcion: "Incendio en depósito industrial",
    estado: "Abierto"
})