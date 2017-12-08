'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrowDate: {
        type: Sequelize.DATE,
      },
      expectedReturnDate: {
        type: Sequelize.DATE,
      },
      actualReturnDate: {
        type: Sequelize.DATE,
      },
      borrowStatus: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted'], 
      },
      returnStatus: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted'],
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('borrows');
  }
};