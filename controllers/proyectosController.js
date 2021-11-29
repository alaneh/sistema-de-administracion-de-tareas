const Listas = require('../models/Listas');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async(req, res) => {
    //console.log(res.locals.usuario);
    const usuarioId = res.locals.usuario.id;
    const listas = await Listas.findAll({ where: { usuarioId } });

    res.render('index', {
        nombrePagina: 'SAT',
        listas
    });
}
exports.formularioLista = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const listas = await Listas.findAll({ where: { usuarioId } });
    res.render('nuevaLista', {
        nombrePagina: 'Nueva Lista',
        listas
    });
}
exports.nuevaLista = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const listas = await Listas.findAll({ where: { usuarioId } });
    //console.log(req.body);
    const { nombre } = req.body;
    let errores = [];
    if (!nombre) {
        errores.push({ 'texto': 'Agrega nombre a la lista' })
    }
    if (errores.length > 0) {
        res.render('nuevaLista', {
            nombrePagina: 'Nueva lista',
            errores,
            listas
        })
    } else {
        //insertar en la base de datos
        const usuarioId = res.locals.usuario.id;
        const lista = await Listas.create({ nombre, usuarioId });
        res.redirect('/')
    }
}
exports.listasPorUrl = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const listasPromise = Listas.findAll({ where: { usuarioId } });
    const listaPromise = Listas.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });
    const [listas, lista] = await Promise.all([listasPromise, listaPromise]);

    const tareas = await Tareas.findAll({
        where: {
            listaId: lista.id
        },
        // include: [
        //     { model: Listas }
        // ]
    });
    if (!lista) return next();
    res.render('tareas', {
        nombrePagina: 'Lista de Tareas',
        lista,
        listas,
        tareas
    })
}
exports.formularioEditar = async(req, res) => {

    const usuarioId = res.locals.usuario.id;
    const listasPromise = Listas.findAll({ where: { usuarioId } });
    const listaPromise = Listas.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [listas, lista] = await Promise.all([listasPromise, listaPromise]);
    res.render('nuevaLista', {
        nombrePagina: 'Editar Lista',
        listas,
        lista
    })
}
exports.actualizarLista = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const listas = await Listas.findAll({ where: { usuarioId } });
    //console.log(req.body);
    const { nombre } = req.body;
    let errores = [];
    if (!nombre) {
        errores.push({ 'texto': 'Agrega nombre a la lista' })
    }
    if (errores.length > 0) {
        res.render('nuevaLista', {
            nombrePagina: 'Nueva lista',
            errores,
            listas
        })
    } else {
        await Listas.update({ nombre: nombre }, { where: { id: req.params.id } });
        res.redirect('/')
    }
}
exports.eliminarLista = async(req, res, next) => {
    const { urlLista } = req.query;
    const resultado = await Listas.destroy({ where: { url: urlLista } });
    if (!resultado) {
        return next();
    }
    res.send('Lista Eliminada Correctamente');
}