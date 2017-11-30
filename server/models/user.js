
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
      type: DataTypes.BOOLEAN,
      defaultValue: false,

    },
  })
  user.associate = (models) => {
    user.hasMany(models.review, {
      foreignKey: 'userId',
    });
    user.hasMany(models.favorites, {
      foreignKey: 'userId',
    });
    user.hasMany(models.borrow, {
      foreignKey: 'userId',
    });
  };
  return user;
};