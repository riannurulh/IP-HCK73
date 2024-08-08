'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Exercise,{through:models.Plan})
      User.hasMany(models.Plan)
    }
  }
  User.init({
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue:false},
    password: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    weightGoalOn30day: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        if (!user.isSubscribed) {
          user.isSubscribed=false
        }
      },
    },
  });
  return User;
};