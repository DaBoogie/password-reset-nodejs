const router = require('express').Router();
const errors = require('../../../errors');
const moment = require('moment');
const config = require('config');
const arrangeInput = require('../../../middleware/arrange-inputs');


/**
 * @swagger
 * /password/reset/{token}:
 *   patch:
 *     tags:
 *       - users.password
 *     description: Check if token valid and exists and changes password
 *     parameters:
 *        - name: token
 *          in: path
 *          type: string
 *          required: true
 *        - name: newPassword
 *          in: formData
 *          type: string
 *          required: true
 *        - name: confirmPassword
 *          in: formData
 *          type: string
 *          required: true
 *     responses:
 *       200:
 *         description: password changed
 */

router.patch('/password/reset/:token',
    arrangeInput('body', {
        password: {
            type: 'STRING',
            pattern: config.passwordPattern,
            required: true,
        },
        confirmPassword: {
            type: 'STRING',
            pattern: config.passwordPattern,
            required: true,
        },
    }),
    errors.wrap(async function (req, res) {
        const models = res.app.get('models');
        const body = req.body;

        const tokenUuid = req.params.token;
        const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
        if (!uuidV4Regex.test(tokenUuid)) throw errors.InvalidInputError('Token is not valid');

        const token = await models.UsersToken.find({
            where: {
                uuid: tokenUuid,
                type: 'password-reset',
                expiresIn: {$gt: moment.utc()},
            },
        });

        if (!token) throw errors.NotFoundError('Confirmation token is invalid or has expired.');
        if (!(body.password === body.confirmPassword)) throw errors.InvalidInputError(`Confirmation password doesn't match`);

        const user = await models.User.find({
           where: {
               uuid: token.userId,
           }
        });

        const hashedPassword = models.User.hashPassword(body.password);

        if (user.password === hashedPassword) throw errors.InvalidInputError('Old password and new password match!');
        user.password = body.password;
        await user.save();

        await models.UsersToken.destroy({
            where: {
                userId: user.uuid,
                type: 'password-reset',
            },
        });

        res.sendStatus(204);
    })
);

module.exports = router;
