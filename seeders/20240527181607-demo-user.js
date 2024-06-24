'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('rahasia', 10);
    const hashedPassword3 = await bcrypt.hash('rahaisa', 10);

    // Insert users with hashed passwords
    await queryInterface.bulkInsert('Users', [
      {
        uuid: uuidv4(), // Use uuid library to generate UUID
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword1, // Hashed password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), // Use uuid library to generate UUID
        username: 'jane_doe',
        email: 'jane@example.com',
        password: hashedPassword2, // Hashed password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), // Use uuid library to generate UUID
        username: 'doe_john',
        email: 'doe@example.com',
        password: hashedPassword3, // Hashed password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
