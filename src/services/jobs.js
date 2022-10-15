const {Job, sequelize} = require('./../models');
const {contractsFilter, jobsFilter} = require('./../filters');
const {CONTRACT_STATUSES} = require("../constants");

const getUnpaidAmount = async (clientId) => {
    const {where, include} = jobsFilter({
        paid: false,
        with_contracts: true,
        contractsAttributes: [],
        contractsWhere: contractsFilter({
            client_id: clientId,
            status: CONTRACT_STATUSES.IN_PROGRESS
        }).where
    });

    const result = await Job.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('price')), 'unpaid_amount']],
        where,
        include,
        group: [sequelize.col("Job.id")],
        raw: true
    });

    return (result.length) ? result[0].unpaid_amount : 0;
}

const getUnpaidJobs = (profileId, pagination = {}) => {
    const {where, include, order, limit, offset} = jobsFilter({
        pagination,
        paid: false,
        with_contracts: true,
        contractsAttributes: [],
        contractsWhere: contractsFilter({
            profile_id: profileId,
            status: CONTRACT_STATUSES.IN_PROGRESS
        }).where
    });

    return (Object.keys(pagination).length)
        ? Job.findAndCountAll({where, include, limit, order, offset})
        : Job.findAll({where, include, limit})
}

const markAsPaid = async (jobId, transaction = null) => {
    const {where} = jobsFilter({
        id: jobId,
        paid: false,
    })

    const update = await Job.update({
        paid: true,
        paymentDate: new Date()
    }, {where, transaction})

    return !!update[0]
}

const lockForPay = (jobId, clientId, transaction) => {
    const {where, include} = jobsFilter({
        id: jobId,
        paid: false,
        with_contracts: true,
        contractsWhere: contractsFilter({
            client_id: clientId,
        }).where
    });

    return Job.findOne({
        where,
        include,
        transaction,
        lock: transaction.LOCK.UPDATE
    })
}

module.exports = {
    getUnpaidJobs,
    lockForPay,
    markAsPaid,
    getUnpaidAmount,
}