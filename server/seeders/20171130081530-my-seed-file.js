const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('users', [{
      userName: 'olaitan',
      email: 'olaitan@gmail.com',
      role: 'admin',
      password: bcrypt.hashSync(('olaitan'), salt),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      userName: 'emmanuel',
      email: 'emmanuel@gmail.com',
      password: bcrypt.hashSync('adetola', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      userName: 'olaitan',
    }]);
  },
};
