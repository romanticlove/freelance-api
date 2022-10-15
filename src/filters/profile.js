const pagination = require('./common/pagination');
const {Op} = require("sequelize");

module.exports = (params = {}) => {
    const where = {};
    const include = [];

    if(params.id) {
        where.id = params.id
    }

    if(params.min_balance) {
        where.balance = {[Op.gte] : params.min_balance}
    }

    return {...pagination(params.pagination), where, include};
}