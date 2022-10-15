const {getBestProfession} = require("../../services/profile");
const {validation: {compileSchema}, date: {setUTCStart, setUTCEnd}} = require('./../../utils');

const VALIDATION_SCHEMA = {
    // TODO: Here is possible to add addition validation to check that start date < end date
    start: {type: "date", convert: true, optional: true},
    end: {type: "date", convert: true, optional: true}
}

const action = async (params) => {
    if (params.end)
        params.end = setUTCEnd(params.end);

    if (params.start)
        params.start = setUTCStart(params.start);

    return getBestProfession(params);
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action