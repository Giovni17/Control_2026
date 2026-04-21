let memoriaEquipos = [];

function IniciarFuncionesControl(datos) {
    memoriaEquipos = datos;
    console.log("Sistema de control vinculado a hardware.");
}

window.EjecutarEscritura = function(idSistema, paso) {
    // Buscamos por grupo_sistema para identificar el cuadro que el usuario tocó
    const equipo = memoriaEquipos.find(e => e.grupo_sistema === idSistema);

    if (equipo) {
        // DATOS REALES PARA LA COMUNICACIÓN
        const dataSalida = {
            tipo: equipo.tipo_control,    // "plc" o "master"
            grupo: equipo.numero_grupo,   // El ID real de hardware
            comando: paso,                // 0 al 5
            cabeceras: equipo.cabecera    // ["23", "05"] etc.
        };

        console.log(`Escribiendo en hardware ${dataSalida.tipo}:`, dataSalida);

        // Actualizar el indicador visual en pantalla
        const circulo = document.getElementById(`GP${idSistema}indicador`);
        if (circulo) {
            circulo.innerText = paso === 0 ? "OFF" : paso;
            circulo.style.backgroundColor = paso === 0 ? "#550000" : "#0e5500";
        }
    }
};

module.exports = { IniciarFuncionesControl };