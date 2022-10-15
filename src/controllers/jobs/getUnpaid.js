const {getUnpaidJobs} = require("../../services/jobs");
const {validation: {pagination, compileSchema}} = require('./../../utils');

const VALIDATION_SCHEMA = {
    ...pagination
}

const action = async (params) => {
    const profileId = params.__session.id;
    return getUnpaidJobs(profileId, params.pagination || {});
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action