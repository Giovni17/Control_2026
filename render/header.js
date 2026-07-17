const fs = require('fs');
const path = require('path');

const { IniciarHeader } = require(path.join(__dirname, '..', 'js','header.js'));

function loadHeader(datosDeVersion, version) {
    const htmlPath = path.join(__dirname, '..', 'modules', 'header.html');
    const cssPath = path.join(__dirname, '..', 'css', 'header.css');

    if (version === "1.0.0") {
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            const style = document.createElement('style');
            style.textContent = cssContent;
            document.head.appendChild(style);
        }
        if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            document.getElementById('header-container').innerHTML = htmlContent;
            IniciarHeader();
        }
    }

    if (datosDeVersion.header) {
        const info = datosDeVersion.header;
        
        // 1. Título
        if (info.titulo) {
            document.getElementById('header-titulo').innerText = info.titulo;
        }

        // 2. Procesar Imagen 1 y su URL
        const img1 = document.getElementById('Imagen1');
        if (info.imagen1 && img1) {
            img1.src = info.imagen1;
            
            // Si hay url1, envolvemos en un enlace o asignamos evento
            if (info.url1) {
                img1.style.cursor = "pointer";
                img1.onclick = () => { window.location.href = info.url1; };
                img1.title = `Ir a ${info.url1}`; // Opcional: muestra sugerencia al pasar el mouse
            } else {
                img1.onclick = null;
                img1.style.cursor = "default";
            }
        }

        // 3. Procesar Imagen 2 y su URL
        const img2 = document.getElementById('Imagen2');
        if (info.imagen2 && img2) {
            img2.src = info.imagen2;
            
            // Si hay url2, redirigimos al hacer clic
            if (info.url2) {
                img2.style.cursor = "pointer";
                img2.onclick = () => { window.location.href = info.url2; };
                img2.title = `Ir a ${info.url2}`;
            } else {
                img2.onclick = null;
                img2.style.cursor = "default";
            }
        }
    }
}

module.exports = { loadHeader };