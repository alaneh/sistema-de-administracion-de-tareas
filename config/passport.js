const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(
    new LocalStrategy(
        //por default passport espera usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });
                // el usuario existe, password incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }
                return done(null, usuario);
            } catch (error) {
                // ese usuaio no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);
//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});
//exportar
module.exports = passport;