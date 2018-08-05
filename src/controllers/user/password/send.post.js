const router = require('express').Router();
const errors = require('../../../errors');
const emailHelper = require('../../../helpers/email-helper');
const arrangeInput = require('../../../middleware/arrange-inputs');

/**
 * @swagger
 * /password/reset:
 *   post:
 *     tags:
 *       - users.password
 *     description: Sends confirmation email again with current existing token or new
 *     parameters:
 *        - name: email
 *          in: formData
 *          type: string
 *          required: true
 *     responses:
 *       200:
 *         description: email sent
 */

router.post('/password/reset',
    arrangeInput('body', {
        email: {
            type: 'STRING',
            required: true,
        },
    }),
    errors.wrap(async function (req, res) {
        const models = res.app.get('models');
        const email = req.body.email;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) throw errors.InvalidInputError('Invalid email format');
        const user = await models.User.find({where: {email: req.body.email}});
        if (!user) throw errors.NotFoundError('User with such email not found.');

        await models.UsersToken.destroy({
            where: {
                userId: user.uuid,
                type: 'password-reset',
            },
        });

        const token = await models.UsersToken.create({
            userId: user.uuid,
            expiresIn: Date.now() + 3600000 * 1, // 1 hour
            type: 'password-reset',
        });

        // TODO remove by your front-end GET endpoint
        // App should send PATCH request to this link: `${process.env.API_URI}/password/reset/${token.uuid}`
        const link = `${APP_EMAIL_CONFIRMATION_GET_LINK}`;

        await emailHelper.send({
            subject: '[Project-name] password reset',
            email: user.email,
            name: `${user.name}`,
            link,
        });

        res.sendStatus(204);
    })
);

module.exports = router;
