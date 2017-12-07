module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
  });
  user.associate = (models) => {
    user.hasMany(models.review,{
      foreignKey: 'user_id',
    });
    user.hasMany(models.favorites,{
      foreignKey: 'user_id',
    });
    user.hasMany(models.borrow,{
      foreignKey: 'user_id',
    });
  };
  return user;
};