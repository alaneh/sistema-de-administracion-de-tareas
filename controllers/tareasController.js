const Listas = require('../models/Listas');
const Tareas = require('../models/Tareas');
exports.agregarTarea = async(req, res) => {
    //obtenemos la lista actual
    const lista = await Listas.findOne({ where: { url: req.params.url } });
    //leer el valor del input
    const { tarea } = req.body;
    const estado = 0;
    const listaId = lista.id;
    const resultado = await Tareas.create({
        tarea,
        estado,
        listaId
    });
    if (!resultado) {
        return next();
    }
    res.redirect(`/listas/${req.params.url}`);
}
exports.cambiarEstadoTarea = async(req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id: id } });
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;
    const resultado = await tarea.save();
    if (!resultado) return next();
    res.status(200).send('Actualizado');
}
exports.eliminarTarea = async(req, res) => {
    const { id } = req.params;
    const resultado = await Tareas.destroy({ where: { id } });
    if (!resultado) return next();

    res.status(200).send('Tarea Eliminada');
}