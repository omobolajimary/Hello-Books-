
module.exports = (sequelize, DataTypes) => {
  var Borrow = sequelize.define('Borrow', {
    borrowId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
  };
  return Borrow;
};