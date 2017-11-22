
module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    bookId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      alloNull:false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrow;
};