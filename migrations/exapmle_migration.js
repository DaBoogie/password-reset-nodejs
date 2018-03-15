'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('examples', {
          uuid: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true,
          },
          name: {
              type: Sequelize.STRING(64),
              unique: true,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              field: 'created_at',
          },
          updatedAt: {
              type: Sequelize.DATE,
              field: 'updated_at',
          },
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('examples');
  }
};
