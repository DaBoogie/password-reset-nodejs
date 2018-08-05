'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable('users', {
            uuid: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                type: Sequelize.STRING(512),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(512),
                set: function (password) {
                    this.setDataValue('password', User.hashPassword(password));
                },
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(128),
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
        await queryInterface.dropTable('users');
    }
};
