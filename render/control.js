const fs = require('fs');
const path = require('path');

function loadControl(datosDeVersion, version) {
    const htmlPath = path.join(__dirname, '..', 'modules', 'control.html');
    const cssPath = path.join(__dirname, '..', 'css', 'control.css');

    if (version === "1.0.0") {
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            const style = document.createElement('style');
            style.textContent = cssContent;
            document.head.appendChild(style);
        }
        if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            document.getElementById('control-container').innerHTML = htmlContent;
        }
    }

    if (datosDeVersion.control) {
        const info = datosDeVersion.control;
        const titleElem = document.getElementById('dashboard-title');
        if (titleElem && info.dashboardTitle) titleElem.innerText = info.dashboardTitle;
    }
}

module.exports = { loadControl };