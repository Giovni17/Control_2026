function escribirGrupo(grupo, paso) {
    const url = `http://${IpServer}:8080/MASTER2/grupo/escribir/${grupo}/${paso}`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success === true) {
            console.log(`✅ Grupo ${grupo} actualizado a paso ${paso}`);

            grupos[grupo].actual = paso;
            grupos[grupo].deseado = paso;
            grupos[grupo].bloqueadoTemporalmente = true;

            actualizarInterfaz(grupo, paso);

            setTimeout(() => {
                grupos[grupo].bloqueadoTemporalmente = false;
            }, 9000);
        } else {
            console.warn(`❌ Falló la escritura del grupo ${grupo} al paso ${paso}`);
        }
    })
    .catch(error => {
        console.error(`⚠️ Error al escribir en grupo ${grupo}:`, error);
    });
}
