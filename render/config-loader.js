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
            
            // SOLO actualizamos la IP global si la versión actual la contiene
            if (contenido.ip_servidor) {
                window.IpServer = contenido.ip_servidor;
                window.PuertoServer = contenido.puerto_servidor;
                console.log(`🌐 IP actualizada por v${v}: ${window.IpServer}`);
                console.log(`🌐 Puerto actualizado por v${v}: ${window.PuertoServer}`);
            }

            loadHeader(contenido, v);
            loadCuerpo(contenido, v);
            
            // Solo cargamos control si la versión tiene esa sección definida
            if (contenido.control) {
                loadControl(contenido, v);
            }
            
            procesarLogica(contenido, v);
        });

    } catch (err) {
        console.error("Error en initApp:", err);
    }
}

initApp();