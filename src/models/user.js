'use strict';
const _ = require('lodash');
const crypto = require('crypto');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
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
    }, {
        tableName: 'users',
        timestamps: true,
    });

    /**
     * @param {string} password
     * @return {any} hash
     */
    User.hashPassword = (password) => {
        return crypto
            .createHmac('sha512', process.env.SALT || 'salt')
            .update(password)
            .digest('hex');
    };

    User.associate = function (models) {
        User.hasMany(models.UsersToken, {foreignKey: 'user_id'});
    };

    User.publicAttributes = [
        ..._.without(_.keys(User.rawAttributes), 'createdAt', 'updatedAt', 'password'),
    ];

    return User;
};
