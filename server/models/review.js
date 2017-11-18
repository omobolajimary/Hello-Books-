
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    reviewId: DataTypes.INTEGER,
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
  return Review;
};