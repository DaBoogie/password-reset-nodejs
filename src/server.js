require('dotenv').load({path: process.env.DOTENV || '.env'});

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const klawSync = require('klaw-sync');
const config = require('config');
const database = require('./database');
const app = express();
const root = __dirname;

/* globals */
app.set('models', database.models);
app.set('sequelize', database.sequelize);

/* configure logger */
configureLogger();

/* set CORS */
app.use(cors({origin: '*'}));
require('./_swagger')(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.info(`${new Date()}: [${req.method}] ${req.url}`);
    next();
});

useControllers();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: {
            name: err.name,
            message: err.message,
        },
    });
    next();
});

/**
 *
 */
async function useControllers() {
    const paths = klawSync(`${__dirname}/controllers`, {nodir: true});
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/', require(file.path));
        controllersCount++;
    });
    console.info(`Total controllers: ${controllersCount}`);
}

function configureLogger() {
    process.on('uncaughtException', function (err) {
        console.error('uncaughtException', err);
    });
    process.on('uncaughtRejection', function (err) {
        console.error('uncaughtRejection', err);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('unhandledRejection', reason);
    });
    console.info(`Logging settings: ${process.env.DEBUG}`);
}

app.listen(config.app.port, '0.0.0.0', async function () {
        console.info(`${new Date()}: Server listening on port: ${config.app.port}`);
    });

module.exports = app;
