'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submenu.init({
    name: DataTypes.STRING,
    masterMenuId: DataTypes.BIGINT,
    url: DataTypes.TEXT,
    title: DataTypes.STRING,
    icon: DataTypes.TEXT,
    ordering: DataTypes.INTEGER,
    isTargetSelf: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Submenu',
  });
  return Submenu;
};