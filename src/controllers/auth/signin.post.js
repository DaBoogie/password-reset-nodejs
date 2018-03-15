const router = require('express').Router();
const errors = require('../../errors');

/**
 *  @swagger
 *  /signin:
 *    post:
 *      tags:
 *        - user management
 *      description: sign in user
 *      parameters:
 *        - name: name
 *          description: user name
 *          default: JohnSnow
 *          in: formData
 *          type: string
 *          required: true
 *        - name: password
 *          description: password
 *          default: qwerty
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: user signed in
 *        401:
 *          description: unauthorized
 */

router.post('/signin',
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const user = await models.User.authenticate(req.body.email, req.body.password);
        const token = await user.generateToken();
        user.lastLoginDate = new Date();
        await user.save();
        delete user.dataValues.password;
        res.json({
            user: user,
            token: token,
        });
    })
);

module.exports = router;
