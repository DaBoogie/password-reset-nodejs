'use strict';

const _ = require('lodash');
const errors = require('../errors');
const moment = require('moment');

/**
 * @param {string} source
 * @param {object} format
 * @return {Function}
 */
module.exports = function arrangeBody(source, format) {
    if (!['body', 'query'].includes(source)) {
        throw new Error(`Invalid 'arrangeBody' source '${source}'.`);
    }

    return function (req, res, next) {
        const input = req[source];
        let arranged, config, key, value;
        req['arranged' + _.capitalize(source)] = arranged = {};
        for (key in format) if (format.hasOwnProperty(key)) {
            config = format[key];

            value = input[key];

            if (value === undefined && config.defaultValue !== undefined) value = config.defaultValue;

            if (!(value === 0 || value === false || !!value) && config.required) {
                return next(errors.InvalidInputError(`Property '${key}' is required`));
            }
            if (!(value === 0 || value === false || !!value)) continue;

            if (config.pattern && !config.pattern.test(value)) {
                return next(errors.InvalidInputError(`Invalid input param '${key}': doesn't follow expected pattern`));
            }

            if (config.type === 'STRING') {
                if (typeof(value) !== 'string') {
                    return next(errors.InvalidInputError(`Invalid ${key} type(${typeof value}), should be string`));
                }
            }
        }

        next();
    };
};
