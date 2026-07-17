const fs = require('fs');
const path = require('path');
// Asegúrate de que la ruta a js/control.js sea correcta
const { IniciarFuncionesControl } = require(path.join(__dirname, '..', 'js', 'control.js'));

function loadControl(datosDeVersion, version) {
    const container = document.getElementById('control-container');
    if (!container) return;

    // 1. CARGA DE ESTILOS
    const cssPath = path.join(__dirname, '..', 'css', 'control.css');
    if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        let styleTag = document.getElementById('style-control-main');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'style-control-main';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = cssContent;
    }

    // 2. VERIFICACIÓN DE DATOS (Estructura de Matriz)
    if (datosDeVersion.control && Array.isArray(datosDeVersion.control)) {
        
        container.innerHTML = ''; // Limpiar contenedor principal
        const listaPlanaParaLogica = [];

        // Función auxiliar para el cálculo de columnas (MCM) para que el grid sea perfecto
        function obtenerMCM(a, b) {
            if (a === 0 || b === 0) return a || b;
            let min = Math.max(a, b);
            while (true) {
                if (min % a === 0 && min % b === 0) return min;
                min++;
            }
        }

        // 3. RENDERIZADO POR CADA GRUPO DE LA MATRIZ
        datosDeVersion.control.forEach((subGrupo, gIndex) => {
            // Ordenar por grupo_sistema por seguridad
            const lista = subGrupo.sort((a, b) => a.grupo_sistema - b.grupo_sistema);
            
            // Crear el contenedor para esta interfaz específica
            const grid = document.createElement('div');
            grid.className = 'control-content';
            grid.id = `control-grid-${gIndex}`;
            grid.style.display = "grid";
            grid.style.gap = "10px";
            grid.style.marginBottom = "30px"; // Espacio entre interfaces
            
            container.appendChild(grid);

            const totalElementos = lista.length;
            const filaArribaCount = Math.ceil(totalElementos / 2);
            const filaAbajoCount = totalElementos - filaArribaCount;

            // Configuración de filas del Grid
            grid.style.gridTemplateRows = (totalElementos === 1) ? "1fr" : "1fr 1fr";

            // Cálculo de columnas totales para que queden alineados
            const columnasTotales = (filaArribaCount !== filaAbajoCount && filaAbajoCount > 0) 
                ? obtenerMCM(filaArribaCount, filaAbajoCount) 
                : filaArribaCount;

            grid.style.gridTemplateColumns = `repeat(${columnasTotales}, 1fr)`;

            // 4. GENERAR CADA ELEMENTO (RECTÁNGULO)
            lista.forEach((ctrl, index) => {
                listaPlanaParaLogica.push(ctrl); // Guardar para la lógica de control.js

                let spanValue;
                if (totalElementos === 1) {
                    spanValue = columnasTotales;
                } else if (index < filaArribaCount) {
                    spanValue = columnasTotales / filaArribaCount;
                } else {
                    spanValue = columnasTotales / filaAbajoCount;
                }

                grid.innerHTML += `
                    <div class="rectangulo" style="grid-column: span ${spanValue}; height: 100%; display: flex; flex-direction: column;">
                        <div class="indicador" id="GP${ctrl.grupo_sistema}indicador">-</div>
                        <div class="texto-boton">${ctrl.nombre_grupo}</div>
                        <div class="botones-container" style="flex-grow: 1; display: grid;">
                            <button id="GP${ctrl.grupo_sistema}paso1" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 1)" class="boton-pasos">1</button>
                            <button id="GP${ctrl.grupo_sistema}paso2" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 2)" class="boton-pasos">2</button>
                            <button id="GP${ctrl.grupo_sistema}paso3" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 3)" class="boton-pasos">3</button>
                            <button id="GP${ctrl.grupo_sistema}paso4" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 4)" class="boton-pasos">4</button>
                            <button id="GP${ctrl.grupo_sistema}paso5" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 5)" class="boton-pasos">5</button>
                            <button id="GP${ctrl.grupo_sistema}paso0" onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 0)" class="boton-apagar">Apagar</button>
                        </div>
                    </div>
                `;
            });
        });

        // 5. INICIALIZAR LÓGICA GLOBAL
        if (listaPlanaParaLogica.length > 0) {
            IniciarFuncionesControl(listaPlanaParaLogica);
        }

    } else {
        console.log(`ℹ️ La versión ${version} no contiene controles válidos.`);
    }
}

module.exports = { loadControl };