// const User = require('./user');

'use strict';

module.exports = (sequelize, Sequelize) =>{

	const Pertanyaan = sequelize.define('pertanyaan', {

		    id_tanya: {
                    type:  Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                  },
        id_kat: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {         // User hasMany WorkingDays n:n
                    model: 'Kategori',
                    key: 'id_kat',
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

        


        isi_tanya:{
                    type: Sequelize.STRING
                  }

    },
      {
        tableName: 'pertanyaan',
        timestamps: true,
        
      }
    );

    Pertanyaan.associate = (models) => {
  
      // associations can be defined here
          Pertanyaan.belongsTo(models.users, { foreignKey: 'id_user', });
          Pertanyaan.belongsTo(models.kategori, { foreignKey: 'id_kat', });

    
    };

	return Pertanyaan;
};
