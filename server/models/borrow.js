'use strict';
module.exports = (sequelize, DataTypes) => {
  var borrow = sequelize.define('borrow', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrow;
};