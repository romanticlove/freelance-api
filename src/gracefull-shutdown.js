const {logger} = require('./utils')

const SIGNALS = ['SIGTERM', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'];
const exit = () => process.exit(0);

const closeServer = (app) => {
    return new Promise((resolve) => {
        if (!app || !app.server)
            return resolve(false);

        app.server.close((err) => {
            if (err) {
                logger.error(`Failed to stop server`, {err});
            }

            logger.info('Server stopped')
            return resolve(true)
        })
    })
}
const closeDbConnection = async (sequelize) => {
    return sequelize.close()
        .then(() => logger.info(`DB connection closed`))
}

module.exports = (app, sequelize) => {
    SIGNALS.forEach(signal => {
        process.on(signal, () => {
            logger.info(`${signal} received`);
            closeServer(app)
                .then(() => closeDbConnection(sequelize))
                .finally(() => exit())
        })
    })
}