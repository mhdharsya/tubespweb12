// models/Matakuliah.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Matakuliah = sequelize.define('Matakuliah', {
    kode_matkul: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    matkul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlah_mahasiswa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true, // mengatur nama tabel sesuai dengan nama model
});

module.exports = Matakuliah;
