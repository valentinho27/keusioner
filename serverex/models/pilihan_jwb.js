'use strict';

module.exports = (sequelize, Sequelize) =>{

	const Pilihan = sequelize.define('pilihan_jwb', {

		    id_pilihan: {
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
                      onDelete: 'RESTRICT',
                      onUpdate: 'RESTRICT',
                      
                    },
                    
        },

        isi_pilihan: {
                    type: Sequelize.STRING,
                    
                  },

    },
      {
        tableName: 'pilihan_jwb',
        timestamps: true,
        
      }
    );

  Pilihan.associate = (models) => {
  
    // associations can be defined here
        Pilihan.belongsTo(models.pertanyaan, { foreignKey: 'id_tanya' });
  
  };

	return Pilihan;
};
