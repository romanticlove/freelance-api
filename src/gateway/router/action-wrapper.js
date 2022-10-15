const {success, serverError, notFound, badRequest} = require("../../utils/express-responses");
const {logger} = require("../../utils");
const {NotFoundError, BadRequest} = require("../../utils/errors");

module.exports = async (req, res, params, handler) => {
    try {
        if (handler.schema) {
            const validation = handler.schema(params);
            if(validation !== true) {
                return badRequest(res, "Validation failed", validation)
            }
        }

        const result = await handler(params);

        return success(res, result);
    } catch(err) {
        if(err instanceof NotFoundError) {
            return notFound(res, err.message);
        }

        if(err instanceof BadRequest) {
            return badRequest(res, err.message, err.data)
        }

        logger.error(`Failed to process action`, {xid:'-', params, err});
        return serverError(res);
    }
}