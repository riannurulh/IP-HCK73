'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          notNull:{
            args:true,
            msg:"email is required"
          },
          notEmpty:{
            args:true,
            msg:"email is required"
          },
          isEmail:{
            args:true,
            msg:"invalid email format"
          },
        }
      },
      gender: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"gender is required"
          },
          notEmpty:{
            args:true,
            msg:"gender is required"
          },
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"password is required"
          },
          notEmpty:{
            args:true,
            msg:"password is required"
          },
        }
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"height is required"
          },
          notEmpty:{
            args:true,
            msg:"height is required"
          },
        }
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"weight is required"
          },
          notEmpty:{
            args:true,
            msg:"weight is required"
          },
        }
      },
      weightGoalOn30day: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"weight goal is required"
          },
          notEmpty:{
            args:true,
            msg:"weight goal is required"
          },
        }
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
    await queryInterface.dropTable('Users');
  }
};