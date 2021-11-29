import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funciones/avance';
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url, { idTarea })
                .then(function(respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })

        }
        if (e.target.classList.contains('fa-trash')) {

            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;
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
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } })
                        .then(function(respuesta) {
                            if (respuesta.status === 200) {
                                tareaHTML.parentElement.removeChild(tareaHTML);
                                Swal.fire(
                                    'Eliminado!',
                                    respuesta.data,
                                    'success'
                                );
                                actualizarAvance();
                            }

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
        }
    });
}
export default tareas;