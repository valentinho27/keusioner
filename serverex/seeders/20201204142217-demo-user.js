'use strict';


module.exports = {
  
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Users', [{
        email_user  : 'vale@gmail.com',
        nama_user   : 'vale',
        jenis_user  : 'admin',
        is_active   : 1,
        pass_user   : '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  
    },
  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Users', null, {});
  
  }
};
