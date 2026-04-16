// js/header.js

function update() {
    const fechaElemento = document.getElementById("Fecha");
    const horaElemento = document.getElementById("Hora");
    
    if (!fechaElemento || !horaElemento) return;

    const fecha = new Date();
    
    const optionsFecha = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const optionsHora = { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
    };
    
    fechaElemento.textContent = fecha.toLocaleDateString('es-MX', optionsFecha);
    horaElemento.textContent = fecha.toLocaleTimeString('es-MX', optionsHora);
}

function IniciarHeader() {
    // Ejecutamos una vez de inmediato y luego cada segundo
    update();
    setInterval(update, 1000);
}

// Exportamos la función principal
module.exports = { IniciarHeader };