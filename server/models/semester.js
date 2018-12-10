'use strict';
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    name: DataTypes.STRING
  }, {});
  Semester.associate = function(models) {
    Semester.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'semesterId'
    });
    Semester.hasMany(models.Class, {
      as: 'classes',
      foreignKey: 'semesterId'
    });
  };
  return Semester;
};