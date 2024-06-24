'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matakuliah', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_matkul: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      matkul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kelas: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dosen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jumlah_mahasiswa: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matakuliah');
  }
};
