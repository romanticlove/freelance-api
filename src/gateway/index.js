const express = require('express');
const config = require('config');
const constants = require('./../constants');
const {logger} = require('./../utils');

const app = express();

module.exports = app;

require('./middlewares')
require('./router');

const port = config.port || constants.GATEWAY.DEFAULT_PORT;

app.server = app.listen(port, () => logger.info(`App listen on port ${port}!`));