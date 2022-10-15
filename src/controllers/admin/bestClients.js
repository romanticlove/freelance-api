const {getBestClients} = require("../../services/profile");
const {validation: {pagination, compileSchema}, date: {setUTCEnd, setUTCStart}} = require('./../../utils');

const VALIDATION_SCHEMA = {
    // TODO: Here is possible to add addition validation to check that start date < end date
    start: {type: "date", convert: true, optional: true},
    end: {type: "date", convert: true, optional: true},
    ...pagination,
}

const action = async (params) => {
    if (params.end)
        params.end = setUTCEnd(params.end);

    if (params.start)
        params.start = setUTCStart(params.start);

    const result = await getBestClients(params);
    return result.map(client => {
        return {
            id: client.id,
            fullName: client.fullName,
            paid : client.getDataValue('amount')
        }
    })
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action