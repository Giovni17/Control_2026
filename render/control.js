const fs = require('fs');
const path = require('path');
const { IniciarFuncionesControl } = require(path.join(__dirname, '..', 'js', 'control.js'));

function loadControl(datosDeVersion, version) {
    const container = document.getElementById('control-container');
    if (!container) return;

    // Carga de estilos
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

if (datosDeVersion.control && datosDeVersion.control.controles) {
        // 1. Ordenamos
        const lista = datosDeVersion.control.controles.sort((a, b) => a.grupo_sistema - b.grupo_sistema);
        
        // 2. USAMOS LA VARIABLE (Asegúrate de que no haya otro 'const cantidad' arriba de esto en la misma función)
        const totalElementos = lista.length; 
        const mitadSuperior = Math.ceil(totalElementos / 2);

        const container = document.getElementById('control-container');
        container.innerHTML = '<div class="control-content" id="control-grid"></div>';
        const grid = document.getElementById('control-grid');

        // --- LÓGICA DE DISTRIBUCIÓN ---
        grid.style.display = "grid";
        grid.style.gap = "10px";
        grid.style.gridTemplateRows = "1fr 1fr"; 

        let columnasGrid = 6; 

        // Cambiamos 'cantidad' por 'totalElementos' para evitar el error de duplicado
        if (totalElementos === 3) {
            columnasGrid = 2;
        } else if (totalElementos === 5) {
            columnasGrid = 6;
        } else if (totalElementos === 7) {
            columnasGrid = 12;
        } else {
            columnasGrid = mitadSuperior;
        }

        grid.style.gridTemplateColumns = `repeat(${columnasGrid}, 1fr)`;

        lista.forEach((ctrl, index) => {
            let span = 1;

            if (totalElementos === 3) {
                span = (index < 2) ? 1 : 2;
            } else if (totalElementos === 5) {
                span = (index < 3) ? 2 : 3;
            } else if (totalElementos === 7) {
                span = (index < 4) ? 3 : 4;
            } else {
                span = 1;
            }

            grid.innerHTML += `
                <div class="rectangulo" style="grid-column: span ${span};">
                    <div class="indicador" id="GP${ctrl.grupo_sistema}indicador">-</div>
                    <div class="texto-boton">${ctrl.nombre_grupo}</div>
                    <div class="botones-container">
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 1)" class="boton-pasos">1</button>
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 2)" class="boton-pasos">2</button>
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 3)" class="boton-pasos">3</button>
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 4)" class="boton-pasos">4</button>
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 5)" class="boton-pasos">5</button>
                        <button onclick="EjecutarEscritura(${ctrl.grupo_sistema}, 0)" class="boton-apagar">Apagar</button>
                    </div>
                </div>
            `;
        });

        IniciarFuncionesControl(lista);
    }
}

module.exports = { loadControl };