const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
/**
 *  @swagger
 *  /v1/example:
 *    post:
 *      tags:
 *        - example
 *      description: save report
 *      parameters:
 *        - name: name
 *          default: ReportName
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.post('/v1/example',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const example = req.body;
        const existingExample = await models.Example.findOne({where: {name: example.name}});
        if (existingExample) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Example.create(example);
        res.json(result);
    })
);

module.exports = router;
