'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [{
      name: "Algoritmos e Programacao",
      semesterId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Racket",
      semesterId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Seila",
      semesterId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "dsadsa",
      semesterId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "dsadsa",
      semesterId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classes', null, {});
  }
};