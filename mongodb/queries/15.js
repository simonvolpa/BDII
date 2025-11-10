//15. Emisión de nuevas pólizas (validando cliente y agente)
use('aseguradora')
const cliente = db.clientes_export.findOne({ id_cliente: 8, activo: "True" });
const agente = db.agentes_export.findOne({ id_agente: 102, activo: true });

if (cliente && agente) {
    db.polizas_export.insertOne({
        nro_poliza: "POL20268",
        id_cliente: cliente.id_cliente,
        tipo: "Hogar",
        fecha_inicio: "04/11/2025",
        fecha_fin: "04/11/2026",
        prima_mensual: 18000,
        cobertura_total: 1500000,
        id_agente: agente.id_agente,
        estado: "Activa"
    });
    print("Póliza emitida correctamente.");
} else {
    print("Error: cliente o agente inexistente o inactivo.");
}