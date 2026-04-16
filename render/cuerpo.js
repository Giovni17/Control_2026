const fs = require('fs');
const path = require('path');

function loadCuerpo(datosDeVersion, version) {
    const htmlPath = path.join(__dirname, '..', 'modules', 'cuerpo.html');
    const cssPath = path.join(__dirname, '..', 'css', 'cuerpo.css');

    if (version === "1.0.0") {
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            const style = document.createElement('style');
            style.textContent = cssContent;
            document.head.appendChild(style);
        }
        if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            document.getElementById('cuerpo-container').innerHTML = htmlContent;
        }
    }

    if (datosDeVersion.cuerpo) {
        const info = datosDeVersion.cuerpo;
        const welcomeElem = document.getElementById('welcome-message');
        if (welcomeElem && info.welcomeMessage) welcomeElem.innerText = info.welcomeMessage;
    }
}

module.exports = { loadCuerpo };