const fs = require('fs');
const path = require('path');

const { IniciarHeader } = require(path.join(__dirname, '..', 'js','header.js'));

function loadHeader(datosDeVersion, version) {
    const htmlPath = path.join(__dirname, '..', 'modules', 'header.html');
    const cssPath = path.join(__dirname, '..', 'css', 'header.css');

    if (version === "1.0.0") {
        // Inyectar CSS
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            const style = document.createElement('style');
            style.textContent = cssContent;
            document.head.appendChild(style);
        }
        // Inyectar HTML
        if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            document.getElementById('header-container').innerHTML = htmlContent;
            
            // Iniciar las funciones de header (reloj, etc.)
            IniciarHeader();
        }
    }

    // Aplicar datos del JSON
    if (datosDeVersion.header) {
        const info = datosDeVersion.header;
        
        if (info.titulo) {
            document.getElementById('header-titulo').innerText = info.titulo;
        }
        if (info.imagen1) {
            document.getElementById('Imagen1').src = info.imagen1;
        }
        if (info.imagen2) {
            document.getElementById('Imagen2').src = info.imagen2;
        }
    }
}



module.exports = { loadHeader };