const { Op: {or, ne} } = require("sequelize");
const pagination = require('./common/pagination');
const {CONTRACT_STATUSES} = require("../constants");

module.exports = (params = {}) => {
    const where = {};
    const include = [];

    if (params.id) {
        where.id = params.id
    }

    if(params.status === undefined) {
        where.status = {
            [ne]: CONTRACT_STATUSES.TERMINATED
        }
    }

    if(params.status) {
        where.status = params.status
    }

    if(params.client_id) {
        where.ClientId = params.client_id
    }

    if (params.profile_id) {
        where[or] = where[or] || [];
        where[or].push({
            ClientId: params.profile_id
        }, {
            ContractorId: params.profile_id
        })
    }

    return {...pagination(params.pagination || {}), where, include};
}