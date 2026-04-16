function procesarLogica(datosDeVersion, version) {
    console.log(`[LOGICA] Analizando v${version}...`);

    if (datosDeVersion.alarmas) {
        const correoAlarma = datosDeVersion.alarmas.correo;
        console.warn(`[SISTEMA ALARMAS] Activo: ${correoAlarma}`);
        window.activeAlarmsEmail = correoAlarma;
    }
}

module.exports = { procesarLogica };