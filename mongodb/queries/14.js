use('aseguradora')
db.siniestros_export.insertOne({
    id_siniestro: 1000000,
    nro_poliza: "POL1000000",
    fecha: "05/11/2025",
    tipo: "Incendio",
    monto_estimado: 750000,
    descripcion: "Incendio en depósito industrial",
    estado: "Abierto"
})