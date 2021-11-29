const express = require('express');
const router = express.Router();


//importar express validator
const { body } = require('express-validator');
const tareasController = require('../controllers/tareasController');
const proyectosController = require('../controllers/proyectosController.js');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
//rutas
module.exports = function() {
    router.get('/', authController.usuarioAutenticado,
        proyectosController.proyectosHome);
    router.get('/nueva-Lista',
        authController.usuarioAutenticado,
        proyectosController.formularioLista);
    router.post('/nueva-Lista',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevaLista
    );
    //enlistar los proyectos / listas
    router.get('/listas/:url', authController.usuarioAutenticado, proyectosController.listasPorUrl);

    //Actualizar la lista
    router.get('/lista/editar/:id',
        authController.usuarioAutenticado,
        proyectosController.formularioEditar);

    router.post('/nueva-Lista/:id',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarLista
    );
    //eliminar lista
    router.delete('/listas/:url',
        authController.usuarioAutenticado,
        proyectosController.eliminarLista);

    //Tareas
    router.post('/listas/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea);

    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea);

    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea);

    //Crear usuarios
    router.get('/login', usuariosController.formCrearCuenta);
    router.post('/login', usuariosController.crearCuenta);
    //iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion', authController.usuarioAutenticado, authController.cerrarSesion);
    return router;
}