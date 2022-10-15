const {lockForPay, markAsPaid} = require("../../services/jobs");
const {changeBalance} = require("../../services/profile");
const {validation: {compileSchema}} = require('./../../utils');
const {sequelize} = require("../../models");
const {NotFoundError, InsufficientFunds} = require("../../utils/errors");

const VALIDATION_SCHEMA = {
    job_id: {type: "number", integer: true, positive: true, convert: true}
}

const action = async (params) => {
    const clientId = params.__session.id;
    const jobId = params.job_id;

    const transaction =  await sequelize.transaction({ autocommit: false });
    try {
        const job = await lockForPay(jobId, clientId, transaction);
        if(!job) {
            throw new NotFoundError('Job not found');
        }

        if(params.__session.balance < job.price) {
            throw new InsufficientFunds('Insufficient fund to pay for job')
        }


        const [clientUpdated, contractorUpdated, jobPaid] = await Promise.all([
            changeBalance(job.Contract.ClientId, -job.price, transaction),
            changeBalance(job.Contract.ContractorId, job.price, transaction),
            markAsPaid(job.id, transaction)
        ])

        if(jobPaid && clientUpdated && contractorUpdated) {
            await transaction.commit();
            return {success: true};
        }

        await transaction.rollback();
        return {success: false};
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action