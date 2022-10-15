const app = require('./../index');
const routesConfig = require('./config');
const {GATEWAY: {CONTROLLERS_FOLDER}} = require('./../../constants')
const {logger, expressResponses: {serverError}} = require('./../../utils');
const actionWrapper = require('./action-wrapper');
const {secure: secureMiddleware, pagination: paginationMiddleware} = require('./../middlewares');
const {notFound} = require("../../utils/express-responses");

const loadController = (group, controllerAction) => {
    try {
        return [null, require(`${CONTROLLERS_FOLDER}/${group}/${controllerAction}`)];
    } catch (err) {
        return [new Error(`Missing controller ${group}/${controllerAction}`)]
    }
}

const loadControllers = () => {
    const controllers = new Map();

    for (const controllersGroup in routesConfig) {
        for (const controllerAction in routesConfig[controllersGroup]) {
            const controllerConfig = routesConfig[controllersGroup][controllerAction];
            const [error, controller] = loadController(controllersGroup, controllerAction);
            if (error) {
                logger.error('Failed to load application controllers');
                throw error;
            }

            if(typeof controller !== 'function') {
                throw new Error(`Controller ${controllersGroup}/${controllerAction} should be a function`)
            }

            controllers.set(controllerConfig, controller);
        }
    }

    return controllers
}

try {
    const controllers = loadControllers();
    for (const [config, handler] of controllers.entries()) {
        const {alias, method, secure, pagination} = config;
        const middlewares = [];
        if(pagination)
            middlewares.push(paginationMiddleware)

        if(secure)
            middlewares.push(secureMiddleware(secure));

        app[method](alias, middlewares, (req, res) => {
            const params = {...req.query, ...req.body, ...req.params};
            actionWrapper(req, res, params, handler)
                .catch(err => {
                    logger.error(`Unhandled controller "${alias}" exception`, {xid:'-', err});
                    return serverError(res);
                })
        });
    }

    app.use((req, res, next) => {
        notFound(res, "Unknown route")
    })

} catch (err) {
    logger.error(`Failed to setup routes`, {xid: '-', err});
    process.exit(1);
}
