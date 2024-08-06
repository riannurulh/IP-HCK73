'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Exercise.belongsToMany(models.User,{through:models.Plan})
      Exercise.hasMany(models.Plan)
    }
  }
  Exercise.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};