const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /v1/example:
 *    get:
 *      tags:
 *        - example
 *      description: get list of examples
 *      responses:
 *        200:
 *          description: list of examples
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                uuid:
 *                  type: string
 *                  default: '003d3168-ffa3-4e9d-bccb-04f80cdec2ef'
 *                name:
 *                  type: string
 *                  default: 'name'
 *
 */

router.get('/v1/examples',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const examples = await models.Example.findAll({attributes: ['uuid', 'name']});
        res.json(examples);
    })
);

module.exports = router;
