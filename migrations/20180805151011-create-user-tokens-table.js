'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable('users_tokens', {
            uuid: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                field: 'user_id',
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'uuid',
                },
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            expiresIn: {
                field: 'expires_in',
                type: Sequelize.DATE,
                allowNull: false,
            },
            data: {
                type: Sequelize.TEXT,
                allowNull: true,
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
        await queryInterface.dropTable('users_tokens');
    }
};
