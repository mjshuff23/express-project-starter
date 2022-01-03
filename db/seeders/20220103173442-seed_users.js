'use strict';
const bcrypt = require('bcrypt');

function createPassword() {
  return bcrypt.hashSync('password', 10);
}

function createDate(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      createDate({
        username: 'Demo-lition',
        email: 'demo@example.com',
        hashed_password: createPassword(),
      }),
      createDate({
        username: 'Yokito',
        email: 'yokito@mashatima.com',
        hashed_password: createPassword(),
      }),
      createDate({
        username: 'Mjshuff23',
        email: 'mjshuff23@gmail.com',
        hashed_password: createPassword(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users');
  },
};
