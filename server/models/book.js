
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookName: DataTypes.STRING,
    bookStatus: DataTypes.STRING,
    author: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    upvote: DataTypes.INTEGER,
    allowNull: false,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return Book;
};