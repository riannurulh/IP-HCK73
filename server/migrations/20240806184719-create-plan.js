'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ExerciseId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Exercises',
          key:'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key:'id'
        }
      },
      day: {
        type: Sequelize.STRING,
        allowNull:false
      },
      totalSet: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      setRepetition: {
        type: Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('Plans');
  }
};