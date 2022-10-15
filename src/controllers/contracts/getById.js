const {getProfileContractById} = require("../../services/contracts");
const {NotFoundError} = require("../../utils/errors");
const {validation: {compileSchema}} = require('./../../utils');

const VALIDATION_SCHEMA = {
    id: {type: "number", integer: true, positive: true, convert: true}
}

const action = async (params) => {
    // TODO: It's better to use getters for such stuff
    const profileId = params.__session.id;
    const contractId = params.id;

    const contract = await getProfileContractById(profileId, contractId);
    if(!contract)
        throw new NotFoundError(`Contract not found or you have no access to see it`)

    return contract;
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action