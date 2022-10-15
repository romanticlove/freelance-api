const {contractsFilter} = require('./../filters')
const {Contract} = require('./../models');

const getContract = (params) => {
    const {where} = contractsFilter(params)

    return Contract.findOne({where});
}

const getProfileContracts = (profileId, pagination = {}) => {
    const {where, limit, order, offset} = contractsFilter({
        profile_id: profileId,
        pagination
    })

    return (Object.keys(pagination).length)
        ? Contract.findAndCountAll({where, limit, order, offset})
        : Contract.findAll({where, limit})
}

const getProfileContractById = (profileId, contactId) => {
    return getContract({
        id: contactId,
        profile_id: profileId,
        status: null
    })
}

module.exports = {
    getProfileContracts,
    getProfileContractById
}