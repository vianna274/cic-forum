'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    Class.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'classId'
    });
    Class.belongsTo(models.Semester, {
      foreignKey: 'semesterId',
      onDelete: 'CASCADE'
    });
  };
  return Class;
};