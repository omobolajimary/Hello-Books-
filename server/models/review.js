'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reviewText: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return review;
};