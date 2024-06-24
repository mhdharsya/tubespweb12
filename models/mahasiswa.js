// models/Mahasiswa.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Mahasiswa = db.define('Mahasiswa', {
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_pendaftaran: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nilai: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  daftar_nilai: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  freezeTableName: false, // mengatur nama tabel sesuai dengan nama model,
  tableName: "mahasiswas"
});

module.exports = Mahasiswa;
