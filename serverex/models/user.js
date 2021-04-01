'use strict';

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    
    email_user: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
    nama_user : {
                  type: DataTypes.STRING, 
                  allowNull: false
                },
    jenis_user: {
                  type: DataTypes.STRING, 
                  allowNull: false
                },
    is_active : {
                  type: DataTypes.STRING, 
                  allowNull: true
                },
    pass_user : {
                  type: DataTypes.STRING,
                  allowNull: false
                }

  }, {
    tableName: 'users',
    timestamps: true,
    
  });

  return User;
};