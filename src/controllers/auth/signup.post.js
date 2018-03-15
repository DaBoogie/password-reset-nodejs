const router = require('express').Router();
const errors = require('../../errors');
/**
 *  @swagger
 *  /signup:
 *    post:
 *      tags:
 *        - user management
 *      description: sign up in user
 *      parameters:
 *        - name: email
 *          default: JohnDoe@gmail.com
 *          required: true
 *          in: formData
 *          type: string
 *        - name: firstName
 *          default: John
 *          in: formData
 *          type: string
 *          required: true
 *        - name: lastName
 *          default: Doe
 *          in: formData
 *          type: string
 *        - name: password
 *          default: qwerty
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: user signed up
 *        401:
 *          description: invalid credentials
 */
router.post('/signup',
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        let userData = req.body;
        if (!req.body.dev_hash || !req.body.dev_hash === '7f49cb0950dca2be02bb2cd67510986') {
            throw errors.NotAllowedError('This is dev feature at this moment, contact you supoort');
        }
        const user = await models.User.create(userData);
        if (!user) throw errors.NotFoundError('User not created, invalid or missing credentials');
        const token = await user.generateToken();
        delete user.dataValues.password;
        return res.json({
            user: user,
            token: token,
        });
    })
);

module.exports = router;