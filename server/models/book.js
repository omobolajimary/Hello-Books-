module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: {
        message: 'This field can only contain letters',
      },
  
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  book.associate = (models) => {
    book.hasMany(models.borrow, {
      foreignKey: 'book_id',
    });
    book.hasMany(models.review, {
      foreignKey: 'book_id',
      as: 'review',
    });
  };
  return book;
};
