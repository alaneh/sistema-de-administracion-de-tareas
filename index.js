const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexión a la BD
const db = require('./config/db');
db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

require('./models/Listas');
require('./models/Tareas');
require('./models/Usuarios');

app.set('view engine', 'pug');
//Habilitar bodyParser para leer datos del formulario

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//archivos publicos
app.use(express.static('public'));

//Habilitar view engine con pug

//Para handlebars
//app.set('view engine', 'hbs');
//para ejs
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//agregar flash messages
app.use(flash());

app.use(cookieParser());
//session nos permite navegar en diversas paginas sin volver a auntenticar
app.use(session({
    secret: 'ElizaldeHA',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});


app.use('/', routes());

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});