
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    bookId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      alloNull:false
    },
    reviewText:{
      type:DataTypes.TEXT,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return review;
};