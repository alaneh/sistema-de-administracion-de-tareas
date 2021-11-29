const { Sequelize } = require('sequelize');


const db = new Sequelize('tareasNode', 'root', 'Dreamweavercs6+', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
module.exports = db;