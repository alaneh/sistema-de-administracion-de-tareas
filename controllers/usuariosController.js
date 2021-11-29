const Usuarios = require('../models/Usuarios');
exports.formCrearCuenta = (req, res) => {
    res.render('login', {
        nombrePagina: 'Registrarse en SAT'
    })
}
exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar sesión en SAT',
        error
    })
}

exports.crearCuenta = async(req, res) => {
    const { email, password } = req.body;
    try {
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/login')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('login', {
            mensajes: req.flash(),
            nombrePagina: 'Bienvenido a SAT',
            email,
            password
        })
    }
}