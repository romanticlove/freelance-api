const {logger} = require('./../../utils');
const {expressResponses: {serverError}} = require("../../utils");

module.exports = (req, res, next) => {
    try {
        const pagination = {};

        if(req.query.page) {
            pagination.page = parseInt(req.query.page);
            delete req.query.page;
        }

        if(req.query.limit) {
            pagination.limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        if(req.query.order) {
            pagination.order = req.query.order;
            delete req.query.order;
        }

        if(req.query.sort) {
            pagination.sort = req.query.sort
            delete req.query.sort;
        }

        req.params.pagination = pagination;

        return next();
    } catch (err) {
        logger.error(`Failed to extract pagination`, {xid:'-', err})
        return serverError(res)
    }
}