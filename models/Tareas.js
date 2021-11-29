const Sequelize = require('sequelize');
const db = require('../config/db');
const Listas = require('./Listas');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING,
    estado: Sequelize.INTEGER
});
Tareas.belongsTo(Listas);
module.exports = Tareas;