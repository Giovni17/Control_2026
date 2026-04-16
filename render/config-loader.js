const fs = require('fs');
const path = require('path');

// Ajuste de ruta absoluta para Windows/OneDrive
const baseRenderPath = __dirname.endsWith('render') ? __dirname : path.join(__dirname, 'render');
const rootPath = path.join(baseRenderPath, '..');

const { loadHeader } = require(path.join(baseRenderPath, 'header.js'));
const { loadCuerpo } = require(path.join(baseRenderPath, 'cuerpo.js'));
const { loadControl } = require(path.join(baseRenderPath, 'control.js'));
const { procesarLogica } = require(path.join(baseRenderPath, 'logica.js'));

async function initApp() {
    try {
        const configPath = path.join(rootPath, 'config.json');
        const rawData = fs.readFileSync(configPath, 'utf8');
        const data = JSON.parse(rawData);

        const versiones = Object.keys(data.versiones).sort();

        versiones.forEach(v => {
            const contenido = data.versiones[v];
            
            // Cada función ahora se encarga de su propio HTML, CSS y Datos
            loadHeader(contenido, v);
            loadCuerpo(contenido, v);
            loadControl(contenido, v);
            procesarLogica(contenido, v);
        });

    } catch (err) {
        console.error("Error en initApp:", err);
    }
}

initApp();