const { Sequelize } = require('sequelize');

const db = new Sequelize('database_development', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;