'use strict';

module.exports = (sequelize, Sequelize) => {

      const Kategori = sequelize.define('kategori', {

            id_kat: {
                        type:  Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                      },
            
            id_user: {
                      type: Sequelize.INTEGER,
                      allowNull: false,
                      references: {         // User hasMany WorkingDays n:n
                        model: 'users',
                        key: 'id_user',
                      }
                    },
                    
            nama_kat:{
              type: Sequelize.STRING
            },

            status:{
              type: Sequelize.INTEGER
            }
          }, {
                tableName: 'kategori',
                timestamps: true,
          }
      )

      Kategori.associate = (models) => {
  
        // associations can be defined here
            Kategori.belongsTo(models.users, { foreignKey: 'id_user' });
           
      
      };

      return Kategori;

}