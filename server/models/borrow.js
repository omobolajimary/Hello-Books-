
module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expectedReturnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualReturnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    borrowStatus: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending',
    },
    returnStatus: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending',
    },
  }); 
  borrow.associates = (models) => {
    borrow.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user',
    });
    borrow.belongsTo(models.book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'book',
    });
  };
  return borrow;
};