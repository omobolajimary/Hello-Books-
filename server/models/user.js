
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userName:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
                   isAlphanumeric: true
                }
            
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
               isEmail: true
           }
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
   },
  

   role: {  
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: "user"

    },
   
    },
   {
    classMethods: {
      associate: (models) => {
  
     },
    }, 
  });
  return user;
};