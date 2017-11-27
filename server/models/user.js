
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userName:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
            
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
  

    role: {  
      type: DataTypes.ENUM,
      values: [{user:0,admin:1}],
      defaultValue: 0

    },
  })
  user.associate = (models) => {
    user.hasMany(models.review, {
      foreignKey: 'userId',
      as: 'user'
    });
    user.hasMany(models.favorites, {
      foreignKey: 'userId',
    });
    user.hasMany(models.borrow, {
      foreignKey: 'userId',
      as: 'users'
    });
  };
  return user;
};