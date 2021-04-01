'use strict';

module.exports = (sequelize, Sequelize) => {

      const Hasil = sequelize.define('hasil', {

            id_hasil: {
                        type:  Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                      },
            
            id_tanya: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {         // User hasMany WorkingDays n:n
                          model: 'pertanyaan',
                          key: 'id_tanya',
                        }
                      },

            id_pilihan: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {         // User hasMany WorkingDays n:n
                          model: 'pilihan_jwb',
                          key: 'id_pilihan',
                        }
                      },

            id_user: {
                      type: Sequelize.INTEGER,
                      allowNull: false,
                      references: {         // User hasMany WorkingDays n:n
                        model: 'users',
                        key: 'id_user',
                      }
                    },
          }, {
                tableName: 'hasil',
                timestamps: true,
          }
      )

      Hasil.associate = (models) => {
  
        // associations can be defined here
            Hasil.belongsTo(models.users, { foreignKey: 'id_user' });
            Hasil.belongsTo(models.pertanyaan, { foreignKey: 'id_tanya' });
            Hasil.belongsTo(models.pilihan_jwb, { foreignKey: 'id_pilihan' })
      
      };

      return Hasil;

}