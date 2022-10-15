const pagination = require('./common/pagination');
const models = require('./../models');
const {Contract} = models;
const {Op} = require("sequelize");

module.exports = (params = {}) => {
    const where = {};
    const include = [];

    if (params.id) {
        where.id = params.id
    }

    if(params.hasOwnProperty('paid')) {
        where.paid = params.paid
    }

    if(params.payment_start || params.payment_end) {
        if(params.payment_start && params.payment_end) {
            where.paymentDate = {[Op.between]: [params.payment_start, params.payment_end]}
        } else if(params.payment_start) {
            where.paymentDate = {[Op.gte]: params.payment_start}
        } else if(params.payment_end) {
            where.paymentDate = {[Op.lte]: params.payment_end}
        }
    }

    if(params.with_contracts) {
        include.push({
            ...params.contractsAttributes && {attributes: params.contractsAttributes},
            model: Contract,
            where: params.contractsWhere || {},
            required: true,
        })
    }

    return {...pagination(params.pagination || {}), where, include};
}