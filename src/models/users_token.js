'use strict';

module.exports = function (sequelize, Sequelize) {
    let UsersToken = sequelize.define('UsersToken', {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        userId: {
            field: 'user_id',
            type: Sequelize.UUID,
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
            get: function () {
                if (this.getDataValue('data')) {
                    return JSON.parse(this.getDataValue('data'));
                }
            },
            set: function (data) {
                this.setDataValue('data', JSON.stringify(data));
            },
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
        },
    }, {
        tableName: 'users_tokens',
        timestamps: true,
        underscored: true,
    });

    UsersToken.associate = function (models) {
        UsersToken.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return UsersToken;
};
