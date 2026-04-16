const fs = require('fs');
const path = require('path');

async function initApp() {
    try {
        // 1. Cargar los fragmentos HTML en sus contenedores
        document.getElementById('header-container').innerHTML = 
            fs.readFileSync(path.join(__dirname, 'modules/header.html'), 'utf8');
            
        document.getElementById('visual-container').innerHTML = 
            fs.readFileSync(path.join(__dirname, 'modules/visual.html'), 'utf8');
            
        document.getElementById('control-container').innerHTML = 
            fs.readFileSync(path.join(__dirname, 'modules/control.html'), 'utf8');

        // 2. Cargar los datos del JSON
        const rawData = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
        const data = JSON.parse(rawData);

        // 3. Aplicar los datos a los elementos recién cargados
        document.title = data.pageTitle;
        document.getElementById('header-title').innerText = data.pageTitle;
        document.getElementById('main-image').src = data.imageSource;
        document.getElementById('footer-control-text').innerText = data.footerText;

        console.log("Módulos y datos cargados");
    } catch (err) {
        console.error("Error cargando módulos:", err);
    }
}

initApp();