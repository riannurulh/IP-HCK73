'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan.belongsTo(models.Exercise)
      Plan.belongsTo(models.User)
    }
  }
  Plan.init({
    ExerciseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    day: DataTypes.STRING,
    totalSet: DataTypes.INTEGER,
    setRepetition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};