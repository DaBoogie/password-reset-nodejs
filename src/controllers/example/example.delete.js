const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /v1/example/{uuid}:
 *    delete:
 *      tags:
 *        - example
 *      description: delete example
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: example was deleted
 */

router.delete('/v1/example/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const example = await models.Example.findById(req.params.uuid);
        if (!example) throw errors.NotFoundError('Example not found');
        await example.destroy();
        res.sendStatus(204);
    })
);

module.exports = router;
