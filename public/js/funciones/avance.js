import Swal from "sweetalert2";
export const actualizarAvance = () => {
    //seleccionar las tareas
    const tareas = document.querySelectorAll('li.tarea');
    if (tareas.length) {
        //seleccionar las completadas
        const tareasCompletadas = document.querySelectorAll('i.completo');
        //calcular el avance
        const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);
        //mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';
        if (avance === 100) {
            Swal.fire(
                'Felicidades',
                'Completaste el proyecto',
                'success'
            );
        }
    }
}