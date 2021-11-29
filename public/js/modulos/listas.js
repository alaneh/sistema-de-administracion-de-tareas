import Swal from 'sweetalert2';
import axios from 'axios';
const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlLista = e.target.dataset.listaUrl;
        console.log(urlLista);
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Borrar!',
            cancelButtonText: 'No, Cancelar!'
        }).then((result) => {
            if (result.value) {
                //enviar petición a axios
                const url = `${location.origin}/listas/${urlLista}`;
                axios.delete(url, { params: { urlLista } })
                    .then(function(respuesta) {
                        console.log(respuesta)
                        Swal.fire(
                            'Eliminado!',
                            respuesta.data,
                            'success'
                        );
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })
            }
        })
    });
}
export default btnEliminar;