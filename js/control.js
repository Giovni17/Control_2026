let memoriaEquipos = [];
let estadosBloqueo = {}; // Guardará el paso enviado temporalmente: { [idSistema]: paso }

// ... Tu función IniciarFuncionesControl se mantiene igual ...
function IniciarFuncionesControl(datosNuevos) {
    if (!datosNuevos || !Array.isArray(datosNuevos)) return;
    datosNuevos.forEach(equipo => {
        const existe = memoriaEquipos.find(e => String(e.grupo_sistema) === String(equipo.grupo_sistema));
        if (!existe) memoriaEquipos.push(equipo);
    });
}

window.EjecutarEscritura = function(idSistema, paso) {
    // ELIMINADO: Ya no bloqueamos la ejecución de la función. 
    // Siempre puedes volver a presionar un botón.

    const ip = window.IpServer;
    const puerto = window.PuertoServer;
    if (!ip || !puerto) {
        console.error("❌ No hay IP o puerto configurados.");
        return;
    }

    const url = `http://${ip}:${puerto}/sistema/escribir_grupo?id_grupo=${idSistema}&paso=${paso}`;
    console.log(`🚀 Escritura: ${url}`);

    // 1. Forzamos el bloqueo del indicador con el paso que el usuario acaba de elegir
    estadosBloqueo[idSistema] = paso; 

    // 2. Actualizamos la interfaz inmediatamente al hacer click
    actualizarInterfaz(idSistema, paso);

    fetch(url, { 
        method: 'GET',
        headers: { 'accept': 'application/json' }
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        // Al recibir respuesta exitosa, iniciamos el contador de 9 segundos 
        // para proteger el indicador de las lecturas externas automáticas.
        setTimeout(() => { 
            // Solo limpiamos si el usuario no ha presionado otro botón en este intervalo
            if (estadosBloqueo[idSistema] === paso) {
                delete estadosBloqueo[idSistema]; 
                console.log(`🔓 Indicador libre para lecturas en ID: ${idSistema}`);
            }
        }, 9000);
    })
    .catch(err => {
        console.error("⚠️ Error en fetch:", err);
        // Si falla el envío, liberamos el bloqueo para que la lectura real muestre el estado correcto
        delete estadosBloqueo[idSistema];
    });
};

function actualizarInterfaz(idSistema, paso) {
    // 1. Círculo Indicador
    const circulo = document.getElementById(`GP${idSistema}indicador`);
    if (circulo) {
        circulo.innerText = paso === 0 ? "0" : paso;
        circulo.style.backgroundColor = paso === 0 ? "#7c0101" : "#0e5500";
    }

    // 2. Botones (SIEMPRE se van a actualizar para reflejar la última pulsación)
    for (let i = 0; i <= 5; i++) {
        const btn = document.getElementById(`GP${idSistema}paso${i}`);
        if (btn) {
            if (i === 0) {
                btn.className = paso === 0 ? 'boton-apagar-activo' : 'boton-apagar';
            } else {
                btn.className = paso === i ? 'boton-encender' : 'boton-pasos';
            }
        }
    }
}

/**
 * 💡 IMPORTANTE: En tu función que hace las LECTURAS automáticas (la que consulta el estado actual),
 * debes agregar una validación antes de actualizar el círculo indicador.
 * Debería verse algo así:
 */
function funcionDeLecturaExterna(idSistema, pasoServidor) {
    // Si el indicador está bloqueado por un envío reciente, NO dejes que el servidor lo cambie
    if (estadosBloqueo[idSistema] !== undefined) {
        console.log(`⏳ Lectura ignorada para ID ${idSistema}. Protegiendo paso: ${estadosBloqueo[idSistema]}`);
        return; 
    }

    // Si no está bloqueado, la lectura del servidor actualiza la pantalla normalmente
    actualizarInterfaz(idSistema, pasoServidor);
}

module.exports = { IniciarFuncionesControl };