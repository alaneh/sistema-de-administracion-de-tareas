const Sequelize = require('sequelize');
const slug = require('slug');
const db = require('../config/db');
const shortid = require('shortid');
const Listas = db.define('listas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate(lista) {
            const url = slug(lista.nombre).toLowerCase();

            lista.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Listas;