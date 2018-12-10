'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Semesters', [{
      name: "Primeiro Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Segundo Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Terceiro Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Quarto Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Quinto Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Sexto Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Setimo Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Oitavo Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Nono Semestre",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Semesters', null, {});
  }
};