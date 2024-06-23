const { Sequelize } = require('sequelize');

const db = new Sequelize('tubespweb12', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;