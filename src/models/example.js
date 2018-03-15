'use strict';

module.exports = (sequelize, Sequelize) => {
    const Example = sequelize.define('Example', {
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
    }, {
        tableName: 'report_filters',
        timestamps: true,
    });

    return Example;
};
