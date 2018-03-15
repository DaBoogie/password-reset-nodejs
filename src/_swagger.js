const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerUrl = '/api-docs.json';

const swagger = new swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: require('../package.json').name.toUpperCase(),
            version: require('../package.json').version,
            description: '# Introduction' +
            '\n## Getting Started' +
            '\nThe LeadsDashboard API is organized around REST. All calls to the LeadsDashboard API should be made to ' +
            '[https://polar-temple-15785.herokuapp.com/]). All responses are formatted in JSON.'
        },
        basePath: '/',
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    apis: ['./src/controllers/**/*.js'],
});

module.exports = (app) => {
    app.get('/api-docs.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger);
    });

    app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(null, {swaggerUrl: swaggerUrl}));

    require('express-swagger-ui')({
        app: app,
        swaggerUrl: swaggerUrl,
        localPath: '/api-docs',
    });
};
