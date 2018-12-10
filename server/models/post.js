'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Post.belongsToMany(models.User, {
      through: 'FavoritePosts',
      as: 'favPost',
      foreignKey: 'postId'
    });
    Post.belongsTo(models.Class, {
      foreignKey: 'classId',
      onDelete: 'CASCADE'
    });
    Post.belongsTo(models.Semester, {
      foreignKey: 'semesterId',
      onDelete: 'CASCADE'
    });
  };
  return Post;
};