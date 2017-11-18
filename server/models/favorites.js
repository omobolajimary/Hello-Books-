
module.exports = (sequelize, DataTypes) => {
  var Favorites = sequelize.define('Favorites', {
    favoritesId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorites;
};