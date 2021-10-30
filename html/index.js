const formulario = document.getElementById('formularioCancion');
const mensaje = document.querySelector("#mensaje");
const titulo = document.querySelector("#titulo");
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', buscarCancion);

// function buscarCancion(e) {
//     e.preventDefault();
//     //datos
//     const artista = document.querySelector('#artista').value;
//     const cancion = document.querySelector('#cancion').value;
//     console.log(artista);
//     console.log(cancion);
//     if (artista === '' || cancion === '') {
//         console.error('Ingrese unos valores validos')
//     } else {
//         const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
//         fetch(url)
//             .then(respuesta => respuesta.json())
//             .then(resultado => {
//                 if (resultado.lyrics) {
//                     console.log(resultado);
//                 } else {
//                     console.error('La cancion no existe')
//                 }
//             })
//     }
// }
async function buscarCancion(e) {
    resultado.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `;
    e.preventDefault();
    //datos
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;
    console.log(artista);
    console.log(cancion);
    if (artista === '' || cancion === '') {
        console.error('Ingrese unos valores validos')
    } else {
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const respuesta = await fetch(url);
        if (respuesta.status !== 200) {
            // const mensaje = document.querySelector("#mensaje");
            // const titulo = document.querySelector("#titulo");
            // const resultado = document.querySelector('#resultado');
            resultado.innerHTML = '';
            titulo.innerHTML = '';
            mensaje.innerHTML = '';
            console.error('Error al Encontrar la Cancion');
            const alerta = document.createElement('div');
            alerta.classList.add("alert", "alert-danger");
            alerta.setAttribute('role', 'alert');
            alerta.textContent = "Los parametros ingresados son incorrectos o No se Encuentra en la BD";
            mensaje.appendChild(alerta);
        } else {
            const letra = await respuesta.json();
            // const titulo = document.querySelector("#titulo");
            // const mensaje = document.querySelector("#mensaje");
            // const resultado = document.querySelector('#resultado');
            console.log(letra);
            resultado.innerHTML = '';
            mensaje.innerHTML = '';
            titulo.textContent = `Letra de ${artista} - ${cancion}`;
            resultado.textContent = letra.lyrics;

        }
    }
}