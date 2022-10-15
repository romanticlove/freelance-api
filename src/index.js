process.env.NODE_CONFIG_DIR = __dirname + '/config';
process.env.NODE_ENV = process.env.NODE_ENV || process.env.ENV || 'development';

const {logger} = require('./utils');
const gracefullShutdownWatcher = require('./gracefull-shutdown');
const {sequelize} = require('./models');

sequelize.authenticate()
    .then(() => {
        const app = require('./gateway');
        gracefullShutdownWatcher(app, sequelize);
    })
    .catch(err => {
        logger.error(`Failed to connect DB`, err);
        process.exit(1);
    })
