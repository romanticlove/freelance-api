const {Profile, Contract} = require('./../models');
const {profilesFilter, jobsFilter} = require('./../filters')
const {sequelize} = require("../models");

const getPaidContractsScope = (params) => {
    const jobsWhere = jobsFilter({
        paid: true,
        payment_start: params.start,
        payment_end: params.end
    }).where;

    return Contract.scope({method: ['withJobs', jobsWhere]});
}

const getProfile = (params) => {
    const {where} = profilesFilter(params);
    return Profile.findOne({where})
}

const getProfileById = (id) => {
    return getProfile({id});
}

const changeBalance = async (profileId, amount, transaction) => {
    const {where} = profilesFilter({
        id: profileId,
        ...amount < 0 && {min_balance: Math.abs(amount)}
    });

    const result = await Profile.increment({balance: amount}, {where, transaction});
    return !!result[0][1];
}

const getBestProfessions = (params) => {
    return Profile.findAll({
        attributes: ['profession', [sequelize.fn('sum', sequelize.col('price')), 'amount']],
        include: [
            {
                attributes: [],
                model: getPaidContractsScope(params),
                as: 'Contractor',
                required: true,
                duplicating: false,
            }
        ],
        order: [['amount', 'DESC']],
        group: [sequelize.col("Profile.profession")],
    });
}

// TODO: When profile service will grows - it's a good idea to move such "dirty" functions to another service (admin or reports for example)
const getBestClients = (params) => {
    const {limit} = profilesFilter(params);

    return Profile.findAll({
        attributes: ['id', 'fullName', 'firstName', 'lastName', [sequelize.fn('sum', sequelize.col('price')), 'amount']],
        include: [
            {
                attributes: [],
                model: getPaidContractsScope(params),
                as: 'Client',
                required: true,
                duplicating: false,
            }
        ],
        order: [['amount', 'DESC']],
        limit,
        group: [sequelize.col("Profile.profession")],
    });
}


const getBestProfession = async (params) => {
    const total = await getBestProfessions(params);
    return total[0] || null
}

module.exports = {
    getProfileById,
    changeBalance,
    getBestProfession,
    getBestClients,
}